import {Component, Input, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() index: number;
  @Input() id: number;

  constructor(private appareilservice: AppareilService) { }

  ngOnInit() {
  }
  getStatus() {
    return this.appareilStatus;
  }
  getColor() {
    if (this.appareilStatus === 'allumé') {
      return '#2ecc71';
    } else {
      return '#e74c3c';
    }
  }
  onSwitch() {
    if (this.appareilStatus === 'allumé') {
      this.appareilservice.switchOffOne(this.index);
      this.appareilservice.saveAppareilsToServer();
    } else {
      this.appareilservice.switchOnOne(this.index);
      this.appareilservice.saveAppareilsToServer();
    }
  }

}
