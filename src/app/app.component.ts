
// controller da view app.component.html
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';

@Component({

  // selector: 'app-root' está ligado com o app-root do index.html

  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})

// a classe AppComponent tem três atributos title, url, icon
// a tela dessa classe é app.component.html,
// para usar um atributo da classe na tela {{ atributo }}
//controlador folder.module.ts
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/folder/Inbox',
      icon: 'home'
    },
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'phone-portrait'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'images'
    },
    {
      title: 'Logout',
      url: '/folder/logout',
      icon: 'log-out'
    },
    {
      title: 'sigUp',
      url: '/signup',
      icon: 'build'
    },
    {
      title: 'Carrinho',
      url: '/cart',
      icon: 'basket'
    }
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    if (page => page.title == 'Logout'){
        this.auth.logout();
    }
  }
}
