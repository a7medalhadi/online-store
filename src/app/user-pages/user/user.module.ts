import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyordersComponent } from '../myorders/myorders.component';
import { ProfileComponent } from '../profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelingModalComponent } from '../../modals/canceling-modal/canceling-modal.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuardService } from '../../auth-gard.service';
import { LogGardService } from '../../log-gard.service';
import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';
  
const routes: Routes = [
  { path: 'profile', component: MyordersComponent,canActivate: [AuthGuardService]  },
  { path: 'update', component: ProfileComponent,canActivate: [AuthGuardService]  },
  { path: 'login', component: LoginComponent, canActivate:[LogGardService] },
  { path: 'register', component: RegisterComponent, canActivate:[LogGardService] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate:[LogGardService] },

];


@NgModule({
  declarations: [MyordersComponent,ForgotPasswordComponent,ProfileComponent,CancelingModalComponent,LoginComponent,RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    CancelingModalComponent
  ],
  exports: [RouterModule]
})
export class UserModule { }
