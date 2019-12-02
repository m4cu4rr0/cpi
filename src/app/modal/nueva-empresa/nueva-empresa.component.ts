import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {EmpresaModel} from "../../model/empresa.model";
import {EmpresasService} from "../../services/empresas.service";

export interface DialogData {
  id: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.scss']
})
export class NuevaEmpresaComponent implements OnInit {

  public id: string;
  empresa: EmpresaModel;

  emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<NuevaEmpresaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, public empService: EmpresasService) {
    this.id = data.id + '';
  }

  ngOnInit() {
    if (this.id !== '') {
      this.empService.getEmpresa(this.id).subscribe(empresa => this.empresa = empresa as EmpresaModel);
      this.emailFormControl.setValue(this.empresa.mail);
    } else {
      this.empresa = new EmpresaModel(null, null, null, null, null);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar() {
    this.empresa.mail = this.emailFormControl.value;

    if (this.id === '') {
      this.empService.agregarEmpresa(this.empresa).subscribe();
    } else {
      this.empService.updateEmpresa(this.empresa).subscribe();
    }
    this.empService.fetchEmpresas().then(() => {
      this.onNoClick();
    });
  }

}
