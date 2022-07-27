import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PenjualanService } from './penjualan.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPenjualanComponent } from './dialogPenjualan/dialogPenjualan.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-penjualan',
  templateUrl: './penjualan.component.html',
  styleUrls: ['./penjualan.component.scss'],
})
export class PenjualanComponent implements OnInit {
  selectedValue: any;
  DataKue: any = [];

  // boolean
  tablePrediksi!: boolean;
  Cari!: boolean;
  Tambah!: boolean;
  // Dataset
  DataPenjualan: any;
  DatasetNastar: any;
  DatasetKastengel: any;
  DatasetPutriSalju: any;
  DatasetStikcoklat: any;
  DatasetCoklatmede: any;
  DatasetChocochip: any;
  DatasetKurmacoklat: any;
  DatasetMilkCookies: any;

  DataProduk: any;
  title2!: string;
  displayedColumns: string[] = [
    'Tahun',
    'kuantitas',
    'harga',
    'totalpendapatan',
    'action',
  ];

  dataSource: any;

  constructor(
    private penjualanService: PenjualanService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tablePrediksi = false;
    this.Cari = false;
    this.Tambah = false;
    this.getDataKue();
    this.getDataPenjualan();
  }

  getDataKue() {
    this.penjualanService
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
            id: x.id,
          };
          this.DataKue.push(tmp);
        });
        console.log('Kueeee', this.DataKue);
      });
  }
  DialogAdd() {
    this.title2 = 'add';
    const dialogRef = this.dialog.open(DialogPenjualanComponent, {
      data: {
        Title: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result', result);
      if (result.data) {
        if (this.title2 == 'add') {
          console.log('ini add', result.data);
          this.TambahData(result.data);
        }
      }
    });
  }

  EditData(e: any) {
    this.title2 = 'edit';
    const dialogRef = this.dialog.open(DialogPenjualanComponent, {
      data: {
        Title: 'edit',
        dataIsi: e.attributes,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('data edit haha2', this.title2);
      if (result.data) {
        if (this.title2 == 'edit') {
          console.log('data edit haha', result);
          // this.EditData(e.id, result);
          this.EditDataAPI(e.id, result);
        }
      }
    });
  }
  getDataPenjualan() {
    this.penjualanService
      .getPenjualan()
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        this.DataPenjualan = response.data;

        this.DataPenjualan.map((x: any) => {
          const tmpPrediksi = {
            penjualan: x.attributes.penjualans.data,
            Produk: x.attributes.Produk,
          };

          if (tmpPrediksi.Produk === 'Nastar') {
            this.DatasetNastar = tmpPrediksi;
            console.log('data nastar', this.DatasetNastar);
          } else if (tmpPrediksi.Produk === 'Kaastengels') {
            this.DatasetKastengel = tmpPrediksi;
          } else if (tmpPrediksi.Produk === 'Putri Salju') {
            this.DatasetPutriSalju = tmpPrediksi;
          } else if (tmpPrediksi.Produk === 'Stik Coklat') {
            this.DatasetStikcoklat = tmpPrediksi;
          } else if (tmpPrediksi.Produk === 'Coklat Mede') {
            this.DatasetCoklatmede = tmpPrediksi;
          } else if (tmpPrediksi.Produk === 'Choco Chip') {
            this.DatasetChocochip = tmpPrediksi;
          } else if (tmpPrediksi.Produk === 'Kurma Coklat') {
            this.DatasetKurmacoklat = tmpPrediksi;
          } else if (tmpPrediksi.Produk === 'Milk Cookies') {
            this.DatasetMilkCookies = tmpPrediksi;
          }
        });
        this.SelectDataSet();
      });
  }
  SelectDataSet() {
    if (this.selectedValue == 'Nastar') {
      console.log('nastar sialllana', this.DatasetNastar);
      this.dataSource = this.DatasetNastar.penjualan;

      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Kaastengels') {
      this.dataSource = this.DatasetKastengel.penjualan;
      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Putri Salju') {
      this.dataSource = this.DatasetPutriSalju.penjualan;
      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Stik Coklat') {
      this.dataSource = this.DatasetStikcoklat.penjualan;
      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Coklat Mede') {
      this.dataSource = this.DatasetCoklatmede.penjualan;
      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Choco Chip') {
      this.dataSource = this.DatasetChocochip.penjualan;
      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Kurma Coklat') {
      this.dataSource = this.DatasetKurmacoklat.penjualan;
      this.tablePrediksi = true;
    } else if (this.selectedValue == 'Milk Cookies') {
      this.dataSource = this.DatasetMilkCookies.penjualan;
      this.tablePrediksi = true;
    }
  }
  toogle(e: any) {
    if (e.value === 'cari') {
      this.Cari = true;
      this.Tambah = false;
    } else if (e.value === 'Tambah') {
      this.Cari = false;
      this.Tambah = true;
    }
  }

  // Service
  TambahData(data: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,

      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log('data tambah', data);
        const ID = this.DataKue.find(
          (element: any) => element.produk == data.Produk
        );
        console.log('found', ID);
        const tmp = {
          data: {
            Tahun: data.Tahun,
            Kuantitas: parseInt(data.Kuantitas),
            Harga: parseInt(data.Harga),
            Total_harga: parseInt(data.Harga) * parseInt(data.Kuantitas),
            produk: ID.id,
          },
        };
        console.log('data tambah tmp', tmp);
        this.penjualanService
          .PostPenjualan(tmp)
          .pipe(
            finalize(() => {
              console.log('done');
            })
          )
          .subscribe((response: any) => {
            console.log('response', response);
            Swal.fire('Berhasil', 'Data Berhasil Disimpan', 'success');
          });
      } else if (result.isDenied) {
        Swal.fire('Tidak Berhasil', 'Data Tidak Disimpan', 'info');
      }
    });
  }
  EditDataAPI(id: any, data: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,

      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log('data edit', data);
        console.log('data edit id', id);

        const tmp = {
          data: {
            Tahun: data.Tahun,
            Kuantitas: parseInt(data.Kuantitas),
            Harga: parseInt(data.Harga),
            Total_harga: parseInt(data.Harga) * parseInt(data.Kuantitas),
          },
        };
        this.penjualanService
          .UpdataProduk(id, tmp)
          .pipe(
            finalize(() => {
              console.log('done');
            })
          )
          .subscribe((response: any) => {
            console.log('response', response);
            this.getDataPenjualan();
            Swal.fire('Berhasil', 'Data Berhasil Disimpan', 'success');
          });
      } else if (result.isDenied) {
        Swal.fire('Tidak Berhasil', 'Data Tidak Disimpan', 'info');
      }
    });
  }
  DeleteData(e: any) {
    Swal.fire({
      title: 'Apa Kamu Yakin?',
      text: 'Data Akan Dihapus Selamanya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('data eee', e);
        this.penjualanService
          .DeleteProduk(e.id)
          .pipe(
            finalize(() => {
              console.log('done');
            })
          )
          .subscribe((response: any) => {
            console.log('response', response);
            this.getDataPenjualan();
            Swal.fire('Deleted!', 'File Berhasil Dihapus', 'success');
          });
      }
    });
  }
}
