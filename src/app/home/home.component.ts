import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  headerName = "Angular Tutorial"

  salary = 1000;

  isDisabled = false

  colorName = "red";

  font = '40px';

  className = "headclass";

  styleValue = { "color": "yellow", "font-size": "60px" }

  colors = ["green", "red", "yellow", "black", "white"]

  FunctionClick(name: string) {
    alert(name);
  }

  ngOnInit(): void {
  }

}
