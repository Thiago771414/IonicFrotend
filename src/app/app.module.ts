import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//importar o submodulo
//import {CalculadoraModule} from './calculadora/calculadora.module';
import {HomeModule} from './home/home.module';

@NgModule({
  //Meu módulo principal chama meu componente principal
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    //o módulo chama outros módulos nativos
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    //importa o submódulo e o componente associado ao módulo que eu crio.
    //CalculadoraModule
    HomeModule
  ],
  providers: [
    //provider sao serviços relacionados com os componentes
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  //indica quem é o componente principal.
  bootstrap: [AppComponent]
})
export class AppModule {}
