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
  EventInfo: any;
  Invitations: any;
  me: any;

  constructor(private service: EventService, private activatedRoute: ActivatedRoute, private route: Router, private userService: UserService, private userServiceMaster: UserMasterService) {
    this.user = localStorage.getItem("user");
  }


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getById(this.id.toString())
      this.GetAll()
      this.GetMe();
      this.GetInvitationsByEventId(this.id.toString());
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getById(id: string) {
    this.service.getById(id).subscribe(item => {
      this.EventInfo = item;
      console.log(this.EventInfo);
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
    this.userServiceMaster.GetAllUsers().subscribe(item => {
      this.users = item;
    })
  }
  update(e: any) {
    this.selectedUser = e.target.value
  }
  SendInvitation() {
    this.service.SendInvitation(this.selectedUser, this.EventInfo.id).subscribe(item => {
      this.route.navigate(['event', this.id]).then(() => {
        window.location.reload();
      });
    })
  }

  GetMe() {
    this.userService.GetMe().subscribe((item: any) => {
      this.me = item;
      console.log(this.me);
    })
  }

  GetInvitationsByEventId(id: string) {
    this.service.getInvitationsByEventId(id).subscribe((item: any) => {
      this.Invitations = item;
      console.log(item);
    })
  }
}
