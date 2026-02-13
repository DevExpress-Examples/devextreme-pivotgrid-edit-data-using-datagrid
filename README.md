<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/266598408/25.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T892748)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# PivotGrid for DevExtreme - How to edit data using DataGrid

This example demonstrates how to use the DataGrid component and PivotGrid's [Drill Down](https://js.devexpress.com/Demos/WidgetsGallery/Demo/PivotGrid/DrillDown) feature to edit data in PivotGrid.

![PivotGrid drill down feature](./images/pivot-grid-drill-down.gif)

## Implementation Details

1. Implement the [onCellClick](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPivotGrid/Configuration/#onCellClick) event handler to get information about the current cell and use the [createDrillDownDataSource](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Methods/#createDrillDownDataSourceoptions) method to get plain data. Then, bind DataGrid to these values.  

1. Define the [onRowUpdating](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowUpdating), the [onRowRemoving](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowRemoving), and the [onRowInserting](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onRowInserting) functions to update real PivotGrid data while changing in-memory values.

1. Implement the [onHiding](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPopup/Configuration/#onHiding) event handler to [reload data](https://js.devexpress.com/Documentation/Guide/Data_Binding/Update_Data/#DevExtreme_DataSource/Data_Shaping) in PivotGrid after a user closes a popup with the grid.

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [Home.vue](Vue/src/components/HomeContent.vue)
- **React**
    - [App.js](React/src/App.tsx)
- **ASP.NET**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with PivotGrid](https://js.devexpress.com/Documentation/Guide/UI_Components/PivotGrid/Getting_Started_with_PivotGrid/)
- [Getting Started with DataGrid](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/)

## More Examples

- [PivotGrid - Drill Down](https://js.devexpress.com/Demos/WidgetsGallery/Demo/PivotGrid/DrillDown)
<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-pivotgrid-edit-data-using-datagrid&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-pivotgrid-edit-data-using-datagrid&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
