import { Component, OnInit, ViewChild } from '@angular/core';
import { UserMasterService } from '../Service/user-master.service';
import { MatTableDataSource } from "@angular/material/table";
import { UserModel } from '../Models/UserModel';
import { MatPaginator } from "@angular/material/paginator"
import { MatDialog } from '@angular/material/dialog'
import { ModalpopupComponent } from '../modalpopup/modalpopup.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  constructor(private userService: UserMasterService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllUsers();
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator


  UserDetail: any;
  dataSource: any;

  GetAllUsers() {
    this.userService.GetAllUsers().subscribe(item => {
      this.UserDetail = item;
      this.dataSource = new MatTableDataSource<UserModel>(this.UserDetail);
    })
  }

  FunctionUpdate(userId: string) {
    this.dialog.open(ModalpopupComponent, {
      width: '400px',
      height: '400px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        userId: userId
      }
    });
  }

  displayedColumns: string[] = ['id', 'email', "action"];
  //dataSource = ELEMENT_DATA;
}
