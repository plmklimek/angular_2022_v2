import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})
export class CreateeventComponent implements OnInit {

  constructor(private service: EventService, private route: Router) { }

  ngOnInit(): void {
  }

  Create(data: any) {
    this.service.Create(data.value.name).subscribe(item => {
      this.route.navigate(['events']).then(() => {
        window.location.reload();
      });
    })
  }

}
