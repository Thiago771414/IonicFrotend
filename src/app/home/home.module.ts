import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
//importar o componente home
import {HomecomponentComponent} from './homecomponent/homecomponent.component'

@NgModule({
    imports: [
        //como é um sub-módulo do módulo principal importa CommonModule
      CommonModule
    ],
    declarations: [
        //importar o componente home
        HomecomponentComponent
    ],
    //tornar o componente do módulo atual visível para o módulo principal app.module.ts
    exports: [
        HomecomponentComponent
    ]
})
export class HomeModule {}