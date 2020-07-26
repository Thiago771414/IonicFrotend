import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//desbilitar menu página inicial
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public menu: MenuController, public auth: AuthService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.router.navigate(['/categorias']);
      },
      error => {});   
  }
  
  //desabilita menu da tela inicial, mas abre o menu nas outras telas.
  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

}
