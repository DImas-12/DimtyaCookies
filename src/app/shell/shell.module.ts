import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HeaderComponent },
  //{ path: 'provinsi2', component: Provinsi2Component },
  //{ path: 'country', component: CountryComponent },
];

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedModule, RouterModule.forRoot(appRoutes)],
})
export class ShellModule {}
