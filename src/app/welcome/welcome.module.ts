import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
/**-----------------------
 * | Modulo compartido
 * -----------------------*/
import { SharedModule } from "../shared/shared.module";

/**-----------------------
 * | Componentes
 * -----------------------*/
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AnimeListComponent } from './components/anime-list/anime-list.component';
import { AnimeCardComponent } from './components/anime-card/anime-card.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AnimeListComponent,
    AnimeCardComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
  ]
})
export class WelcomeModule { }
