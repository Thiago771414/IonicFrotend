import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[] = [];

  page : number = 0;

  constructor(public produtoService: ProdutoService, private route: ActivatedRoute, private router: Router, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.route.snapshot.paramMap.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length -1;
      this.loadImageUrls(start, end);
    },
    error => {});
  }

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }  

  showDetail(produto_id : string) {
    this.router.navigate(['produto-detail', {produto_id : produto_id}]);
  }

  cart() {
    this.router.navigate(['cart']);
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      duration: 1000
    });
    await loading.present();
  }

  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  doInfinite(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}

