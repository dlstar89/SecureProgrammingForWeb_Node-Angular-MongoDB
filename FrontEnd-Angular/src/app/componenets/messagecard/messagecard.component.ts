import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageDetails } from '../../_services/message.service';

@Component({
  selector: 'app-messagecard',
  templateUrl: './messagecard.component.html',
  styleUrls: ['./messagecard.component.css']
})
export class MessagecardComponent implements OnInit {

  @Input() message: MessageDetails;
  @Input() authorized: boolean;
  @Output() answered = new EventEmitter<MessageDetails>();

  checked = false;


  constructor() { }

  ngOnInit() {
    // this.authorized = false;
  }

  public updateStatus() {
    if (this.authorized === false) {
      return;
    }

    this.answered.emit(this.message);
  }

  get getStatusColour() {
    return this.message.markedAsAnswer ? '#79ff79' : 'white';
  }
}
