import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { StorageService } from 'src/services/storage.service';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})

export class PaymentPage implements OnInit {
  
  navParams = new NavParams;

  pedido: PedidoDTO;
  
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup : FormGroup

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    
    this.pedido = this.navParams.get('pedido');
    console.log(this.pedido);
  }

  ngOnInit() {
 
    this.formGroup = new FormGroup({
      numeroDeParcelas: new FormControl ('1', [Validators.required]),
      "@type": new FormControl('pagamentoComCartao', [Validators.required])
    });

    //this.pedido.pagamento = this.formGroup.value;
  }

  nextPage(pagamento: PedidoDTO) {
    //this.pedido.pagamento.numeroDeParcelas = 1;
    //this.pedido.pagamento['@type'] = 'pagamentoComCartao'
    //this.pedido.pagamento.numeroDeParcelas = pagamento.pagamento.numeroDeParcelas;
    //this.pedido.pagamento['@type'] = pagamento.pagamento['@type'];
    console.log(this.pedido);
    this.router.navigate(['order-confirmation', {pedido: this.pedido}]);
    //this.router.navigate(['categorias']);
  }
}