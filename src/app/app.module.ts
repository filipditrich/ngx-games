import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRouting } from './app.module.routing';
import {
  MementoComponent,
  MementoService,
  BoardComponent,
  CardComponent,
  CardImageComponent,
  CardTextComponent,
  ResultsComponent
} from './pages/memento';
import {ModalComponent} from './pages/components/modal/modal.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
  ],
  declarations: [
    AppComponent,
    BoardComponent,
    MementoComponent,
    BoardComponent,
    ResultsComponent,
    CardComponent,
    CardImageComponent,
    CardTextComponent,
    ModalComponent,
    HomeComponent,
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    MementoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
