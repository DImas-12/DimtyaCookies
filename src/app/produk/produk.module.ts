import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdukRoutingModule } from './produk-routing.module';
import { ProdukComponent } from './produk.component';

import { SharedModule } from '../shared/shared.module';
import { DialogProdukComponent } from './dialogProduk/dialogProduk.component';

@NgModule({
  declarations: [ProdukComponent, DialogProdukComponent],
  imports: [CommonModule, ProdukRoutingModule, SharedModule],
})
export class ProdukModule {}
