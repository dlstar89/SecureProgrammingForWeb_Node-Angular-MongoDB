import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalCofirmationPopupComponent } from './../../modals/modalCofirmationPopup/modalCofirmationPopup.component';
import { PostService } from '../../_services/post.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrls: ['./taskcard.component.css']
})
export class TaskcardComponent implements OnInit {

  @Input() postId: string;
  @Input() author: string;
  @Input() title: string;
  @Input() shortDescription: string;
  @Input() fullDescription: string;
  @Input() totalMessages: number;
  @Input() totalAnswers: number;
  @Input() datePosted: Date;
  @Input() authorised: boolean;

  confirmDelete = false;

  constructor(
    public dialog: MatDialog,
    private auth: AuthenticationService,
    public posts: PostService
  ) { }

  ngOnInit() { }

  get getStatusColour() {
    return this.totalAnswers > 0 ? '#79ff79' : 'white';
  }

  get answered() {
    return this.totalAnswers > 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCofirmationPopupComponent, {
      width: '250px',
      data: { confirmDelete: this.confirmDelete }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.posts.detePost(this.postId, this.auth.myToken, () => { }, () => { });
      }
    });
  }

}
