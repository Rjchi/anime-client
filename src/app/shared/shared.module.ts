import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [FooterComponent, NavigationComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationComponent, FooterComponent, SpinnerComponent],
})
export class SharedModule {}
