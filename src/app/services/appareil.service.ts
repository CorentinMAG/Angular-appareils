import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../../.env/myconfig';

@Injectable()
export class AppareilService {
  appareilSubject = new Subject<any[]>();
  private appareils = [];
  constructor(private httpclient: HttpClient) {
    this.getAppareilsFromServer();
  }
  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils);
  }
  getAppareilById(id: number) {
    const appareil = this.appareils.find((e) => e.id === id);
    return appareil;
  }
  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
  }
  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
  }
  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
  }
  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: this.appareils.length,
      name,
      status
    };
    this.appareils.push(appareilObject);
    this.saveAppareilsToServer();
    this.emitAppareilSubject();
  }
  saveAppareilsToServer() {
    this.httpclient
      .put(`${url}/appareils.json`, this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getAppareilsFromServer() {
    this.httpclient
      .get<any[]>(`${url}/appareils.json`)
      .subscribe(
        (response) => {
          this.appareils = response || [];
          this.appareils = this.appareils.filter(app => app !==null); //on enlève les valeurs null dans le cas ou on a supprimé un item depuis firabase
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

}
