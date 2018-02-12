import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modalRegister',
  templateUrl: './modalRegister.component.html',
  styleUrls: ['./modalRegister.component.css']
})
export class ModalRegisterComponent implements OnInit {

  formOutput;

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
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
