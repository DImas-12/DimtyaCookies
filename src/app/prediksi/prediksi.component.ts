import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PrediksiService } from './prediksi.service';
import Swal from 'sweetalert2';
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
  DataPrediksi: any = [];

  DataProduk: any = [];
  DataPeramalan: any = [];

  DataNastar: any;
  DataKaastengels: any;
  DataPutriSalju: any;
  DataStikCoklat: any;
  DataCoklatMede: any;
  DataChocoChip: any;
  DataKurmaCoklat: any;
  DataMilkCookies: any;
  Prediksi22: any;
  Prediksi23: any = [];
  displayedColumns: string[] = [
    'Produk',
    'kuantitas',
    'harga',
    'totalpendapatan',
  ];
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
            produk: x.attributes.Produk,
          };
          this.DataProduk.push(tmp);
        });
        console.log('Kueeee', this.DataProduk);
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

        console.log('sebelum looping', this.DataPrediksi);
        this.DataPrediksi.map((x: any) => {
          const tmpPrediksi = {
            peramalan: x.attributes.penjualans.data,
            produk: x.attributes.Produk,
          };

          this.Prediksi22 = this.PrediksiKue(tmpPrediksi);
          this.Prediksi23.push(this.Prediksi22);
          console.log('sesudah siallan', this.Prediksi23);

          this.dataSource = this.Prediksi23;
          Swal.fire('Berhasil', 'Data Berhasil Diprediksi', 'success');
          this.tablePrediksi = true;
          // this.DataPeramalan = tmpPrediksi;
          // if (tmpPrediksi.produk === this.selectedValue) {
          //   this.DataPeramalan = tmpPrediksi;
          // }

          let tes2 = this.testing(tmpPrediksi.produk);
        });

        let tes3 = this.testing('2');

        console.log('tessss2', tes3);
      });
  }
  testing(data: any) {
    console.log('data testing', data);
    return data;
  }
  PrediksiKue(dataPrediksi: any) {
    let N2019!: number;
    let N2020!: number;
    let N2021!: number;
    let N2022!: number;
    let N2023!: number;
    let N2024!: number;
    let N2025!: number;
    let peramalan: any;

    let Tahun: any;

    console.log('data peramalan siallan', dataPrediksi);

    dataPrediksi.peramalan.map((x: any, i: number) => {
      Tahun = x.attributes.Tahun;
      if (x.attributes.Tahun == 2019) {
        N2019 = x.attributes.Kuantitas;
        console.log('2019', N2019);
      } else if (x.attributes.Tahun == 2020) {
        N2020 = x.attributes.Kuantitas;
      } else if (x.attributes.Tahun == 2021) {
        N2021 = x.attributes.Kuantitas;
      } else if (x.attributes.Tahun == 2022) {
        N2022 = x.attributes.Kuantitas;
      }
    });
    console.log('peramalan 2023 siallan', N2023);

    // if (N2023 === undefined) {
    //   peramalan = this.Perhitungan2023(N2019, N2020, N2021, N2022);
    // } else if (N2024 === undefined) {
    //   peramalan = this.Perhitungan2024(N2020, N2021, N2022, N2023);
    // } else if (N2025 === undefined) {
    //   peramalan = this.Perhitungan2025(N2021, N2022, N2023, N2024);
    // }

    if (this.selectedValue == 2023) {
      peramalan = this.Perhitungan2023(N2019, N2020, N2021, N2022);
    } else if (this.selectedValue == 2024) {
      N2023 = this.Perhitungan2023(N2019, N2020, N2021, N2022);
      peramalan = this.Perhitungan2024(N2020, N2021, N2022, N2023);
    } else if (this.selectedValue == 2025) {
      N2023 = this.Perhitungan2023(N2019, N2020, N2021, N2022);
      N2024 = this.Perhitungan2024(N2020, N2021, N2022, N2023);
      peramalan = this.Perhitungan2025(N2021, N2022, N2023, N2024);
    }
    console.log('peramalan siallan', peramalan);
    const tmp = {
      attributes: {
        Kuantitas: Math.round(peramalan),
        Harga: 75000,
        Total_harga: 75000 * Math.round(peramalan),
        Produk: dataPrediksi.produk,
      },
    };
    return tmp;
    // dataPrediksi.peramalan.push(tmp);

    // this.tablePrediksi = true;
    // this.dataSource = dataPrediksi.peramalan;
    // Swal.fire('Berhasil', 'Data Berhasil Diprediksi', 'success');
  }

  Perhitungan2023(n1: number, n2: number, n3: number, n4: number) {
    let ramal: any;
    if (this.Nratarata == 2) {
      ramal = (n3 + n4) / 2;
    } else if (this.Nratarata == 3) {
      ramal = (n2 + n3 + n4) / 3;
    } else if (this.Nratarata == 4) {
      ramal = (n1 + n2 + n3 + n4) / 4;
    }
    return ramal;
  }
  Perhitungan2024(n1: number, n2: number, n3: number, n4: number) {
    let ramal: any;
    if (this.Nratarata == 2) {
      ramal = (n3 + n4) / 2;
    } else if (this.Nratarata == 3) {
      ramal = (n2 + n3 + n4) / 3;
    } else if (this.Nratarata == 4) {
      ramal = (n1 + n2 + n3 + n4) / 4;
    }
    return ramal;
  }
  Perhitungan2025(n1: number, n2: number, n3: number, n4: number) {
    let ramal: any;
    if (this.Nratarata == 2) {
      ramal = (n3 + n4) / 2;
    } else if (this.Nratarata == 3) {
      ramal = (n2 + n3 + n4) / 3;
    } else if (this.Nratarata == 4) {
      ramal = (n1 + n2 + n3 + n4) / 4;
    }
    return ramal;
  }
}
