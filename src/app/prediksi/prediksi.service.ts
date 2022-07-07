import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Mentor from '../../assets/DataSet.json';

const routes = {
  JSON: () => Mentor,
};

@Injectable({
  providedIn: 'root',
})
export class PrediksiService {
  constructor(private httpClient: HttpClient) {}
  DataNastar = [
    {
      id: 1,
      Kue: 'Nastar',
      kuantitas: 20,
      harga: 65000,
      totalHarga: 1300000,
      Tahun: 2017,
    },
    {
      id: 2,
      Kue: 'Nastar',
      kuantitas: 24,
      harga: 65000,
      totalHarga: 1560000,
      Tahun: 2018,
    },
    {
      id: 3,
      Kue: 'Nastar',
      kuantitas: 72,
      harga: 65000,
      totalHarga: 4680000,
      Tahun: 2019,
    },
    {
      id: 4,
      Kue: 'Nastar',
      kuantitas: 30,
      harga: 65000,
      totalHarga: 1755000,
      Tahun: 2020,
    },
    {
      id: 5,
      Kue: 'Nastar',
      kuantitas: 60,
      harga: 65000,
      totalHarga: 3900000,
      Tahun: 2021,
    },
    {
      id: 6,
      Kue: 'Nastar',
      kuantitas: 55,
      harga: 65000,
      totalHarga: 4125000,
      Tahun: 2022,
    },
  ];
  DataKastengel = [
    {
      id: 1,
      Kue: 'Kaastengels',
      kuantitas: 20,
      harga: 65000,
      totalHarga: 1300000,
      Tahun: 2017,
    },
    {
      id: 1,
      Kue: 'Kaastengels',
      kuantitas: 24,
      harga: 65000,
      totalHarga: 1560000,
      Tahun: 2018,
    },
    {
      id: 1,
      Kue: 'Kaastengels',
      kuantitas: 72,
      harga: 65000,
      totalHarga: 4680000,
      Tahun: 2019,
    },
    {
      id: 1,
      Kue: 'Kaastengels',
      kuantitas: 30,
      harga: 65000,
      totalHarga: 1755000,
      Tahun: 2020,
    },
    {
      id: 1,
      Kue: 'Kaastengels',
      kuantitas: 50,
      harga: 65000,
      totalHarga: 3250000,
      Tahun: 2021,
    },
    {
      id: 1,
      Kue: 'Kaastengels',
      kuantitas: 40,
      harga: 65000,
      totalHarga: 3000000,
      Tahun: 2022,
    },
  ];
  directories: BehaviorSubject<any> = new BehaviorSubject<any[]>(
    this.DataNastar
  );
  GetData() {
    return this.directories;
  }
  PrediksiNastar() {
    const tmpNastar = this.directories.getValue();
    let rata1: any;
    let rata2: any;
    let rata3: any;
    let peramalan: any;
    let Kue: any;
    let Tahun: any;
    tmpNastar.map((x: any, i: number) => {
      console.log('xxx', i);
      Kue = x.Kue;
      Tahun = x.Tahun;
      if (i == 3) {
        rata1 = x.kuantitas;
        console.log('rata1', rata1);
      } else if (i == 4) {
        rata2 = x.kuantitas;
        console.log('rata2', rata2);
      } else if (i == 5) {
        rata3 = x.kuantitas;
        console.log('rata3', rata3);
      } else {
        console.log('gagal');
      }
    });
    peramalan = (rata1 + rata2 + rata3) / 3;
    console.log('peramalan', peramalan);
    const tmp = {
      id: 7,
      Kue: Kue,
      kuantitas: peramalan,
      harga: 65000,
      totalHarga: 1300000,
      Tahun: Tahun + 1,
    };
    console.log('peramalan tmp', tmp);
    tmpNastar.push(tmp);

    console.log('data source sekarang', tmpNastar);
  }
}
