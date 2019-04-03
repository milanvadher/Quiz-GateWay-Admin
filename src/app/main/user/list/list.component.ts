import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'app/api.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['mht_id', 'name', 'center', 'mobile', 'totalscore', 'isactive'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private api: ApiService) { }

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

}