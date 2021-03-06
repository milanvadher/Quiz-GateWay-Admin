import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private rowData: any[];
  private rowGroupPanelShow = "always";
  private rowSelection = "multiple"

  columnDefs = [
    {
      headerName: "No",
      valueGetter: 'node.rowIndex',
      headerCheckboxSelection: true,
      checkboxSelection: true
    },
    {
      headerName: "Mht Id",
      field: "mht_id",
      type: "numberColumn",
      filter: "agNumberColumnFilter"
    },
    {
      headerName: "Name",
      field: "name",
      type: 'text',
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Mobile",
      field: "mobile",
      type: 'text',
      filter: "agTextColumnFilter"
    },
    {
      headerName: "Center",
      field: "center",
      type: 'text',
      filter: "agTextColumnFilter",
      enableRowGroup: true
    },
    {
      headerName: "Total Score",
      field: "totalscore",
      type: "numberColumn",
      filter: "agNumberColumnFilter",
      enableRowGroup: true
    },
    {
      headerName: "Lives",
      field: "lives",
      type: "numberColumn",
      filter: "agNumberColumnFilter",
      enableRowGroup: true
    },
    {
      headerName: "User Group",
      field: "user_group",
      type: 'text',
      filter: "agTextColumnFilter",
      enableRowGroup: true
    }
  ];

  autoGroupColumnDef = {
    headerName: "Group",
    width: 200,
    field: "mht_id",
    valueGetter: function (params) {
      if (params.node.group) {
        return params.node.key;
      } else {
        return params.data[params.colDef.field];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: { checkbox: true }
  };

  defaultColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true
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
    nonEditableColumn: { editable: false }
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.api.getUsers().subscribe((data: any) => {
      console.log('Level Data :: ', data.data.users);
      this.rowData = data.data.users;
    });
  }
}
