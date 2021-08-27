<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/266598408/20.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T892748)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# PivotGrid - How to implement editing using DataGrid

This example demonstrates how to use dxDataGrid to edit data in dxPivotGrid.

The main idea is to use the [Drill Down](https://js.devexpress.com/Demos/WidgetsGallery/Demo/PivotGrid/DrillDown/jQuery/Light/) feature.

## Steps:

1. Handle [onCellClick](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPivotGrid/Configuration/#onCellClick) to get information about the current cell and use the [createDrillDownDataSource](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Methods/#createDrillDownDataSourceoptions) method to get plain data. Then, bind DataGrid to these values.   
1. Define [onRowUpdating](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowUpdating), [onRowRemoving](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowRemoving), [onRowInserting](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowInserting) to update real PivotGrid data while changing in\-memory values.  
1. Define the [onHiding](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPopup/Configuration/#onHiding) event handler to [reload data](https://js.devexpress.com/Documentation/Guide/Data_Binding/Update_Data/#DevExtreme_DataSource/Data_Shaping) in dxPivotGrid after a popup with the grid is closed.  
