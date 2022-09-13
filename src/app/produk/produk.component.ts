import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProdukService } from './produk.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProdukComponent } from './dialogProduk/dialogProduk.component';
import Swal from 'sweetalert2';
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
      if (result.data) {
        if (this.title2 == 'add') {
          console.log('ini add', result);
          this.TambahData(result);
        }
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
      if (result.data) {
        if (this.title2 == 'edit') {
          console.log('data edit haha');
          this.EditData(e.id, result);
        }
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
    Swal.fire({
      title: 'Kamu Ingin Menyimpan Data?',
      showDenyButton: true,

      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log('data tambah', data);

        console.log('data tambah tmp', data);
        this.produkService
          .PostProduk(data)
          .pipe(
            finalize(() => {
              console.log('done');
            })
          )
          .subscribe((response: any) => {
            console.log('response', response);
            this.getDataProduk();
            Swal.fire('Berhasil', 'Data Berhasil Disimpan', 'success');
          });
      } else if (result.isDenied) {
        Swal.fire('Tidak Berhasil', 'Data Tidak Disimpan', 'info');
      }
    });
  }
  EditData(id: any, data: any) {
    Swal.fire({
      title: 'Kamu Ingin Menyimpan Perubahan data?',
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
            Produk: data.Produk,
            Harga: data.Harga,
          },
        };
        this.produkService
          .UpdataProduk(id, data)
          .pipe(
            finalize(() => {
              console.log('done');
            })
          )
          .subscribe((response: any) => {
            console.log('response', response);
            this.getDataProduk();
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
            Swal.fire('Deleted!', 'File Berhasil Dihapus', 'success');
          });
      }
    });
  }
}
