import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutSuccessComponent } from './components/checkout/checkout-success/checkout-success.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '**', redirectTo: '/' },
  { path: '', component: ProductsComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout/:username/:totalprice', component: CheckoutSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
