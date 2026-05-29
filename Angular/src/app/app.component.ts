import { Component, ViewChild } from '@angular/core';
import { DxDataGridModule, DxDataGridComponent, type DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import type { DxPivotGridTypes } from 'devextreme-angular/ui/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { ArrayStore, DataSource, isItemsArray, LoadResult, } from 'devextreme-angular/common/data';
import notify from 'devextreme/ui/notify';
import { Sale, Service } from './app.service';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';

@Component({
  imports: [DxDataGridModule, DxPopupModule, DxPivotGridModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drillDownDataGrid', { static: false })
    drillDownDataGrid!: DxDataGridComponent<Sale, number>;

  data: ArrayStore;

  pivotGridDataSource: PivotGridDataSource;

  drillDownDataSource: DataSource<Sale, number> | null = null;

  dataGridDataSource: DataSource<Sale, number> | null = null;

  popupVisible = false;

  popupTitle = '';

  constructor(service: Service) {
    this.data = new ArrayStore({
      data: service.getSales(),
      key: 'id',
    });

    this.pivotGridDataSource = new PivotGridDataSource({
      fields: [
        {
          caption: 'Region',
          width: 120,
          dataField: 'region',
          area: 'row',
        },
        {
          caption: 'City',
          dataField: 'city',
          width: 150,
          area: 'row',
          selector: this.citySelector,
        },
        {
          dataField: 'date',
          dataType: 'date',
          area: 'column',
        },
        {
          caption: 'Sales',
          dataField: 'amount',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data',
        },
      ],
      store: this.data,
    });
  }

  citySelector(data: Sale): string {
    return `${data.city} (${data.country})`;
  }

  onCellClick(e: DxPivotGridTypes.CellClickEvent): void {
    if (e.area === 'data' && e.cell && e.cell.rowPath) {
      const rowPathLength = e.cell.rowPath.length;
      const rowPathName = e.cell.rowPath[rowPathLength - 1];
      const popupTitle = `${rowPathName || 'Total'} Drill Down Data`;

      this.drillDownDataSource = this.pivotGridDataSource.createDrillDownDataSource(e.cell);
      this.popupTitle = popupTitle;
      this.popupVisible = true;
    }
  }

  onPopupShowing(): void {
    this.drillDownDataSource?.store().load().then((items: LoadResult<Sale>) => {
      if (isItemsArray(items)) {
        this.dataGridDataSource = new DataSource<Sale, number>({
          store: new ArrayStore({
            key: this.data.key(),
            data: items,
          }),
        });
      }
    }).catch(() => {
      notify('Failed to load drill-down data', 'error', 1000);
    });
  }

  onPopupHiding(): void {
    this.pivotGridDataSource.reload().catch(() => {
      notify('Failed to reload data', 'error', 1000);
    });
  }

  onPopupShown(): void {
    const gridInstance = this.drillDownDataGrid?.instance;
    if (!gridInstance) return;

    gridInstance.updateDimensions();
  }

  onRowUpdating(e: DxDataGridTypes.RowUpdatingEvent<Sale, number>): void {
    this.data.update(e.key, e.newData).catch(() => {
      notify('Failed to update data', 'error', 1000);
    });
  }

  onRowAdding(e: DxDataGridTypes.RowInsertingEvent<Sale, number>): void {
    this.data.insert(e.data).catch(() => {
      notify('Failed to insert data', 'error', 1000);
    });
  }

  onRowRemoving(e: DxDataGridTypes.RowRemovingEvent<Sale, number>): void {
    this.data.remove(e.key).catch(() => {
      notify('Failed to remove data', 'error', 1000);
    });
  }
}
