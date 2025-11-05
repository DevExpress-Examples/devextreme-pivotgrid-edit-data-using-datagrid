<script setup lang="ts">
import { ref } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import {
  DxPivotGrid,
  type DxPivotGridTypes,
} from 'devextreme-vue/pivot-grid';
import { DxFieldChooser } from 'devextreme-vue/pivot-grid';
import { DxPopup } from 'devextreme-vue/popup';
import {
  DxDataGrid,
  type DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import { DxColumn, DxEditing } from 'devextreme-vue/data-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { ArrayStore, DataSource, isItemsArray, type LoadResult } from 'devextreme-vue/common/data';
import notify from 'devextreme/ui/notify';
import { sales, type Sale } from '../data';

const pivotGridRef = ref<DxPivotGrid | null>(null);
const dataGridRef = ref<DxDataGrid | null>(null);

const data = new ArrayStore({
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

const drillDownDataSource = ref<DataSource<Sale, number> | null>(null);
const popupTitle = ref('');
const popupVisible = ref(false);

function onCellClick(e: DxPivotGridTypes.CellClickEvent): void {
  if (e.area === 'data' && e.cell && e.cell.rowPath) {
    const pivotDataSource = e.component.getDataSource();
    const rowPathLength = e.cell.rowPath.length;
    const rowPathName = e.cell.rowPath[rowPathLength - 1];
    const title = `${rowPathName ? rowPathName : 'Total'} Drill Down Data`;

    drillDownDataSource.value = pivotDataSource.createDrillDownDataSource(
      e.cell
    );

    popupTitle.value = title;
    popupVisible.value = true;
  }
}

function onShowing(): void {
  const gridInstance = dataGridRef.value?.instance;
  if (!gridInstance) return;

  drillDownDataSource.value?.store().load().then((items: LoadResult<Sale>) => {
    if(isItemsArray(items)) {
      gridInstance.option('dataSource', {
        store: new ArrayStore({
          key: data.key(),
          data: items,
        }),
      });
    }
  });
}

function onHiding(): void {
  const pivotInstance = pivotGridRef.value?.instance;
  if (!pivotInstance) return;

  pivotInstance.getDataSource().reload().catch(() => {
    notify('Failed to reload data', 'error', 1000);
  });
}

function onShown(): void {
  const gridInstance = dataGridRef.value?.instance;
  if (!gridInstance) return;

  gridInstance.updateDimensions();
}

function onRowInserting(e: DxDataGridTypes.RowInsertingEvent<Sale, number>): void {
  data.insert(e.data).catch(() => {
    notify('Failed to add data', 'error', 1000);
  });
}

function onRowUpdating(e: DxDataGridTypes.RowUpdatingEvent<Sale, number>): void {
  data.update(e.key, e.newData).catch(() => {
    notify('Failed to update data', 'error', 1000);
  });
}

function onRowRemoving(e: DxDataGridTypes.RowRemovingEvent<Sale, number>): void {
  data.remove(e.key).catch(() => {
    notify('Failed to remove data', 'error', 1000);
  });
}
</script>

<template>
  <div>
    <div class="long-title">
      <h3>Sales Amount by Region</h3>
    </div>
    <DxPivotGrid
      ref="pivotGridRef"
      :allow-sorting-by-summary="true"
      :allow-sorting="true"
      :allow-filtering="true"
      :allow-expand-all="true"
      :show-borders="true"
      :data-source="pivotGridDataSource"
      @cell-click="onCellClick"
    >
      <DxFieldChooser :enabled="false"/>
    </DxPivotGrid>
    <DxPopup
      :width="600"
      :height="400"
      v-model:visible="popupVisible"
      :title="popupTitle"
      :show-close-button="true"
      @showing="onShowing"
      @hiding="onHiding"
      @shown="onShown"
    >
      <DxDataGrid
        ref="dataGridRef"
        :width="560"
        :height="300"
        @row-inserting="onRowInserting"
        @row-updating="onRowUpdating"
        @row-removing="onRowRemoving"
      >
        <DxEditing
          :allow-updating="true"
          :allow-deleting="true"
          :allow-adding="true"
        />
        <DxColumn data-field="region"/>
        <DxColumn data-field="city"/>
        <DxColumn
          data-field="amount"
          data-type="number"
        />
        <DxColumn
          data-field="date"
          data-type="date"
        />
      </DxDataGrid>
    </DxPopup>
  </div>
</template>

<style scoped>
.long-title {
  margin: 20px 0;
}
</style>

