import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';
import  {JwtHelperService} from '@auth0/angular-jwt';
import { CartService } from './domain/cart.service';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(public http: HttpClient, public storage: StorageService, public cartService: CartService){        
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

    refreshToken(){
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {}, 
            {
               //para pegar o cabeçalho da requisição
               observe: 'response',
               //login retorna um corpo vazio
               //para não dar erro de parse json de corpo vazio
               responseType: 'text'
            })
    }

    sucessfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}