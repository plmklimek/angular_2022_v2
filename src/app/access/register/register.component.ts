import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import * as alertify from "alertifyjs";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  RedirectLogin() {
    this.route.navigate(["login"]);
  }

  respData: any;

  reactiveform = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  })

  SaveUser() {
    this.userService.Registration(this.reactiveform.value).subscribe(value => {
      this.respData = value;
      if (this.respData.id) {
        alertify.success("Registered successfully");
        this.route.navigate(["login"]);
      }
    },
      error => {
        console.log(error);
      })
  }
}
