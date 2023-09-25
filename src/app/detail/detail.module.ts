import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DetailRoutingModule } from './detail-routing.module';

import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { AnimeInfoComponent } from './components/anime-info/anime-info.component';


@NgModule({
  declarations: [
    DetailPageComponent,
    AnimeInfoComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    SharedModule
  ]
})
export class DetailModule { }
