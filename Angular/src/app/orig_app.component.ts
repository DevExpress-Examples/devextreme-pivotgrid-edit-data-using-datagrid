import { Component, ViewChild  } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Service, Sale } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    @ViewChild("drillDownDataGrid", { static: false }) drillDownDataGrid: DxDataGridComponent
    sales: Sale[];
	data: ArrayStore;
    pivotGridDataSource: PivotGridDataSource;
    drillDownDataSource: any;
	dataGridDataSource: any;

    popupVisible = false;
    popupTitle: string;

    constructor(service: Service) {
        this.data = new ArrayStore({
            data: service.getSales(),
            key: "id"
        });
        
        this.pivotGridDataSource = new PivotGridDataSource({
            fields: [{
                caption: 'Region',
                width: 120,
                dataField: 'region',
                area: 'row'
            }, {
                caption: 'City',
                dataField: 'city',
                width: 150,
                area: 'row',
                selector: this.citySelector
            }, {
                dataField: 'date',
                dataType: 'date',
                area: 'column'
            }, {
                caption: 'Sales',
                dataField: 'amount',
                dataType: 'number',
                summaryType: 'sum',
                format: 'currency',
                area: 'data'
            }],
            store: this.data
        });
    }

    citySelector(data) {
        return data.city + ' (' + data.country + ')';
    }

    onCellClick(e) {
        if (e.area == "data") {
            var rowPathLength = e.cell.rowPath.length,
            rowPathName = e.cell.rowPath[rowPathLength - 1],
            popupTitle = (rowPathName ? rowPathName : "Total") + " Drill Down Data";

            this.drillDownDataSource = this.pivotGridDataSource.createDrillDownDataSource(
                e.cell
            );
            
            this.popupTitle = popupTitle;
            this.popupVisible = true;
        }
    }

	onPopupShowing(e) {
        var that = this;
        this.drillDownDataSource.store().load().done(function(items) {
			that.dataGridDataSource = {
                store: new ArrayStore({                     
                    key: that.data.key(),
                    data: items
                }) 
            };
        });
    }

	onPopupHiding(e) {
        this.pivotGridDataSource.reload();
    }

	onPopupShown(e) {
        this.drillDownDataGrid.instance.updateDimensions();
    }

	onRowUpdating(e) {
        this.data.update(e.key, e.newData);
    }

	onRowAdding(e) {
        this.data.insert(e.data);
    }

	onRowRemoving(e) {
        this.data.remove(e.key);
    }
}