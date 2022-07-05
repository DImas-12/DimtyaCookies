import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdukRoutingModule } from './produk-routing.module';
import { ProdukComponent } from './produk.component';
import { ProdukCardComponent } from './produk-card/produk-card.component';

@NgModule({
  declarations: [ProdukComponent, ProdukCardComponent],
  imports: [CommonModule, ProdukRoutingModule],
})
export class ProdukModule {}
