import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';
import {CategoriasComponent} from '../categorias/categorias.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}


