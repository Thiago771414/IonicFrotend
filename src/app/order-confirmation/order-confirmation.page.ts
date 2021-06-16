import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { CartItem } from 'src/models/cart-item';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { RefDTO } from 'src/models/ref.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  navParams = new NavParams;

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  items: EnderecoDTO[];
  pagamento: PagamentoDTO;
  client : RefDTO;
  codpedido: string;

  constructor(public cartService: CartService, public clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute, public pedidoService: PedidoService) { 
    this.pedido = this.navParams.get('pedido');
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;
     
    //this.clienteService.findById(this.pedido.cliente.id)
        //.subscribe(response => {
          //this.cliente = response as ClienteDTO;
          //console.log(this.cliente);
          //this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
        //},
        //error => {
          //this.router.navigate(['folder/:id']);
        //})
        
          let cart = this.cartService.getCart();
          this.pedido = {
            cliente: this.client,
            enderecoDeEntrega: this.client,
            pagamento: this.pagamento,
            items : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
  }

  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.router.navigate(['cart']);
  }

  home() {
    this.router.navigate(['categorias']);
  }

  checkout() {
        this.cartService.createOrClearCart();
        this.codpedido = '102-103-104';
        //this.router.navigate(['categorias']);
  }
}
