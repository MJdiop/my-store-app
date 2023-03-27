import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductCart } from '../models/product-cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/datas.json');
  }

  addToCart(product: ProductCart[]): void {
    window.localStorage.setItem('cart', JSON.stringify(product))
  }

  getCart(): ProductCart[] {
    const cart = window.localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  }

  removeFromCart(product: ProductCart): void {
    const cart = this.getCart()
    const index = cart.findIndex(p => p.id === product.id)
    if (index !== -1) {
      cart.splice(index, 1)
      this.addToCart(cart)
    }
  }

  clearCart(): void {
    window.localStorage.removeItem('cart')
  }
}
