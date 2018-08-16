import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { userRoutes } from './user.routes'

import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login/login.component'
import { ReqisterComponent } from './register/reqister.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component'
import { WelcomePageComponent } from './welcome-page/welcome-page.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProfileComponent,
        LoginComponent,
        ReqisterComponent,
        ForgotPasswordComponent,
        ResetPasswordPageComponent,
        WelcomePageComponent
    ],
    providers: []
})

export class UserModule { }