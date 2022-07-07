import { Component, OnInit } from '@angular/core';
import { PrediksiService } from './prediksi.service';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss'],
})
export class PrediksiComponent implements OnInit {
  selectedValue: any;
  tablePrediksi!: boolean;
  ELEMENT_DATA: any = [
    {
      id: 1,
      Kue1: 'Nastar',
      Kue2: 'Kaastengels',
      Kue3: 'Putri Salju',
      Kue4: 'Stik Coklat',
      Kue5: 'Coklat Mede',
      Kue6: 'Choco Chip',
      Kue7: '',
      Kue8: '',
      Tahun: '20017',
    },
  ];
  displayedColumns: string[] = [
    'No',
    'Kue',
    'kuantitas',
    'harga',
    'totalharga',
    'Tahun',
  ];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;

  // DataTable

  constructor(private prediksiService: PrediksiService) {}

  ngOnInit(): void {
    this.tablePrediksi = false;
  }
  GetData() {
    this.prediksiService.GetData().subscribe((response: any) => {
      console.log('lala ress', response);
      this.dataSource = response;
    });
  }
  Prediksi() {
    this.prediksiService.PrediksiNastar();
    console.log('selek', this.selectedValue);

    this.GetData();
    this.tablePrediksi = true;
  }
}
