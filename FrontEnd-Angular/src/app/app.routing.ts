import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router';


// import { MediaItemFormComponent } from './media-item-form.component';
// import { MediaItemListComponent } from './media-item-list.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'add', component: MediaItemFormComponent },
  // { path: ':medium', component: MediaItemListComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'all' }
  // { path: '', component: PageHomeComponent },
  // { path: 'allPeople', component: PageallpeopleComponent },
  // { path: '**', component: PagehomeComponent }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
