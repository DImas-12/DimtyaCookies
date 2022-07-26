import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input() data!: any;
  FilePath: any;
  datacard: any;
  constructor() {}

  ngOnInit(): void {
    console.log('data nya haha', this.data);
  }
}
