import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseURL;

  items: CategoriaDTO[];

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit(){
    //chamada assíncrona aqui é com subscribe ou callback
    // => função anônima declara a função dentro de outra função ao invés de chamar a função criada em outro lugar.
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });
  }

}
