import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from "react";
import './App.css';

import PivotGrid, { FieldChooser } from "devextreme-react/pivot-grid";
import Popup from "devextreme-react/popup";
import DataGrid, { Column, Editing } from "devextreme-react/data-grid";

import PivotGridDataSource from "devextreme/ui/pivot_grid/data_source";
import ArrayStore from "devextreme/data/array_store";

import { sales } from "./data.js";
import DataSource from "devextreme/data/data_source";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pivotgrid = React.createRef();

    this.grid = React.createRef();
    this.state = {
      visible: false,
      title: "",
      gridDataSource: null
    };

    this.onCellClick = this.onCellClick.bind(this);
    this.onShowing = this.onShowing.bind(this);
    this.onHiding = this.onHiding.bind(this);
    this.onShown = this.onShown.bind(this);
  }

  onCellClick(e) {
    if (e.area === "data") {
      var pivotGridDataSource = e.component.getDataSource(),
        rowPathLength = e.cell.rowPath.length,
        rowPathName = e.cell.rowPath[rowPathLength - 1],
        popupTitle = (rowPathName ? rowPathName : "Total") + " Drill Down Data";

      drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(
        e.cell
      );

      this.setState({
        visible: true,
        title: popupTitle
      });
    }
  }

  onRowInserting(e) {
    data.insert(e.data);
  }

  onRowUpdating(e) {
    data.update(e.key, e.newData);
  }

  onRowRemoving(e) {
    data.remove(e.key);
  }

  onShowing(e) {
    drillDownDataSource
      .store()
      .load()
      .done((items) => {
        this.setState({
          gridDataSource: new DataSource({
            store: new ArrayStore({
              key: data.key(),
              data: items
            })
          })
        });
      });
  }

  onHiding(e) {
    this.setState({
      visible: false
    });
    var pivotGridInstance = this.pivotgrid.current.instance;
    pivotGridInstance.getDataSource().reload();
  }

  onShown(e) {
    var gridInstance = this.grid.current.instance;
    gridInstance.updateDimensions();
  }

  render() {
    let { visible, title, gridDataSource } = this.state;
    return (
      <React.Fragment>
        <PivotGrid
          ref={this.pivotgrid}
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowSorting={true}
          allowFiltering={true}
          allowExpandAll={true}
          showBorders={true}
          onCellClick={this.onCellClick}
        >
          <FieldChooser enabled={false} />
        </PivotGrid>
        <Popup
          width={600}
          visible={visible}
          title={title}
          height={400}
          onShowing={this.onShowing}
          onHiding={this.onHiding}
          onShown={this.onShown}
        >
          <DataGrid
            ref={this.grid}
            width={560}
            height={300}
            dataSource={gridDataSource}
            onRowInserting={this.onRowInserting}
            onRowUpdating={this.onRowUpdating}
            onRowRemoving={this.onRowRemoving}
          >
            <Editing
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
            />

            <Column dataField="region" />
            <Column dataField="city" />
            <Column dataField="amount" dataType="number" />
            <Column dataField="date" dataType="date" />
          </DataGrid>
        </Popup>
      </React.Fragment>
    );
  }
}

var drillDownDataSource = {};

const data = new ArrayStore({
  data: sales,
  key: "id"
});

const dataSource = new PivotGridDataSource({
  fields: [
    {
      caption: "Region",
      width: 120,
      dataField: "region",
      area: "row"
    },
    {
      caption: "City",
      dataField: "city",
      width: 150,
      area: "row"
    },
    {
      dataField: "date",
      dataType: "date",
      area: "column"
    },
    {
      caption: "Total",
      dataField: "amount",
      dataType: "number",
      summaryType: "sum",
      format: "currency",
      area: "data"
    }
  ],
  store: data
});

export default App;
