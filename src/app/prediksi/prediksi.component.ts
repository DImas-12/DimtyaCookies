import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PrediksiService } from './prediksi.service';

@Component({
  selector: 'app-prediksi',
  templateUrl: './prediksi.component.html',
  styleUrls: ['./prediksi.component.scss'],
})
export class PrediksiComponent implements OnInit {
  selectedValue: any;
  tablePrediksi!: boolean;
  Nratarata: any;

  // Dataset
  DataPrediksi: any;
  DatasetNastar: any;
  DatasetKastengel: any;
  DatasetPutriSalju: any;
  DatasetStikcoklat: any;
  DatasetCoklatmede: any;
  DatasetChocochip: any;
  DatasetKurmacoklat: any;
  DatasetMilkCookies: any;

  DataKue: any = [];
  DataPeramalan: any;
  KueSekarang: any;

  displayedColumns: string[] = ['Tahun', 'kuantitas', 'harga', 'totalharga'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;

  // DataTable

  constructor(private prediksiService: PrediksiService) {}

  ngOnInit(): void {
    this.tablePrediksi = false;
    this.getDataKue();
  }
  getDataKue() {
    this.prediksiService
      .getDataKue()
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('Kueeee44', response);
        response.data.map((x: any) => {
          const tmp = {
            kue: x.attributes.Kue,
          };
          this.DataKue.push(tmp);
        });
        console.log('Kueeee', this.DataKue);
      });
  }
  getDataPrediksi() {
    this.prediksiService
      .getPrediksi()
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        this.DataPrediksi = response.data;

        this.DataPrediksi.map((x: any) => {
          const tmpPrediksi = {
            peramalan: x.attributes.penjualans.data,
            kue: x.attributes.Kue,
          };

          if (tmpPrediksi.kue === 'Nastar') {
            this.DatasetNastar = tmpPrediksi;
            console.log('data nastar', this.DatasetNastar);
          } else if (tmpPrediksi.kue === 'Kaasstengels') {
            this.DatasetKastengel = tmpPrediksi;
          } else if (tmpPrediksi.kue === 'Putri Salju') {
            this.DatasetPutriSalju = tmpPrediksi;
          } else if (tmpPrediksi.kue === 'Stik Coklat') {
            this.DatasetStikcoklat = tmpPrediksi;
          } else if (tmpPrediksi.kue === 'Coklat Mede') {
            this.DatasetCoklatmede = tmpPrediksi;
          } else if (tmpPrediksi.kue === 'Chocochip') {
            this.DatasetChocochip = tmpPrediksi;
          } else if (tmpPrediksi.kue === 'Kurma Coklat') {
            this.DatasetKurmacoklat = tmpPrediksi;
          } else if (tmpPrediksi.kue === 'Milk Cookies') {
            this.DatasetMilkCookies = tmpPrediksi;
          }
        });
        this.PrediksiKue();
      });
  }
  PrediksiKue() {
    console.log('prediksii', this.selectedValue);

    if (this.selectedValue == 'Nastar') {
      this.DataPeramalan = this.DatasetNastar;
    } else if (this.selectedValue == 'Kaasstengels') {
      this.DataPeramalan = this.DatasetKastengel;
    } else if (this.selectedValue == 'Putri Salju') {
      this.DataPeramalan = this.DatasetPutriSalju;
    } else if (this.selectedValue == 'Stik Coklat') {
      this.DataPeramalan = this.DatasetStikcoklat;
    } else if (this.selectedValue == 'Coklat Mede') {
      this.DataPeramalan = this.DatasetCoklatmede;
    } else if (this.selectedValue == 'Chocochip') {
      this.DataPeramalan = this.DatasetChocochip;
    } else if (this.selectedValue == 'Kurma Coklat') {
      this.DataPeramalan = this.DatasetKurmacoklat;
    } else if (this.selectedValue == 'Milk Cookies') {
      this.DataPeramalan = this.DatasetMilkCookies;
    }
    let N2019: any;
    let N2020: any;
    let N2021: any;
    let N2022: any;
    let peramalan: any;

    let Tahun: any;

    this.KueSekarang = this.selectedValue;
    console.log('data peramalan siallan', this.DataPeramalan);

    this.DataPeramalan.peramalan.map((x: any, i: number) => {
      Tahun = x.attributes.Tahun;
      if (x.attributes.Tahun == 2019) {
        N2019 = x.attributes.Kuantitas;
      } else if (x.attributes.Tahun == 2020) {
        N2020 = x.attributes.Kuantitas;
      } else if (x.attributes.Tahun == 2021) {
        N2021 = x.attributes.Kuantitas;
      } else if (x.attributes.Tahun == 2022) {
        N2022 = x.attributes.Kuantitas;
      }
    });

    if (this.Nratarata == 2) {
      peramalan = (N2021 + N2022) / 2;
    } else if (this.Nratarata == 3) {
      peramalan = (N2020 + N2021 + N2022) / 3;
    } else if (this.Nratarata == 4) {
      peramalan = (N2019 + N2020 + N2021 + N2022) / 4;
    }
    console.log('peramalan siallan', peramalan);
    const tmp = {
      attributes: {
        Kuantitas: Math.round(peramalan),
        Harga: 75000,
        Total_harga: 75000 * Math.round(peramalan),
        Tahun: parseInt(Tahun) + 1,
      },
    };

    this.DataPeramalan.peramalan.push(tmp);

    this.tablePrediksi = true;
    this.dataSource = this.DataPeramalan.peramalan;
  }
}
