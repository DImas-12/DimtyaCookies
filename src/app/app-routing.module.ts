import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from './shell/shell.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  Shell.childRoutes([
    {
      path: 'home',
      loadChildren: () =>
        import('./home/home.module').then((m) => m.HomeModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'produk',
      loadChildren: () =>
        import('./produk/produk.module').then((m) => m.ProdukModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'prediksi',
      loadChildren: () =>
        import('./prediksi/prediksi.module').then((m) => m.PrediksiModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'penjualan',
      loadChildren: () =>
        import('./penjualan/penjualan.module').then((m) => m.PenjualanModule),
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
