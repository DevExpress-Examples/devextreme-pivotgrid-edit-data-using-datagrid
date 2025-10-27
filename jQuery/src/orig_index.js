$(function() {
    var drillDownDataSource = {};
    var data = new DevExpress.data.ArrayStore({
      data: sales,
      key: "id"
    });
    $("#sales").dxPivotGrid({
      allowSortingBySummary: true,
      allowSorting: true,
      allowFiltering: true,
      allowExpandAll: true,
      showBorders: true,
      fieldChooser: {
        enabled: false
      },
      onCellClick: function(e) {
        if (e.area == "data") {
          var pivotGridDataSource = e.component.getDataSource(),
            rowPathLength = e.cell.rowPath.length,
            rowPathName = e.cell.rowPath[rowPathLength - 1],
            popupTitle =
              (rowPathName ? rowPathName : "Total") + " Drill Down Data";
  
          drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(
            e.cell
          );
          salesPopup.option("title", popupTitle);
          salesPopup.show();
        }
      },
      dataSource: {
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
      }
    });
  
    var salesPopup = $("#sales-popup")
      .dxPopup({
        width: 600,
        height: 400,
        contentTemplate: function(contentElement) {
          $("<div />")
            .addClass("drill-down")
            .dxDataGrid({
              editing: {
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
               
              },          
              onRowUpdating: function(e) {
                data.update(e.key, e.newData); 
              
              },
              onRowInserting: function(e){
                data.insert(e.data);
                
              },      
             onRowRemoving: function(e){
                 data.remove(e.key);
                
              },
               width: 560,
              height: 300,
              columns: [
                "region",
                "city",
                {
                  dataField: "amount",
                  dataType: "number"
                },
                {
                  dataField: "date",
                  dataType: "date"
                }
              ]
            })
            .appendTo(contentElement);
        },
        onShowing: function() {
         
          drillDownDataSource.store().load().done(function(items){
               $(".drill-down")
            .dxDataGrid("instance")
            .option("dataSource", {
                      store: new DevExpress.data.ArrayStore({                     
                        key: data.key(),
                        data: items
                      }) 
             });
          });
          
        },
        onHiding: function(e) {
          $("#sales")
            .dxPivotGrid("instance")
            .getDataSource()
            .reload();
        },
        onShown: function() {
          $(".drill-down")
            .dxDataGrid("instance")
            .updateDimensions();
        }
      })
      .dxPopup("instance");
  });
  