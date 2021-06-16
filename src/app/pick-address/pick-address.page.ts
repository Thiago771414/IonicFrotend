import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { Router } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];
  cliente: ClienteDTO;
  pedido: PedidoDTO;
  endereco: EnderecoDTO;

  constructor(public storage: StorageService, public clienteService: ClienteService, private router: Router, public cartService: CartService) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
       this.clienteService.findByEmail(localUser.email)
       .subscribe(response => {
        this.items = response['enderecos'];

        let cart = this.cartService.getCart();

        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          items : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
        }
        console.log(this.pedido);
       },
       error => {
         if(error.status == 403) {
          this.router.navigate(['folder/:id']);
        }
      });
    }
    else {
      this.router.navigate(['folder/:id']);
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.router.navigate(['payment', {pedido: this.pedido}]);
  }
}
