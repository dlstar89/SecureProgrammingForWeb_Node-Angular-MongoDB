import { MaterialModule } from './_modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**APP SHELL */
import { ShellComponent } from './shell/shell.component';

/**ROUTING */
import { RoutingModule } from './app.routing';

/**MODALS */
import { ModalLoginComponent } from './modals/modalLogin/modalLogin.component';
import { ModalRegisterComponent } from './modals/modalRegister/modalRegister.component';

/**SERVICES */
import { AccountService } from './_utils/account.service';
import { AuthenticationService } from './_utils/authentication.service';
import { RouteAuthenticationGuardService } from './_utils/routeAuthentication-guard.service';

/**PAGES */
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

/**COMPONENETS */
import { TaskcardComponent } from './componenets/taskcard/taskcard.component';


@NgModule({
  declarations: [
    ShellComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    HomeComponent,
    ProfileComponent,
    TaskcardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  entryComponents: [
    ShellComponent,
    ModalLoginComponent,
    ModalRegisterComponent
  ],
  providers: [AuthenticationService, RouteAuthenticationGuardService, AccountService],
  bootstrap: [ShellComponent]
})
export class AppModule { }
