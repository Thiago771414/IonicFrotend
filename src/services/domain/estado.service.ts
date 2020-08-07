import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { EstadoDTO } from 'src/models/estado.dto';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class EstadoService {

    //Faz a requisição para API do back-end injeta no construtor o objeto da requisição.
    constructor(public http: HttpClient) {       
    }

    // encontra o método que será consumido
    // usar crase para utilizar variáveis sem precisar concatenar com operador +
    findAll() : Observable <EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`)
    }
}