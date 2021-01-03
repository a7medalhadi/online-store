import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist/wishlist.module').then(m => m.WishlistModule) },
  { path: 'check', loadChildren: () => import('./checkout/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  {path: 'user', loadChildren:()=> import('./user-pages/user/user.module').then(m=>m.UserModule)},
  {path: 'deps', loadChildren:()=> import('./deps/deps/deps.module').then(m=>m.DepsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
