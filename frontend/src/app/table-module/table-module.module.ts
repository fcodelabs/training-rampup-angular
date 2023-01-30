import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { GridModule } from '@progress/kendo-angular-grid';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
GridModule,

  ]
})
export class TableModule { }
