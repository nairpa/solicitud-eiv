import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEditVendedorComponent } from './components/add-edit-vendedor/add-edit-vendedor.component';
import { ListVendedorComponent } from './components/list-vendedor/list-vendedor.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { MessageComponent } from './components/shared/message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    AddEditVendedorComponent,
    ListVendedorComponent,
    MessageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
