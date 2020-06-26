import { Component, OnInit } from '@angular/core';

@Component({
  //tag html do componente da calculadora
  selector: 'app-componente',
  //html renderizado pela tag do componente
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.scss'],
})
export class ComponenteComponent implements OnInit {

  constructor() { }

  //Utilizado para construir a classe no lugar do construtor para evitar erros na inicialização de um objeto.
  ngOnInit() {}

}
