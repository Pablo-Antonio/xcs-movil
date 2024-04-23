import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticePrivacyPageRoutingModule } from './notice-privacy-routing.module';

import { NoticePrivacyPage } from './notice-privacy.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticePrivacyPageRoutingModule,
    SharedModule
  ],
  declarations: [NoticePrivacyPage]
})
export class NoticePrivacyPageModule {}
