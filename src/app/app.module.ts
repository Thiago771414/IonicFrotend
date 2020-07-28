import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';

//importar o submodulo
//import {CalculadoraModule} from './calculadora/calculadora.module';

@NgModule({
  //Meu módulo principal chama meu componente principal
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    //o módulo chama outros módulos nativos
    BrowserModule,
    //Para consumir a API de Back-End
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
    //importa o submódulo e o componente associado ao módulo que eu crio.
    //CalculadoraModule
  ],
  providers: [
    //provider sao serviços relacionados com os componentes
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //define se o serviço criado se é de uma página específica ou em um escopo global.
    //nesse caso possui um único objeto servindo toda a aplicação.
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService
  ],
  //indica quem é o componente principal.
  bootstrap: [AppComponent]
})
export class AppModule {}


