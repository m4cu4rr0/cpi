import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {
  MatIconModule,
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
  MatRadioModule,
  MatSelectModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { HubComponent } from './hub/hub.component';
import { RegistroComponent } from './registro/registro.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { MenuComponent } from './menu/menu.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { NuevaEmpresaComponent } from './modal/nueva-empresa/nueva-empresa.component';
import {HttpClientModule} from "@angular/common/http";
import {ConfirmationDialogComponent} from "./modal/confirmation-dialog/confirmation-dialog.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Quest1Component } from './cuestionario/quest1/quest1.component';
import { Quest2Component } from './cuestionario/quest2/quest2.component';
import { Quest3Component } from './cuestionario/quest3/quest3.component';
import { LoadingComponent } from './modal/loading/loading.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresasComponent,
    HubComponent,
    RegistroComponent,
    ResultadosComponent,
    MenuComponent,
    EncuestaComponent,
    NuevaEmpresaComponent,
    ConfirmationDialogComponent,
    Quest1Component,
    Quest2Component,
    Quest3Component,
    LoadingComponent
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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [NuevaEmpresaComponent, ConfirmationDialogComponent, LoadingComponent],
})
export class AppModule { }
