import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '../shell/shell.service';
import { PenjualanComponent } from './penjualan.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts

  { path: '', component: PenjualanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PenjualanRoutingModule {}
