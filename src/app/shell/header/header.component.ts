import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}
  showFiller = false;
  ngOnInit(): void {}
  Home() {
    this.router.navigate(['home']);
  }
  Produk() {
    this.router.navigate(['produk']);
  }
  Prediksi() {
    this.router.navigate(['prediksi']);
  }

  Penjualan() {
    this.router.navigate(['penjualan']);
  }
  logOut() {
    localStorage.removeItem(environment.tokenKey);
    this.router.navigate(['login']);
  }
}
