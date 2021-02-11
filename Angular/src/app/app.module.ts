import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxTemplateModule } from 'devextreme-angular/core';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
      BrowserModule,
      DxPivotGridModule,
      DxDataGridModule,
      DxPopupModule,
      DxTemplateModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
