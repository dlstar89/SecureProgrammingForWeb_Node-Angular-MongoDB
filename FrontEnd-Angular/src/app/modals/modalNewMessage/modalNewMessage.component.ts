import { MessageService } from './../../_services/message.service';
import { PostPayload } from './../../_services/post.service';
import { FormValidationsService } from './../../_utils/formValidations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../_services/authentication.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-modalnewmessage',
  templateUrl: './modalNewMessage.component.html',
  styleUrls: ['./modalNewMessage.component.css']
})
export class ModalNewMessageComponent implements OnInit, OnDestroy {

  form;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ModalNewMessageComponent>,
    private auth: AuthenticationService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private fv: FormValidationsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const postId = this.router.snapshot.firstChild.params['id'];
    this.messageService.postMessage(this.message, postId, this.auth.myToken, () => { this.closeDialog(); });
  }

  ngOnDestroy() { }
}
