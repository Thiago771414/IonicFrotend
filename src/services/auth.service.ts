import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){        
    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
               //para pegar o cabeçalho da requisição
               observe: 'response',
               //login retorna um corpo vazio
               //para não dar erro de parse json de corpo vazio
               responseType: 'text'
            })
    }
}