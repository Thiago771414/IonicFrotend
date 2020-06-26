import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
//importar o componente calculadora
import {ComponenteComponent} from './componente/componente.component'

@NgModule({
    imports: [
        //como é um sub-módulo do módulo principal importa CommonModule
      CommonModule
    ],
    declarations: [
        //importar o componente calculadora
        ComponenteComponent
    ],
    //tornar o componente do módulo atual visível para o módulo principal app.module.ts
    exports: [
        ComponenteComponent
    ]
})
export class CalculadoraModule {}