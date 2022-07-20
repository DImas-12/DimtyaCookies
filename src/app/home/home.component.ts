import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  DataCard: any = [];
  DataProduk: any;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getDataProduk();
  }
  getDataProduk() {
    this.homeService
      .getProduk()
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
        this.DataProduk = response.data;
        console.log('response haha', this.DataProduk);
      });
  }
}
// attributes.Kue
