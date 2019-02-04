import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private gridApi;
  private gridColumnApi;
  private rowData: any[];

  columnDefs = [
    {
      headerName: "Athlete",
      field: "athlete"
    },
    {
      headerName: "Sport",
      field: "sport"
    },
    {
      headerName: "Age",
      field: "age",
      type: "numberColumn"
    },
    {
      headerName: "Year",
      field: "year",
      type: "numberColumn"
    },
    {
      headerName: "Date",
      field: "date",
      type: ["dateColumn", "nonEditableColumn"],
      width: 200
    },
    {
      headerName: "Medals",
      groupId: "medalsGroup",
      children: [
        {
          headerName: "Gold",
          field: "gold",
          type: "medalColumn"
        },
        {
          headerName: "Silver",
          field: "silver",
          type: "medalColumn"
        },
        {
          headerName: "Bronze",
          field: "bronze",
          type: "medalColumn"
        }
      ]
    }
  ];

  defaultColDef = {
    width: 150,
    editable: true,
    filter: "agTextColumnFilter"
  };

  defaultColGroupDef = { marryChildren: true };
  
  columnTypes = {
    numberColumn: {
      width: 83,
      filter: "agNumberColumnFilter"
    },
    medalColumn: {
      width: 100,
      columnGroupShow: "open",
      filter: false
    },
    nonEditableColumn: { editable: false },
    dateColumn: {
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateParts = cellValue.split("/");
          var day = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var year = Number(dateParts[0]);
          var cellDate = new Date(day, month, year);
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  };

  constructor(private http: HttpClient) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe((data:any) => {
        this.rowData = data;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
