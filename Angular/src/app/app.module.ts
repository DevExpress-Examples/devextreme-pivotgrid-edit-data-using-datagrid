import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxPivotGridModule, DxDataGridModule, DxPopupModule, DxTemplateModule } from 'devextreme-angular';
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
