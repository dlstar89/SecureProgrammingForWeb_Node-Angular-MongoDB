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
  @Input() description: string;
  @Input() fullDescription: string;

  constructor() { }

  ngOnInit() { }

}
