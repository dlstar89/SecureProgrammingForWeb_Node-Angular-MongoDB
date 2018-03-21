import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSidenavModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  // imports: [MatButtonModule, MatCheckboxModule],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
