import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit(){
    //chamada assíncrona aqui é com subscribe ou callback
    // => função anônima declara a função dentro de outra função ao invés de chamar a função criada em outro lugar.
    this.categoriaService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
