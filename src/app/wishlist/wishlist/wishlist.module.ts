import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { Routes,RouterModule } from '../../../../node_modules/@angular/router';
import { CardComponent } from '../../wishlist/card/card.component';


const routes: Routes = [
  { path: 'my-wishlist', component: WishlistComponent  },
];
@NgModule({
  declarations: [WishlistComponent,CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]

})
export class WishlistModule { }
