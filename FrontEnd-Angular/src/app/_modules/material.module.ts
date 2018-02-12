import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSidenavModule
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
    MatSidenavModule
  ]
})
export class MaterialModule { }
