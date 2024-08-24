import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'; // AuthGuard importieren

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'highscore', component: HighscoreComponent, canActivate: [AuthGuard] }, // Verwenden des AuthGuards
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Verwenden des AuthGuards
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }