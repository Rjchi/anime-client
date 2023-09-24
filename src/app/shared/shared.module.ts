import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [FooterComponent, NavigationComponent],
  imports: [CommonModule],
  exports: [NavigationComponent, FooterComponent],
})
export class SharedModule {}
