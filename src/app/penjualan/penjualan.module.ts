import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DialogPenjualanComponent } from './dialogPenjualan/dialogPenjualan.component';
import { PenjualanRoutingModule } from './penjualan-routing.module';
import { PenjualanComponent } from './penjualan.component';

@NgModule({
  declarations: [PenjualanComponent, DialogPenjualanComponent],
  imports: [CommonModule, PenjualanRoutingModule, SharedModule],
})
export class PenjualanModule {}
