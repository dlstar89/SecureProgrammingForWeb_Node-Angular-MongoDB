import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorhandlerService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public handleError(message: string, action: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration || 2000,
    });
  }

  public logError(error: any) {
    if (environment.production === false) {
      console.error(error);
    }

  }
}
