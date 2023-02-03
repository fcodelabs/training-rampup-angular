import { SignInComponent } from './containers/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers } from '../store/reducers/userReducer';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', reducers),
    LayoutModule,
    IconsModule,
    ButtonsModule,
    DialogsModule,
    InputsModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignInModule {}
