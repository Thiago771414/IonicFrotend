import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(public storage: StorageService, public clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
       this.clienteService.findByEmail(localUser.email)
       .subscribe(response => {
        this.items = response['enderecos'];
       },
       error => {
         if(error.status == 403) {
          this.router.navigate(['folder/:id']);
        }
      });
    }
    else {
      this.router.navigate(['folder/:id']);
    }
  }
}
