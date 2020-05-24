# PivotGrid - How to implement editing using DataGrid

This example demonstrates how to use dxDataGrid to edit data in dxPivotGrid.

The main idea is to use the [Drill Down](https://js.devexpress.com/Demos/WidgetsGallery/Demo/PivotGrid/DrillDown/jQuery/Light/) feature.

## Steps:

1. Handle [onCellClick](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPivotGrid/Configuration/#onCellClick) to get information about the current cell and use the [createDrillDownDataSource](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Methods/#createDrillDownDataSourceoptions) method to get plain data. Then, bind DataGrid to these values.   
1. Define [onRowUpdating](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowUpdating), [onRowRemoving](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowRemoving), [onRowInserting](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowInserting) to update real PivotGrid data while changing in\-memory values.  
1. Define the [onHiding](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPopup/Configuration/#onHiding) event handler to [reload data](https://js.devexpress.com/Documentation/Guide/Data_Binding/Update_Data/#DevExtreme_DataSource/Data_Shaping) in dxPivotGrid after a popup with the grid is closed.  