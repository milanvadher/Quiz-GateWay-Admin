import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/api.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CreateComponent } from '../dialog/create/create.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['index', 'mht_id', 'name', 'center', 'mobile', 'totalscore', 'isactive'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dialogRef: any;

  constructor(private api: ApiService, public _matDialog: MatDialog) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.api.getUsers().subscribe(data => {
      console.log('USERS ::: ** ::: ', data.data.users);
      this.dataSource = new MatTableDataSource(data.data.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUserDialog(user) {
    console.log('USER :: ', user);
    this.dialogRef = this._matDialog.open(CreateComponent, {
      panelClass: 'mail-compose-dialog',
      data: user != undefined ? ['edit', user] : ['create']
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Send
           */
          case 'send':
            console.log('new Mail', formData.getRawValue());
            break;
          /**
           * Delete
           */
          case 'delete':
            console.log('delete Mail');
            break;
        }
      });
  }

}