
import { MaterialModule } from './_modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ShellComponent } from './shell/shell.component';
import { ModalLoginComponent } from './modals/modalLogin/modalLogin.component';
import { ModalRegisterComponent } from './modals/modalRegister/modalRegister.component';

import { AccountService } from './_utils/account.service';
import { RoutingModule } from './app.routing';


import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    ShellComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  entryComponents: [
    ShellComponent,
    ModalLoginComponent,
    ModalRegisterComponent
  ],
  providers: [AccountService],
  bootstrap: [ShellComponent]
})
export class AppModule { }
