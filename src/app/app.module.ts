import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DateTimeTransformPipe } from './custom-pipe/datetime-transform.pipe';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { InterceptorServiceService } from './services/interceptor-service.service'

@NgModule({
  declarations: [
    AppComponent,
    DateTimeTransformPipe,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorServiceService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
