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
  MatProgressSpinnerModule,
  MatTabsModule,
  MatSlideToggleModule
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
import {HttpClientModule} from '@angular/common/http';
import {ConfirmationDialogComponent} from './modal/confirmation-dialog/confirmation-dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Quest1Component } from './cuestionario/quest1/quest1.component';
import { Quest2Component } from './cuestionario/quest2/quest2.component';
import { Quest3Component } from './cuestionario/quest3/quest3.component';
import { LoadingComponent } from './modal/loading/loading.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { DatosPersonaComponent } from './modal/datos-persona/datos-persona.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Quest4Component } from './cuestionario/quest4/quest4.component';
import { Quest5Component } from './cuestionario/quest5/quest5.component';

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
    LoadingComponent,
    DatosPersonaComponent,
    Quest4Component,
    Quest5Component
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
    MatTabsModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSortModule,
    MDBBootstrapModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: MatDialogRef, useValue: {} },
              { provide: MAT_DIALOG_DATA, useValue: [] },
              {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [NuevaEmpresaComponent, ConfirmationDialogComponent, LoadingComponent, DatosPersonaComponent, EncuestaComponent],
})
export class AppModule { }
