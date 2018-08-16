import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login/login.component'
import { ReqisterComponent } from './register/reqister.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { AuthtRouteActivator } from './auth-route-activation.service'
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component'
import { WelcomePageComponent } from './welcome-page/welcome-page.component'

export const userRoutes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthtRouteActivator]},
    { path: 'login', component: LoginComponent},
    { path: 'reqister', component: ReqisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password', component: ResetPasswordPageComponent },
    { path: 'welcome', component: WelcomePageComponent}

]