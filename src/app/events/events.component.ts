import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { EventModel } from '../Models/EventModel';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private service: EventService, private route: Router) { }

  EventDetail: any;
  dataSource: any;

  GetAllEvents() {
    this.service.getAll().subscribe(item => {
      this.EventDetail = item;
      this.dataSource = new MatTableDataSource<EventModel>(this.EventDetail);
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
