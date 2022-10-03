import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <h4 class="X">
      404 Requested Page not found
    </h4>
  `,
  styles: [
    "h4{color:red}",
  ]
})
export class StatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
