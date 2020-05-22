import {Subject} from 'rxjs';

export class AuthService{
  private isAuth=false;
  authSubject = new Subject<boolean>();

  emitAuth(){
    this.authSubject.next(this.isAuth);
  }
  getAuthStatus(){
    return this.isAuth;
  }
  signIn(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        this.isAuth=true;
        this.emitAuth();
        resolve(true);
      },2000)
    })
  }
  signOut(){
    this.isAuth=false;
    this.emitAuth();
  }
}
