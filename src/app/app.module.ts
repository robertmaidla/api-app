import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatasetsComponent } from './components/datasets/datasets/datasets.component';
import { HttpClientModule } from '@angular/common/http';
import { SetItemComponent } from './components/set-item/set-item.component';
import { UploadComponent } from './components/upload/upload.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';

class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log(error);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DatasetsComponent,
    SetItemComponent,
    UploadComponent,
    HeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
