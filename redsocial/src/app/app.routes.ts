import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { WallComponent } from './components/wall/wall.component';
import { MessengerComponent } from "./components/messenger/messenger.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./auth.guard";

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'wall', component: WallComponent, canActivate: [AuthGuard] },
    { path: 'messenger', component: MessengerComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'wall' }
    
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES); 
