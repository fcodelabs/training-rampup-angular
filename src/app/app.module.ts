import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DataGridComponent } from './components/data-grid/data-grid.component'
import { GridModule } from '@progress/kendo-angular-grid'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomePageComponent } from './containers/home-page/home-page.component'
import { DropDownsModule } from '@progress/kendo-angular-dropdowns'
import { ReactiveFormsModule } from '@angular/forms'
import { DateInputsModule } from '@progress/kendo-angular-dateinputs'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { studentReducer } from './store/reducers/data-grid.reducers'
import { DataGridEffects } from './store/effects/data-grid.effects'
import { environment } from '../environments/environments'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io'

const socketConfig: SocketIoConfig = {
	url: environment.SOCKET_URL, 
	options: {
		transports: ['websocket'],
	},
}

@NgModule({
	declarations: [AppComponent, DataGridComponent, HomePageComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		GridModule,
		BrowserAnimationsModule,
		DropDownsModule,
		ReactiveFormsModule,
		DateInputsModule,
		StoreModule.forRoot({students:studentReducer},),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
		}),
		EffectsModule.forRoot([DataGridEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		SocketIoModule.forRoot(socketConfig), 
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
