import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  register() {
    if(this.email == ''){
      alert('Lütfen E-Posta Adresinizi Girin');
      return;
    }
    if(this.password == ''){
      alert("Lütfen Şifrenizi Giriniz");
      return;
    }
    this.auth.register(this.email,this.password);
    this.email = '';
    this.password = '';
  }

}
