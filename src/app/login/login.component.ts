import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/Material-Module';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private route: Router) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  respData: any;

  ProceedLogin(loginData: any) {
    if (loginData.valid) {
      loginData.auth = window.btoa(loginData.value.username + ":" + loginData.value.password);
      console.log(loginData.auth);
      this.service.ProceedLogin(loginData).subscribe(item => {
        this.respData = item;
        if (this.respData.mail) {
          localStorage.setItem("auth", loginData.auth);
          localStorage.setItem("user", this.respData.mail);
          this.route.navigate(['home']).then(() => {
            window.location.reload();
          });
        }
      },
        error => {
          console.log(error);
        })
    }
  }

  RedirectRegister() {
    this.route.navigate(['access/register']);
  }
}
