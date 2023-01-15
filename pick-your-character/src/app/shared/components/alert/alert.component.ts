import {Component, OnInit} from '@angular/core';
import {ModelService} from '../../../service/model.service';
import {AlertMessage} from '../../../model/alert-message';
import {C} from '../../../service/c';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private model: ModelService) {
  }

  get alertMessage(): AlertMessage {
    return (this.model.getBean(C.ALERT_MESSAGE) as AlertMessage);
  }

  ngOnInit() {
  }

}
