import { Component, OnInit } from '@angular/core';
import { PrediksiService } from './prediksi.service';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss'],
})
export class PrediksiComponent implements OnInit {
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
    this.GetData();
  }
  GetData() {
    this.prediksiService.GetData().subscribe((response: any) => {
      console.log('lala ress', response);
      this.dataSource = response;
    });
  }
  Prediksi() {
    this.prediksiService.PrediksiNastar();
    // let rata1: any;
    // let rata2: any;
    // let rata3: any;
    // let peramalan: any;
    // let Kue: any;
    // let Tahun: any;
    // this.dataSource.map((x: any, i: number) => {
    //   console.log('xxx', i);
    //   Kue = x.Kue;
    //   Tahun = x.Tahun;
    //   if (i == 3) {
    //     rata1 = x.kuantitas;
    //     console.log('rata1', rata1);
    //   } else if (i == 4) {
    //     rata2 = x.kuantitas;
    //     console.log('rata2', rata2);
    //   } else if (i == 5) {
    //     rata3 = x.kuantitas;
    //     console.log('rata3', rata3);
    //   } else {
    //     console.log('gagal');
    //   }
    // });
    // peramalan = (rata1 + rata2 + rata3) / 3;
    // console.log('peramalan', peramalan);
    // const tmp = {
    //   id: 7,
    //   Kue: Kue,
    //   kuantitas: peramalan,
    //   harga: 65000,
    //   totalHarga: 1300000,
    //   Tahun: Tahun + 1,
    // };
    // console.log('peramalan tmp', tmp);
    // this.dataSource.push(tmp);
    // console.log('data source sekarang', this.dataSource);
  }
}
