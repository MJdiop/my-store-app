import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductCart } from 'src/app/models/product-cart';
import { ProductsService } from 'src/app/servies/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  products: Product[] = []
  product: Product = {} as Product
  id: number | null = null

  constructor(private route: ActivatedRoute, private productServices: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'))
    })

    this.productServices.getProducts().subscribe((res) => {
      this.products = res
      this.product = this.productById(Number(this.id))
    })
  }

  productById(id: number): Product {
    return this.products.filter(product => product.id === id)[0];
  }

  addToCart(product: Product, event: any): void {
    console.log(event.target[0].options, 'sfsd');
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
