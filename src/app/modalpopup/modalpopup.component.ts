import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserMasterService } from '../Service/user-master.service';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {

  constructor(private userService: UserMasterService) { }

  ngOnInit(): void {
  }

  id: any;
  data: any;

  reactiveform = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  })

  GetUser(userId: any) {
    this.userService.GetUserById(userId).subscribe(item => {
      this.data = item;
    })
  }

  SaveUser(userId: any) {
    console.log(userId);
    //   this.userService.update(this.reactiveform.value).subscribe(value => {
    //     this.respData = value;
    //     if (this.respData.id) {
    //       alertify.success("Registered successfully please contact admin for activation");
    //       this.route.navigate(["login"]);
    //     }
    //   },
    //     error => {
    //       console.log(error);
    //     })
    // }
  }
}
