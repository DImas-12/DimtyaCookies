import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrediksiComponent } from './prediksi.component';
import { PrediksiRoutingModule } from './prediksi-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PrediksiComponent],
  imports: [CommonModule, PrediksiRoutingModule, SharedModule],
})
export class PrediksiModule {}
