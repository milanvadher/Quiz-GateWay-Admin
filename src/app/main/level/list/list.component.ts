import { Component, OnInit, ViewChild } from '@angular/core';
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

  dataSource: MatTableDataSource<any> | null;
  displayedColumns = ['index', 'question_id', 'level', 'question', 'options', 'reference', 'score', 'date'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getLevelData();
  }

  getLevelData() {
    this.api.getLevels().subscribe(data => {
      console.log('Levels ::: ** ::: ', data.data);
      this.dataSource = new MatTableDataSource(data.data);
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