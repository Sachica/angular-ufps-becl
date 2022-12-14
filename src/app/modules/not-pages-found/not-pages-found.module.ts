import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotPagesFoundRoutingModule } from './not-pages-found-routing.module';
import { Page401Component } from './pages/page401/page401.component';
import { Page404Component } from './pages/page404/page404.component';
import { Page500Component } from './pages/page500/page500.component';


@NgModule({
  declarations: [
    Page401Component,
    Page404Component,
    Page500Component,
  ],
  imports: [
    CommonModule,
    NotPagesFoundRoutingModule
  ]
})
export class NotPagesFoundModule { }
