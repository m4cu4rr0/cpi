import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HubComponent} from "./hub/hub.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {EmpresasComponent} from "./empresas/empresas.component";
import {CuestionarioComponent} from "./cuestionario/cuestionario.component";
import {ResultadosComponent} from "./resultados/resultados.component";
import {EncuestaComponent} from "./encuesta/encuesta.component";

const routes: Routes = [
  { path: '', component: HubComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard]},
  { path: 'nueva', component: EncuestaComponent, canActivate: [AuthGuard]},
  { path: 'resultados', component: ResultadosComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
