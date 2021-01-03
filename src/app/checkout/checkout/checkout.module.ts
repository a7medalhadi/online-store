import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { CheckoutComponent } from '../checkout.component';
const routes: Routes = [
  { path: 'out', component: CheckoutComponent},
];


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class CheckoutModule { }
