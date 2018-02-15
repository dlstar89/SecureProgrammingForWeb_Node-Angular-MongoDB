import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouteAuthenticationGuardService } from './_utils/routeAuthentication-guard.service';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { animation: { value: 'home' } }
  },
  {
    path: 'profile', component: ProfileComponent,
    data: { animation: { value: 'profile' } },
    canActivate: [RouteAuthenticationGuardService]
  }
  // { path: 'add', component: MediaItemFormComponent },
  // { path: ':medium', component: MediaItemListComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'all' }
  // { path: '', component: PageHomeComponent },
  // { path: 'allPeople', component: PageallpeopleComponent },
  // { path: '**', component: PagehomeComponent }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
