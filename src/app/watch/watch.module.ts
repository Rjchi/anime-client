import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { VideoComponent } from './components/video/video.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';

@NgModule({
  declarations: [VideoComponent, WatchPageComponent],
  imports: [CommonModule, WatchRoutingModule],
})
export class WatchModule {}
