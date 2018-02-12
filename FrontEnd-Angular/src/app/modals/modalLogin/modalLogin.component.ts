import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modallogin',
  templateUrl: './modalLogin.component.html',
  styleUrls: ['./modalLogin.component.css']
})
export class ModalLoginComponent implements OnInit {

  formOutput;

  constructor(
    public dialogRef: MatDialogRef<ModalLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form) {
    console.log(form.value);
    this.formOutput = JSON.stringify(form.value);
  }

  ngOnInit() {
  }

}
