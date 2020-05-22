import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/User.service';
import {Router} from '@angular/router';
import {User} from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm:FormGroup;

  constructor(private formbuilder:FormBuilder,
              private userservice:UserService,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.userForm=this.formbuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required,Validators.email]],
      drinkPreference:['', Validators.required],
      hobbies:this.formbuilder.array([])
      }
    );
  }
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    this.userservice.addUser(newUser);
    this.router.navigate(['users']);

  }
  getHobbies(): FormArray{
    return this.userForm.get('hobbies') as FormArray;
  }
  onAddHobby() {
    const newHobbyControl = this.formbuilder.control(null,Validators.required)
    this.getHobbies().push(newHobbyControl);
  }

}
