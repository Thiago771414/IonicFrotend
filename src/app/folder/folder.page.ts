import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//desbilitar menu página inicial
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public menu: MenuController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  login(){
    this.router.navigate(['/categorias']);
  }
  
  //desabilita menu da tela inicial, mas abre o menu nas outras telas.
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
