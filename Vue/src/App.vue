<template>
  <div>
    <DxPivotGrid
      :ref="pivotGridRefKey"
      :allow-sorting-by-summary="true"
      :allow-sorting="true"
      :allow-filtering="true"
      :allow-expand-all="true"
      :show-borders="true"
      :data-source="dataSource"
      @cell-click="onCellClick"
    >
      <DxFieldChooser :enabled="false" />
    </DxPivotGrid>
    <DxPopup
      :width="600"
      :height="400"
      :title.sync="popupTitle"
      :visible.sync="popupVisible"
      @showing="onShowing"
      @hiding="onHiding"
      @shown="onShown"
    >
      <DxDataGrid
        :ref="gridRefKey"
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

        <DxColumn data-field="region" />
        <DxColumn data-field="city" />
        <DxColumn data-field="amount" data-type="number" />
        <DxColumn data-field="date" data-type="date" />
      </DxDataGrid>
    </DxPopup>
  </div>
</template>
<script>
import DxPivotGrid, { DxFieldChooser } from "devextreme-vue/pivot-grid";
import { DxPopup } from "devextreme-vue/popup";
import { DxDataGrid, DxColumn, DxEditing } from "devextreme-vue/data-grid";

import PivotGridDataSource from "devextreme/ui/pivot_grid/data_source";
import ArrayStore from "devextreme/data/array_store";

import { sales } from "./data.js";

const pivotGridRefKey = "my-pivot-grid";
const gridRefKey = "my-grid";

export default {
  components: {
    DxPivotGrid,
    DxFieldChooser,
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxEditing,
  },
  data() {
    return {
      pivotGridRefKey,
      gridRefKey,
      drillDownDataSource: {},
      data: new ArrayStore({
        data: sales,
        key: "id",
      }),
      dataSource: new PivotGridDataSource({
        fields: [
          {
            caption: "Region",
            width: 120,
            dataField: "region",
            area: "row",
          },
          {
            caption: "City",
            dataField: "city",
            width: 150,
            area: "row",
          },
          {
            dataField: "date",
            dataType: "date",
            area: "column",
          },
          {
            caption: "Total",
            dataField: "amount",
            dataType: "number",
            summaryType: "sum",
            format: "currency",
            area: "data",
          },
        ],
        store: sales,
      }),
      popupTitle: "",
      popupVisible: false,
    };
  },
  methods: {
    onCellClick(e) {
      if (e.area === "data") {
        var pivotGridDataSource = e.component.getDataSource(),
          rowPathLength = e.cell.rowPath.length,
          rowPathName = e.cell.rowPath[rowPathLength - 1],
          popupTitle =
            (rowPathName ? rowPathName : "Total") + " Drill Down Data";

        this.drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(
          e.cell
        );

        this.popupTitle = popupTitle;
        this.popupVisible = true;
      }
    },
    onShowing() {
      var that = this;
      this.drillDownDataSource
        .store()
        .load()
        .done(function (items) {
          that.grid.option("dataSource", {
            store: new ArrayStore({
              key: that.data.key(),
              data: items,
            }),
          });
        });
    },
    onHiding() {
      this.pivotGrid.getDataSource().reload();
    },
    onShown() {
      this.grid.updateDimensions();
    },
    onRowInserting(e) {
      this.data.insert(e.data);
    },
    onRowUpdating(e) {
      this.data.update(e.key, e.newData);
    },
    onRowRemoving(e) {
      this.data.remove(e.key);
    },
  },
  computed: {
    pivotGrid: function () {
      return this.$refs[pivotGridRefKey].instance;
    },
    grid: function () {
      return this.$refs[gridRefKey].instance;
    },
  },
};
</script>
<style scoped>
#sales {
  margin: 20px 0;
}
</style>