import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Count, Product } from 'src/app/models/product';
import { ProductCart } from 'src/app/models/product-cart';
import { ProductsService } from 'src/app/servies/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  products: Product[] = [];
  cartProducts: ProductCart[] = [];
  count: string[] = Count;
  totalPrice: number = 0;

  @Output() success = new EventEmitter();

  constructor(private route: Router, private productServices: ProductsService) { }

  ngOnInit(): void {
    this.cartProducts = this.productServices.getCart();
    this.calculateTotalPrice();
  }

  removeFromCart(product: ProductCart): void {
    this.productServices.removeFromCart(product);
    this.cartProducts = this.productServices.getCart();
    this.calculateTotalPrice();
    alert(`The item '${product.name}' has been removed from the cart.`)
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce((total, product) => total + product.price * Number(product.option && product.option), 0);
  }

  onSubmit(data: any): void {
    console.log(data);
    this.productServices.clearCart();
    this.route.navigateByUrl(`checkout/${data?.firstName}/${data?.totalPrice}`);
  }

  selectChange(id: number, event: any): void {
    const selectedOption = event.target.options[event.target.options.selectedIndex].value;
    const cartIdx = this.cartProducts.findIndex(cart => cart.id === id);
    cartIdx != -1 && this.cartProducts.length > 0 ? this.cartProducts[cartIdx].option = selectedOption : null;
    this.cartProducts.length > 0 ? this.productServices.addToCart(this.cartProducts) : null;
    this.calculateTotalPrice()
    alert(`the product quantity is updated`)
  }
}
