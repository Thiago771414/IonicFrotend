import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeDTO } from 'src/models/cidade.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup = new FormGroup({
      nome: new FormControl('Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]),
      email: new FormControl('joaquim@gmail.com', [Validators.required, Validators.email]),
      //tipo: new FormControl('1', [Validators.required]),
      cpfOuCnpj: new FormControl('06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      senha: new FormControl('123', [Validators.required]),
      logradouro: new FormControl('Rua Vida', [Validators.required]),
      numero: new FormControl('25', [Validators.required]),
      complemento: new FormControl('Apto 3', []),
      bairro: new FormControl('Copacabana', []),
      cep: new FormControl('10828333', [Validators.required]),
      telefone1: new FormControl('977261827', [Validators.required]),
      telefone2: new FormControl('',[]),
      telefone3: new FormControl('', []),
      estadoId : new FormControl(null, [Validators.required]),
      cidadeId : new FormControl(null, [Validators.required])
  });
  
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public cidadeService: CidadeService, public estadoService: EstadoService) {      
  };
  
  ngOnInit() {  
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  signupUser(){
    console.log("enviou o form");
  }

}
