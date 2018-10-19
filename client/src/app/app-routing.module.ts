import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { AuthGuard} from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog',
    component: BlogComponent, // Blog Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent, // Edit Blog Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'delete-blog/:id',
    component: DeleteBlogComponent, // Delete Blog Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  { path: '*', component: HomeComponent }
];

@NgModule({
  declarations: [],
  providers: [],
  bootstrap: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
