import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [FooterComponent, NavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationComponent, FooterComponent],
})
export class SharedModule {}
