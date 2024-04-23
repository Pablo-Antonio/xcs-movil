import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./pages/balance/balance.module').then( m => m.BalancePageModule)
  },
  {
    path: 'balance-mifi',
    loadChildren: () => import('./pages/balance-mifi/balance-mifi.module').then( m => m.BalanceMifiPageModule)
  },
  {
    path: 'notice-privacy',
    loadChildren: () => import('./pages/notice-privacy/notice-privacy.module').then( m => m.NoticePrivacyPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
