import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';

const routes: Routes = [
  { path: ':anime/:episode', component: WatchPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchRoutingModule {}
