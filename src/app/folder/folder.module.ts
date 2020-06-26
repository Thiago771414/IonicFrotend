import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';

//import {CalculadoraModule} from '../calculadora/calculadora.module';

import {HomeModule} from '../home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    //CalculadoraModule
    HomeModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
