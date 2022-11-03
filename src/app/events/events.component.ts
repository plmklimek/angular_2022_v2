import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { EventModel } from '../Models/EventModel';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private service: EventService, private route: Router) { }

  EventInfo: any;
  EventDetail: any;
  Invitations: any;
  dataSource: any;
  me: any;

  GetAllEvents() {
    this.service.getAll().subscribe(item => {
      this.EventInfo = item;
      this.dataSource = new MatTableDataSource<EventModel>(this.EventInfo);
    })
  }

  Forwarding(id: any) {
    this.route.navigate(["/event", id])
  }

  ngOnInit(): void {
    this.GetAllEvents();
  }

  displayedColumns: string[] = ['id', 'name', "action"];
}
