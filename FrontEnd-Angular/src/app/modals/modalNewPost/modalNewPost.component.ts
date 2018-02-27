import { PostPayload } from './../../_services/post.service';
import { FormValidationsService } from './../../_utils/formValidations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../_services/authentication.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-modalnewpost',
  templateUrl: './modalNewPost.component.html',
  styleUrls: ['./modalNewPost.component.css']
})
export class ModalNewPostComponent implements OnInit, OnDestroy {

  newPost: PostPayload = {
    title: '',
    shortDescription: '',
    fullDescription: ''
  };

  form;

  private subscription$: ISubscription;

  constructor(
    private dialogRef: MatDialogRef<ModalNewPostComponent>,
    private auth: AuthenticationService,
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder,
    private fv: FormValidationsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      shortDescription: ['', [Validators.required, Validators.minLength(1)]],
      fullDescription: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.postService.createPost(this.newPost, this.auth.myToken, () => {
      this.closeDialog();
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
