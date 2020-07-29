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
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/categorias']);
      },
      error => {});   
  }
  
  //desabilita menu da tela inicial, mas abre o menu nas outras telas.
  async ionViewWillEnter() {
    await this.menu.enable(false);
  }

  async ionViewDidLeave() {
    await this.menu.enable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/categorias']);
      },
      error => {});   
  }

}
