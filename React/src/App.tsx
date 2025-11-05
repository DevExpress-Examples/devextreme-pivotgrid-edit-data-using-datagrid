import React, { useCallback, useRef, useState } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import PivotGrid, { type PivotGridRef, FieldChooser, type PivotGridTypes } from 'devextreme-react/pivot-grid';
import Popup from 'devextreme-react/popup';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import type { DataGridRef, DataGridTypes } from 'devextreme-react/data-grid';
import {
  DataSource, ArrayStore, type LoadResult, isItemsArray,
} from 'devextreme-react/common/data';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import notify from 'devextreme/ui/notify';
import { sales, type Sale } from './data';

const data = new ArrayStore<Sale, number>({
  data: sales,
  key: 'id',
});

const pivotGridDataSource = new PivotGridDataSource({
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
});

function App(): JSX.Element {
  const pivotGridRef = useRef<PivotGridRef>(null);
  const dataGridRef = useRef<DataGridRef<Sale, number>>(null);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [gridDataSource, setGridDataSource] = useState<DataSource | null>(null);
  const drillDownDataSourceRef = useRef<DataSource<Sale, number> | null>(null);

  const onCellClick = useCallback((e: PivotGridTypes.CellClickEvent): void => {
    if (e.area === 'data' && e.cell && e.cell.rowPath) {
      const pivotDataSource = e.component.getDataSource();
      const rowPathLength = e.cell.rowPath.length;
      const rowPathName = e.cell.rowPath[rowPathLength - 1];
      const popupTitle = `${rowPathName || 'Total'} Drill Down Data`;
      drillDownDataSourceRef.current = pivotDataSource.createDrillDownDataSource(
        e.cell,
      );

      setVisible(true);
      setTitle(popupTitle);
    }
  }, []);

  const onRowInserting = useCallback((e: DataGridTypes.RowInsertingEvent<Sale, number>): void => {
    data.insert(e.data).catch(() => {
      notify('Failed to insert data', 'error', 1000);
    });
  }, []);

  const onRowUpdating = useCallback((e: DataGridTypes.RowUpdatingEvent<Sale, number>): void => {
    data.update(e.key, e.newData).catch(() => {
      notify('Failed to update data', 'error', 1000);
    });
  }, []);

  const onRowRemoving = useCallback((e: DataGridTypes.RowRemovingEvent<Sale, number>): void => {
    data.remove(e.key).catch(() => {
      notify('Failed to remove data', 'error', 1000);
    });
  }, []);

  const onShowing = useCallback((): void => {
    drillDownDataSourceRef.current?.store()
      .load()
      .then((items: LoadResult<Sale>) => {
        if (isItemsArray(items)) {
          setGridDataSource(
            new DataSource({
              store: new ArrayStore({
                key: data.key(),
                data: items,
              }),
            }),
          );
        }
      }).catch(() => {
        notify('Failed to load drill-down data', 'error', 1000);
      });
  }, []);

  const onHiding = useCallback((): void => {
    setVisible(false);
    const pivotInstance = pivotGridRef.current?.instance();
    if (!pivotInstance) return;

    pivotInstance.getDataSource().reload().catch(() => {
      notify('Failed to reload data', 'error', 1000);
    });
  }, []);

  const onShown = useCallback((): void => {
    const gridInstance = dataGridRef.current?.instance();
    if (!gridInstance) return;

    gridInstance.updateDimensions();
  }, []);

  return (
    <React.Fragment>
      <div className="long-title">
        <h3>Sales Amount by Region</h3>
      </div>
      <PivotGrid
        ref={pivotGridRef}
        dataSource={pivotGridDataSource}
        allowSortingBySummary={true}
        allowSorting={true}
        allowFiltering={true}
        allowExpandAll={true}
        showBorders={true}
        onCellClick={onCellClick}>
        <FieldChooser enabled={false} />
      </PivotGrid>
      <Popup
        width={600}
        visible={visible}
        title={title}
        height={400}
        onShowing={onShowing}
        onHiding={onHiding}
        showCloseButton={true}
        onShown={onShown}>
        <DataGrid
          ref={dataGridRef}
          width={560}
          height={300}
          dataSource={gridDataSource}
          onRowInserting={onRowInserting}
          onRowUpdating={onRowUpdating}
          onRowRemoving={onRowRemoving}>
          <Editing allowUpdating={true} allowDeleting={true} allowAdding={true} />
          <Column dataField="region" />
          <Column dataField="city" />
          <Column dataField="amount" dataType="number" />
          <Column dataField="date" dataType="date" />
        </DataGrid>
      </Popup>
    </React.Fragment>
  );
}

export default App;

