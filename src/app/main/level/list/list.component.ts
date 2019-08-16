import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/api.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CreateComponent } from '../dialog/create/create.component';
import { FormGroup } from '@angular/forms';
import { UploadComponent } from '../dialog/uploadfile/upload.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<any> | null;
  displayedColumns = ['index', 'question_id', 'level', 'question', 'options', 'reference', 'score', 'date'];
  ExcelData: any;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dialogRef: any;

  constructor(private api: ApiService, public _matDialog: MatDialog) { }

  ngOnInit() {
    this.getLevelData();
  }

  getLevelData() {
    this.api.getLevels().subscribe(data => {
      //console.log('Levels ::: ** ::: ', data.data);
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

  editQuestionDialog(question) {
    console.log('Question :: ', question);
    this.dialogRef = this._matDialog.open(CreateComponent, {
      panelClass: 'mail-compose-dialog',
      data: question != undefined ? ['edit', question] : ['create']
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

  csvQuestionDialog() {
    console.log('Question :: Csv File Logic');
    this.dialogRef = this._matDialog.open(UploadComponent, {
      panelClass: 'mail-compose-dialog',
      data: ''
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
          case 'upload':
            this.ExcelData = formData.controls["data"].value;
            this.UploadInAPI();
            //console.log("Actual", this.ExcelData);
            //console.log("JSONNNN", JSON.stringify(this.ExcelData));
            break;

        }
      });
  }
  UploadInAPI() {
    var arrayUpload = Array();
    for (let i = 0; i < this.ExcelData.length; i++) {
      var EXdata = this.ExcelData[i];
      console.log(EXdata['question_st']);
      if (Number(EXdata['question_st']) != 0 && Number(EXdata['question_st']) != NaN
        && EXdata['question'] != 0 && EXdata['question'] != ''
        && Number(EXdata['score']) != 0 && Number(EXdata['score']) != NaN
        && Number(EXdata['level']) != 0 && Number(EXdata['level']) != NaN
        && EXdata['answer'] != 0 && EXdata['answer'] != ''
        && (EXdata['quiz_type'].indexOf('REGULAR') != -1 || EXdata['quiz_type'].indexOf('BONUS') != -1)
        && (EXdata['question_type'].indexOf('PIKACHAR') != -1 || EXdata['question_type'].indexOf('MCQ') != -1)
      ) 
      {
        var objAdd = {
          'question_st': EXdata['question_st'],
          'question_type': EXdata['question_type'],
          'question': EXdata['question'],
          'score': EXdata['score'],
          'artifact_type': EXdata['artifact_type'] != 0 ? EXdata['artifact_type'] : '',
          'artifact_path': EXdata['artifact_path'] != 0 ? EXdata['artifact_path'] : '',
          'level': EXdata['level'],
          'quiz_type': EXdata['quiz_type'],
          'date': EXdata['date'],
          'reference': EXdata['reference'] != 0 ? EXdata['reference'] : '',
          'timeout': EXdata['timeout'] != 0 ? EXdata['timeout'] : '',
          'jumbledata': EXdata['jumbledata'] != 0 ? EXdata['jumbledata'].split('') : '',
          'pikacharanswer': EXdata['pikacharanswer'] != 0 ? EXdata['pikacharanswer'].split('') : '',
          'answer': [{'answer': EXdata['answer']}],
          'options': [ {'option_number': 1, 'option': EXdata['options1'] != 0 ? EXdata['options1'] : ''},
          {'option_number': 1, 'option': EXdata['options2'] != 0 ? EXdata['options2'] : ''},
          {'option_number': 1, 'option': EXdata['options3'] != 0 ? EXdata['options3'] : ''},
          {'option_number': 1, 'option': EXdata['options4'] != 0 ? EXdata['options4'] : ''} ],

        };
        arrayUpload.push(objAdd);
      }
    }
    this.api.insertQuestions(JSON.stringify(arrayUpload)).subscribe(data => {
      console.log(data);
    });
    console.log(JSON.stringify(arrayUpload));
  }

}

