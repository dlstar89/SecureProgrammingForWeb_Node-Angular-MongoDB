import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() { }

  get getStatusColour() {
    return this.totalAnswers > 0 ? '#79ff79' : 'white';
  }

  get answered() {
    return this.totalAnswers > 0;
  }

}
