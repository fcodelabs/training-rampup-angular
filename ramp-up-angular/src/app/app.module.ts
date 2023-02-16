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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { studentReducer } from './store/reducers/student.reducers';
import { studentEffects } from './store/effects/student.effects';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PopupModule } from '@progress/kendo-angular-popup';
import { PopupAnchorDirective } from './utils/directives/popup.target.directives';
const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };
@NgModule({
  declarations: [AppComponent, HomePageComponent, DataGridComponent,PopupAnchorDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownsModule,
    HttpClientModule,
    DateInputsModule,
    StoreModule.forRoot({student:studentReducer}),
    EffectsModule.forRoot([studentEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
    SocketIoModule.forRoot(config),
    PopupModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
