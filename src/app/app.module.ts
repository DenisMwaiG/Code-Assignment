import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layout/layouts.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MockDataService } from './data/mock-data/mock-data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockApiInterceptor } from './data/mock-data/mock-api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    MockDataService,
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
