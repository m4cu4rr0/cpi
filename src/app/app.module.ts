import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatTableModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule,
  MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { HubComponent } from './hub/hub.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { RegistroComponent } from './registro/registro.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { MenuComponent } from './menu/menu.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { NuevaEmpresaComponent } from './modal/nueva-empresa/nueva-empresa.component';
import {HttpClientModule} from "@angular/common/http";
import {ConfirmationDialogComponent} from "./modal/confirmation-dialog/confirmation-dialog.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresasComponent,
    HubComponent,
    CuestionarioComponent,
    RegistroComponent,
    ResultadosComponent,
    MenuComponent,
    EncuestaComponent,
    NuevaEmpresaComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent],
  entryComponents: [NuevaEmpresaComponent, ConfirmationDialogComponent],
})
export class AppModule { }
