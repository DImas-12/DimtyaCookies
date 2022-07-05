import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.component.html',
  styleUrls: ['./produk.component.scss'],
})
export class ProdukComponent implements OnInit {
  Kue = [
    {
      id: 'Nastar',
      nama: 'Nastar',
    },
    {
      id: 'Kaastengels',
      nama: 'Kaastengels',
    },
    {
      id: 'Putri_Salju',
      nama: 'Putri Salju',
    },
    {
      id: 'Stik_Coklat',
      nama: 'Stik Coklat',
    },
    {
      id: 'Coklat_Mede',
      nama: 'Coklat Mede',
    },
    {
      id: 'Choco_Chip',
      nama: 'Choco Chip',
    },
    {
      id: 'Kurma_Coklat',
      nama: 'Kurma Coklat',
    },
    {
      id: 'Milk_Cookies',
      nama: 'Milk Cookies',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
