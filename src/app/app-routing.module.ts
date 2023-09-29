import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'anime/detail',
    loadChildren: () =>
      import('./detail/detail.module').then((m) => m.DetailModule),
  },
  {
    path: 'see',
    loadChildren: () =>
      import('./watch/watch.module').then((m) => m.WatchModule),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
