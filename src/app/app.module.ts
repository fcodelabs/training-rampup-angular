import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DataGridComponent } from './components/data-grid/data-grid.component'
import { GridModule } from '@progress/kendo-angular-grid'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomePageComponent } from './containers/home-page/home-page.component'

@NgModule({
	declarations: [AppComponent, DataGridComponent, HomePageComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		GridModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
