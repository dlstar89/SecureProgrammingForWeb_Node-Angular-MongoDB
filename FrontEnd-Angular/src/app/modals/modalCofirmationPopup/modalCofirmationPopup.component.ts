import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-modalcofirmationpopup',
  templateUrl: './modalCofirmationPopup.component.html',
  styleUrls: ['./modalCofirmationPopup.component.css']
})
export class ModalCofirmationPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCofirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
