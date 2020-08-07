import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';

import { Observable, throwError } from 'rxjs';
import { CidadeDTO } from 'src/models/cidade.dto';

@Injectable()
export class CidadeService {

    //Faz a requisição para API do back-end injeta no construtor o objeto da requisição.
    constructor(public http: HttpClient) {       
    }

    // encontra o método que será consumido
    // usar crase para utilizar variáveis sem precisar concatenar com operador +
    findAll(estado_id : string) : Observable <CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}
