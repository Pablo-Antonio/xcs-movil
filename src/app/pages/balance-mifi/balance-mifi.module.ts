import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalanceMifiPageRoutingModule } from './balance-mifi-routing.module';

import { BalanceMifiPage } from './balance-mifi.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalanceMifiPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [BalanceMifiPage]
})
export class BalanceMifiPageModule {}
