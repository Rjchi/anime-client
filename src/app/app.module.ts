import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/**--------------------------------------------
 * | Esto es para hacer las peticiones HTTP
 * --------------------------------------------*/
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
