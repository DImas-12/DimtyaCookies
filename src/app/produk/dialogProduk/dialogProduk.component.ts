import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdukService } from '../produk.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-dialogProduk',
  templateUrl: './dialogProduk.component.html',
  styleUrls: ['./dialogProduk.component.scss'],
})
export class DialogProdukComponent implements OnInit, OnChanges {
  @Input() data!: any;
  DialogForm!: FormGroup;
  title: any;
  datacard: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataTitle: any,
    private produkService: ProdukService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('perubahan', changes);
    console.log('perubahan form', this.DialogForm);
  }

  ngOnInit(): void {
    this.FormGroup();
    console.log('datanya?', this.dataTitle);
    if (this.dataTitle.Title == 'add') {
      this.title = 'add';
    } else if (this.dataTitle.Title == 'edit') {
      this.title = 'edit';
      this.DataEdit();
    }
  }
  DataEdit() {
    console.log('data isis', this.dataTitle);
    this.DialogForm.setValue({
      Produk: this.dataTitle.dataIsi.Produk,
      Harga: this.dataTitle.dataIsi.Harga,
    });
  }
  FormGroup() {
    this.DialogForm = new FormGroup({
      Produk: new FormControl(null, Validators.required),
      Harga: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  TambahData() {
    console.log('data tambah', this.DialogForm.value);
    this.produkService
      .PostProduk(this.DialogForm.value)
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response', response);
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
      });
  }
}
