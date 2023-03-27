import { Component } from '@angular/core';
import { Count, Product } from 'src/app/models/product';
import { ProductCart } from 'src/app/models/product-cart';
import { ProductsService } from 'src/app/servies/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  products: Product[] = [];
  count: string[] = Count

  constructor(private productServices: ProductsService) { }

  ngOnInit(): void {
    this.productServices.getProducts().subscribe((res) => {
      this.products = res
    })
  }

  addToCart(product: Product, event: any): void {

    let newProductCart: ProductCart[] = []
    let msg: string = ''
    let isOptionExist: boolean = false

    const selectOption = event.target[0].options[event.target[0].options.selectedIndex].value
    const cart = this.productServices.getCart()

    const cartIndex = cart.findIndex(crt => crt.id === product.id)
    newProductCart = cart

    if (cartIndex === -1 || cart.length === 0) {
      newProductCart.push(Object.assign(product, { option: selectOption }))
      msg = `New Item '${product.name}' added to cart`
    } else {
      const option: string = newProductCart[cartIndex].option
      isOptionExist = selectOption === option

      if (isOptionExist) {
        msg = `${option} Item(s) of '${product.name}' already exist in cart.`;
      } else {
        newProductCart[cartIndex].id = product.id
        newProductCart[cartIndex].option = selectOption
        msg = `${option} Item(s) of '${product.name}' already exist in cart. Will be updated to ${selectOption}`;
      }
    }

    !isOptionExist ? this.productServices.addToCart(newProductCart) : null
    alert(msg)
  }
}
