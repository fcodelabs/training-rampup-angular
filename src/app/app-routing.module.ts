import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './table-module/containers/home-page/home-page.component';



const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      
      { path: '', component: HomePageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
