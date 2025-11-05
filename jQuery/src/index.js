$(() => {
  let drillDownDataSource = {};
  const data = new DevExpress.data.ArrayStore({
    data: sales,
    key: 'id',
  });
  $('#sales').dxPivotGrid({
    allowSortingBySummary: true,
    allowSorting: true,
    allowFiltering: true,
    allowExpandAll: true,
    showBorders: true,
    fieldChooser: {
      enabled: false,
    },
    onCellClick(e) {
      if (e.area === 'data') {
        const pivotGridDataSource = e.component.getDataSource();
        const rowPathLength = e.cell.rowPath.length;
        const rowPathName = e.cell.rowPath[rowPathLength - 1];
        const popupTitle = `${rowPathName || 'Total'} Drill Down Data`;

        drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(
          e.cell,
        );
        salesPopup.option('title', popupTitle);
        salesPopup.show();
      }
    },
    dataSource: {
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
        },
        {
          dataField: 'date',
          dataType: 'date',
          area: 'column',
        },
        {
          caption: 'Total',
          dataField: 'amount',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data',
        },
      ],
      store: data,
    },
  });

  const salesPopup = $('#sales-popup')
    .dxPopup({
      width: 600,
      height: 400,
      contentTemplate(contentElement) {
        $('<div />')
          .addClass('drill-down')
          .dxDataGrid({
            editing: {
              allowUpdating: true,
              allowAdding: true,
              allowDeleting: true,
            },
            onRowUpdating(e) {
              data.update(e.key, e.newData);
            },
            onRowInserting(e) {
              data.insert(e.data);
            },
            onRowRemoving(e) {
              data.remove(e.key);
            },
            width: 560,
            height: 300,
            columns: [
              'region',
              'city',
              {
                dataField: 'amount',
                dataType: 'number',
              },
              {
                dataField: 'date',
                dataType: 'date',
              },
            ],
          })
          .appendTo(contentElement);
      },
      onShowing() {
        drillDownDataSource.store().load().done((items) => {
          $('.drill-down')
            .dxDataGrid('instance')
            .option('dataSource', {
              store: new DevExpress.data.ArrayStore({
                key: data.key(),
                data: items,
              }),
            });
        });
      },
      onHiding() {
        $('#sales')
          .dxPivotGrid('instance')
          .getDataSource()
          .reload();
      },
      onShown() {
        $('.drill-down')
          .dxDataGrid('instance')
          .updateDimensions();
      },
    })
    .dxPopup('instance');
});
