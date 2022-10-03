import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { EventModel } from '../Models/EventModel';
import { UserMasterService } from '../Service/user-master.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  id: number | undefined;
  private sub: any;
  EventDetail: any;
  dataSource: any;
  user: any;
  users: any;
  selectedUser: any;

  constructor(private service: EventService, private activatedRoute: ActivatedRoute, private route: Router, private userService: UserMasterService) {
    this.user = localStorage.getItem("user");
  }


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getById(this.id.toString())
      this.GetAll()
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getById(id: string) {
    this.service.getById(id).subscribe(item => {
      console.log(item)
      this.EventDetail = item;
    })
  }
  Accept(invitationId: string) {
    console.log(invitationId)
    this.service.Accept(invitationId).subscribe(item => {
      console.log(item)
      this.route.navigate(['event', this.id]).then(() => {
        window.location.reload();
      });
    })
  }
  Reject(invitationId: string) {
    this.service.Reject(invitationId).subscribe(item => {
      this.route.navigate(['event', this.id]).then(() => {
        window.location.reload();
      });
    })
  }
  GetAll() {
    this.userService.GetAllUsers().subscribe(item => {
      this.users = item;
    })
  }
  update(e: any) {
    this.selectedUser = e.target.value
  }
  SendInvitation() {
    this.service.SendInvitation(this.selectedUser, this.EventDetail.id).subscribe(item => {
      this.route.navigate(['event', this.id]).then(() => {
        window.location.reload();
      });
    })
  }
}
