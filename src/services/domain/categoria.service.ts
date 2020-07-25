import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CategoriaService {

    //Faz a requisição para API do back-end injeta no construtor o objeto da requisição.
    constructor(public http: HttpClient) {       
    }

    // encontra o método que será consumido
    // usar crase para utilizar variáveis sem precisar concatenar com operador +
    findAll() : Observable <CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`)
    }
}