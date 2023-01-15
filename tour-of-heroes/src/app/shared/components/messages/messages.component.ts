import { Component, OnInit } from '@angular/core';
import {C} from "../../../service/c";
import {Messages} from "../../../model/messages";
import {ModelService} from "../../../service/model.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  isReduced = false;

  constructor(private modello: ModelService) { }

  ngOnInit() {
  }

  get messages(): string[] {
    let messagesBean = this.modello.getBean<Messages>(C.MESSAGES);
    if (messagesBean) {
      return messagesBean.messages.reverse();
    }
    return [];
  }

  clearMessages() {
    let messages: string[] = this.messages;
    messages.length = 0;
  }

}
