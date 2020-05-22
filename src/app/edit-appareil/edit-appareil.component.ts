import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppareilService} from '../services/appareil.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultOff = 'éteint';

  constructor(private appareilservice: AppareilService, private router: Router) { }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const status = form.value.status;
    this.appareilservice.addAppareil(name, status);
    this.router.navigate(['appareils']);

  }

  ngOnInit() {
  }

}
