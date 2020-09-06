import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(public produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    let produto_id = this.route.snapshot.paramMap.get('produto_id');
    this.produtoService.findById(produto_id)
    .subscribe(response => {
      this.item = response;
      this.getImageUrlIfExists();
    },
    error => {}); 
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseURL}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

}
