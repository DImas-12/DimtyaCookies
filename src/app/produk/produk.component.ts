import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProdukService } from './produk.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProdukComponent } from './dialogProduk/dialogProduk.component';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.component.html',
  styleUrls: ['./produk.component.scss'],
})
export class ProdukComponent implements OnInit {
  DataProduk: any;
  title2!: string;
  displayedColumns: string[] = ['Produk', 'Harga', 'action'];

  dataSource: any;

  constructor(private produkService: ProdukService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDataProduk();
  }

  DialogAdd() {
    this.title2 = 'add';
    const dialogRef = this.dialog.open(DialogProdukComponent, {
      data: {
        Title: 'Add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result', result);
      if (this.title2 == 'add') {
        console.log('ini add', result);
        this.TambahData(result);
      }
    });
  }

  DialogEdit(e: any) {
    console.log('element', e);
    this.title2 = 'edit';
    const dialogRef = this.dialog.open(DialogProdukComponent, {
      data: {
        Title: 'edit',
        dataIsi: e.attributes,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('data edit haha2', this.title2);
      if (this.title2 == 'edit') {
        console.log('data edit haha');
        this.EditData(e.id, result);
      }
    });
  }
  getDataProduk() {
    this.produkService
      .getProduk()
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
        this.DataProduk = response.data;
        console.log('response haha', this.DataProduk);
        this.dataSource = this.DataProduk;
      });
  }

  TambahData(data: any) {
    console.log('data tambah', data);
    const tmp = {
      data: {
        Produk: data.Produk,
        Harga: parseInt(data.Harga),
      },
    };
    this.produkService
      .PostProduk(tmp)
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
        this.getDataProduk();
      });
  }
  EditData(id: any, data: any) {
    console.log('data edit', data);
    console.log('data edit id', id);
    const tmp = {
      data: {
        Produk: data.Produk,
        Harga: parseInt(data.Harga),
      },
    };
    this.produkService
      .UpdataProduk(id, tmp)
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
        this.getDataProduk();
      });
  }
  DeleteData(e: any) {
    console.log('data eee', e);
    this.produkService
      .DeleteProduk(e.id)
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
        this.getDataProduk();
      });
  }
}
