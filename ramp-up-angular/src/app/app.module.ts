import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from '../app/containers/home-page/home-page.component';
import { DataGridComponent } from '../app/components/data-grid/data-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';




@NgModule({
  declarations: [AppComponent, HomePageComponent, DataGridComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownsModule,
    DateInputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
