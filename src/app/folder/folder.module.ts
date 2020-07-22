import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';
//importar o componente
import { FolderPage } from './folder.page';
//import {CalculadoraModule} from '../calculadora/calculadora.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
    //CalculadoraModule
  ],
  //declarar o componente
  declarations: [FolderPage]
})
export class FolderPageModule {}
