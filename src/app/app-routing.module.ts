import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HubComponent} from "./hub/hub.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {EmpresasComponent} from "./empresas/empresas.component";
import {ResultadosComponent} from "./resultados/resultados.component";
import {EncuestaComponent} from "./encuesta/encuesta.component";
import {RegistroComponent} from "./registro/registro.component";

const routes: Routes = [
    { path: '', component: RegistroComponent},
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard]},
    { path: 'nueva', component: EncuestaComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HubComponent, canActivate: [AuthGuard]},
    { path: 'resultados', component: ResultadosComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
