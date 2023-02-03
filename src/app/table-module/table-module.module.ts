import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { AppComponent } from './app.component';


const config: SocketIoConfig = { url: `${environment.socketApiUrl}`, options: {} };

@NgModule({
  declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        GridModule
    ],
    providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class TableModule {}
