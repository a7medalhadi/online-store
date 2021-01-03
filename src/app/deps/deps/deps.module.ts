import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenComponent } from '../men/men.component';
import { WomenComponent } from '../women/women.component';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { ItemspinnerComponent } from '../itemspinner/itemspinner.component';
import { SearchComponent } from '../search/search.component';
import { ItemComponent } from '../../product/item/item.component';
import { CardComponent } from '../../card/card.component';

const routes: Routes = [
  { path: 'men', component: MenComponent  },
  { path: 'women', component: WomenComponent},
  { path: 'search', component: SearchComponent},
  { path: 'item/:itemId',component: ItemComponent }
];


@NgModule({
  declarations: [
    MenComponent,
    WomenComponent,
    ItemspinnerComponent,
    ItemComponent,
    CardComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class DepsModule { }
