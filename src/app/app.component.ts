import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from './services/appareil.service';
import {interval, Subscription} from 'rxjs';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  seconds: number;
  counterSubscriptions: Subscription;
  authSubscription:Subscription;
  isAuth:boolean;
  constructor(private authservice:AuthService) {}
  ngOnInit(): void {
    this.authSubscription = this.authservice.authSubject.subscribe(
      (auth:boolean)=>{
        this.isAuth = auth;
        if(this.isAuth===true){
          const counter = interval(1000);
          this.counterSubscriptions = counter.subscribe(
            (value) => {
              this.seconds = value;
            },
            (error) => {
              console.log(error);
            },
            () => {
              console.log('observable completed !');
            }
          );

        }else{
          if(this.counterSubscriptions){
            this.counterSubscriptions.unsubscribe();
            this.seconds=0;
          }

        }
      }
    );
    this.authservice.emitAuth();

  }
  ngOnDestroy(): void {
    this.counterSubscriptions.unsubscribe();
  }

}
