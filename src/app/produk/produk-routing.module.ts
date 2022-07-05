import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '../shell/shell.service';
import { ProdukComponent } from './produk.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts

  { path: '', component: ProdukComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProdukRoutingModule {}
