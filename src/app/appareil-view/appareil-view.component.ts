import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  appareils: any[];
  appareilSubscription: Subscription;
  lastUpdate = new Date();

  constructor(private appareilservice: AppareilService) {}
  onAllumer() {
    this.appareilservice.switchOnAll();
    this.appareilservice.saveAppareilsToServer();
  }
  onEteindre() {
    if (confirm('Etes-vous sûr de vouloir éteindre tous les appareils ? ')) {
      this.appareilservice.switchOffAll();
      this.appareilservice.saveAppareilsToServer();
    } else {
      return;
    }

  }
  ngOnInit() {
    this.appareilSubscription = this.appareilservice.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    //this.appareilservice.getAppareilsFromServer();
    this.appareilservice.emitAppareilSubject();
  }
  ngOnDestroy(): void {
    this.appareilSubscription.unsubscribe();
  }
  onFetch() {
    this.appareilservice.getAppareilsFromServer();
  }

}
