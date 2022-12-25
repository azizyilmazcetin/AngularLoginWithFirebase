import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth'
import { Route, Router } from '@angular/router';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth,private router: Router) { }

  //login method
  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem('token','true');
      

      if(res.user?.emailVerified == true){
        if(email == "azizyilmazcetin@gmail.com"){
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['user-dashboard']);
        }
        
      }else{
        this.router.navigate(['/verify-email']);
      }
      
    },err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((res )=>{
      alert('Kayıt Olundu');
       this.router.navigate(['/login']);
       this.sendEmailForVerification(res.user);
    }, err=> {
      alert (err.message);
      this.router.navigate(['/register']);

    })
  }

  //sign out

  logout() {
    this.fireauth.signOut().then( () =>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);

    }, err => {
      alert(err.message);
    })

  }

  // forgot password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/login']);
    }, err=>{
      alert('Something went wrong');
    })
    
  }

    //email verification
    sendEmailForVerification(user:any){ 
      user.sendEmailVerification().then((res : any)=> {
        this.router.navigate(['/verify-email']);
      },(err : any ) => {
        alert('Something went wrong. Not able to send mail to your email.')
      })
    }

    //sign in with google 
    googleSignIn(){
      return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res =>{
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
      }, err =>{
        alert(err.message);
      })
    }
    facebookSignIn(){
      return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res =>{
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
      }, err =>{
        alert(err.message);
      })

    }
}
