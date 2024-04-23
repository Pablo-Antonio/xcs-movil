import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceMifiPage } from './balance-mifi.page';

const routes: Routes = [
  {
    path: '',
    component: BalanceMifiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceMifiPageRoutingModule {}
