import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  
  navParams = new NavParams;

  pedido: PedidoDTO;
  
  
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 
  constructor(private route: ActivatedRoute, private router: Router, public cartService: CartService) {
    this.pedido = this.navParams.get('pedido');
  }

  ngOnInit() {
    let cart = this.cartService.getCart();

    this.pedido = {
      cliente: {id: '1'},
      enderecoDeEntrega: null,
      pagamento: null,
      itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
    }
  }

  formGroup = new FormGroup({
    numeroDeParcelas: new FormControl (1, [Validators.required]),
    "@type": new FormControl ("pagamentoComCartao", [Validators.required])
  });
 
  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }
}
