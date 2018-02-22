import { Component, OnInit, Input } from '@angular/core';
import { MessageDetails } from '../../_services/message.service';

@Component({
  selector: 'app-messagecard',
  templateUrl: './messagecard.component.html',
  styleUrls: ['./messagecard.component.css']
})
export class MessagecardComponent implements OnInit {

  @Input() message: MessageDetails;

  constructor() { }

  ngOnInit() { }

}
