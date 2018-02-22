import { MaterialModule } from './_modules/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

/**APP SHELL */
import { ShellComponent } from './shell/shell.component';

/**ROUTING */
import { RoutingModule } from './app.routing';

/**MODALS */
import { ModalLoginComponent } from './modals/modalLogin/modalLogin.component';
import { ModalRegisterComponent } from './modals/modalRegister/modalRegister.component';

/**SERVICES */
import { AccountService } from './_services/account.service';
import { AuthenticationService } from './_services/authentication.service';
import { PostService } from './_services/post.service';
import { RouteAuthenticationGuardService } from './_services/routeAuthentication-guard.service';
import { MessageService } from './_services/message.service';

/**UTILS */
import { FormValidationsService } from './_utils/formValidations.service';

/**PAGES */
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

/**COMPONENETS */
import { TaskcardComponent } from './componenets/taskcard/taskcard.component';
import { PostComponent } from './pages/post/post.component';
import { MessagecardComponent } from './componenets/messagecard/messagecard.component';
import { ActionbuttonComponent } from './componenets/actionbutton/actionbutton.component';


@NgModule({
  declarations: [
    ShellComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    HomeComponent,
    PostComponent,
    ProfileComponent,
    TaskcardComponent,
    MessagecardComponent,
    ActionbuttonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    HttpModule
  ],
  entryComponents: [
    ShellComponent,
    ModalLoginComponent,
    ModalRegisterComponent
  ],
  providers: [
    FormValidationsService,
    AuthenticationService,
    RouteAuthenticationGuardService,
    AccountService,
    PostService,
    MessageService
  ],
  bootstrap: [ShellComponent]
})
export class AppModule { }
