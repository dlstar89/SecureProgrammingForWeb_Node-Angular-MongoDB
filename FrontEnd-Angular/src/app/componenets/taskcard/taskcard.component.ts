import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrls: ['./taskcard.component.css']
})
export class TaskcardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() author: string;

  constructor() { }

  ngOnInit() {
    // this.title = "asd"
  }

}
