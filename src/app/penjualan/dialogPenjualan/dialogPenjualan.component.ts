import { Component, DoCheck, Inject, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PenjualanService } from '../penjualan.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-dialogPenjualan',
  templateUrl: './dialogPenjualan.component.html',
  styleUrls: ['./dialogPenjualan.component.scss'],
})
export class DialogPenjualanComponent implements OnInit, DoCheck {
  @Input() data!: any;
  EditForm!: FormGroup;
  AddForm!: FormGroup;
  DataProduk: any = [];
  DialogForm: any;
  title: any;
  datacard: any;
  TombolSimpan!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataTitle: any,
    private penjualanService: PenjualanService,
    private dialogRef: MatDialogRef<DialogPenjualanComponent>
  ) {}
  ngDoCheck(): void {
    // console.log('perubahan dochek');
    if (this.dataTitle.Title == 'add') {
      if (this.AddForm.status == 'INVALID') {
        console.log('perubahan invalid');
        this.TombolSimpan = false;
      } else if (this.AddForm.status == 'VALID') {
        console.log('perubahan valid');
        this.TombolSimpan = true;
        this.DialogForm = this.AddForm.value;
      }
    } else if (this.dataTitle.Title == 'edit') {
      if (this.EditForm.status == 'INVALID') {
        console.log('perubahan invalid');
        this.TombolSimpan = false;
      } else if (this.EditForm.status == 'VALID') {
        console.log('perubahan valid');
        this.TombolSimpan = true;
        this.DialogForm = this.EditForm.value;
      }
    }
  }

  ngOnInit(): void {
    console.log('datanya?', this.dataTitle);
    if (this.dataTitle.Title == 'add') {
      this.title = 'Add';
      this.FormAdd();
      this.getdataKue();
    } else if (this.dataTitle.Title == 'edit') {
      this.title = 'Edit';
      this.FormEdit();
      this.DataEdit();
    }
  }
  OnSimpan() {
    this.dialogRef.close({ data: this.DialogForm });
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  getdataKue() {
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
          };
          this.DataProduk.push(tmp);
        });
      });
  }
  DataEdit() {
    console.log('data isis', this.dataTitle);
    this.EditForm.setValue({
      Tahun: this.dataTitle.dataIsi.Tahun,
      Kuantitas: this.dataTitle.dataIsi.Kuantitas,
      Harga: this.dataTitle.dataIsi.Harga,
    });
  }
  FormEdit() {
    this.EditForm = new FormGroup({
      Tahun: new FormControl(null, Validators.required),
      Kuantitas: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      Harga: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  FormAdd() {
    this.AddForm = new FormGroup({
      Produk: new FormControl(null, Validators.required),
      Tahun: new FormControl(null, Validators.required),
      Kuantitas: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      Harga: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }
  Simpan() {
    console.log('simpanan', this.EditForm);
  }
}
