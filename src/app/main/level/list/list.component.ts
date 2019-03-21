import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  columnDefs = [
    {
      headerName: "No",
      valueGetter: 'node.rowIndex',
      headerCheckboxSelection: true,
      checkboxSelection: true
    },
    {
      headerName: "Question Type",
      field: "question_type",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Question",
      field: "question",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Option A",
      valueGetter: "data.options[0].option",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Option B",
      valueGetter: "data.options[1].option",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Option C",
      valueGetter: "data.options[2].option",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Option D",
      valueGetter: "data.options[3].option",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Reference",
      field: "reference",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Score",
      field: "score",
      type: "numberColumn",
      filter: "agNumberColumnFilter"
    },
    {
      headerName: "Question State",
      field: "question_st",
      type: "numberColumn",
      filter: "agNumberColumnFilter"
    },
    {
      headerName: "Answer",
      valueGetter: "data.answer[0].answer",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "QuizType",
      field: "quiz_type",
      filter: "agTextColumnFilter",
    }
  ];

  autoGroupColumnDef = {
    headerName: "Group",
    width: 200,
    field: "question_type",
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

    this.api.getLevels().subscribe((data:any) => {
      console.log('Level Data :: ', data);
      this.rowData = data.data;
    });
  }

}
