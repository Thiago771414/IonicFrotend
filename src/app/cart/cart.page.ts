import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from 'src/services/domain/cart.service';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(public cartService: CartService, public produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  async loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      await this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }
  
  async removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  async increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  async decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }
  
  goOn() {
    this.router.navigate(['categorias']);
  }

  checkout() {
    this.router.navigate(['pick-address']);
  }

}
