import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-produk-card',
  templateUrl: './produk-card.component.html',
  styleUrls: ['./produk-card.component.scss'],
})
export class ProdukCardComponent implements OnInit {
  @Input() data!: any;

  datacard: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('datanya?', this.data);
  }
}
