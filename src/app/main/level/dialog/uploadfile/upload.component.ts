import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  options: FormArray;
  title_File: string;
  arrayBuffer: any;
  file: File;
  /**
   * Constructor
   *
   * @param {MatDialogRef<UploadComponent>} matDialogRef
   * @param _data
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    public matDialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _formBuilder: FormBuilder
  ) {
  }

  /**
   * On Init
   */
  ngOnInit() {
    // User Form
    this.form = this._formBuilder.group({
      question_id: ['', Validators.required],
      level: ['', Validators.required],
      question: ['', Validators.required],
      options: this._formBuilder.array([]),
      reference: ['', Validators.required],
      score: ['', Validators.required],
      data: ['', Validators.required],
    });
    this.title_File = 'Select File';
  }

  /**
   * get options array from Form
   * 
   * @returns {FormArray} options
   */
  get optionsArray() {
    return this.form.get('options') as FormArray;
  }
  // tslint:disable-next-line: typedef
  incomingfile(event) {
    this.form.controls['question'].setValue(event.target.files[0]);
    this.file = event.target.files[0];
    this.Upload();
  }

  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.form.controls['data'].setValue(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  public changeListener(files: FileList) {
    console.log(files[0].name);
    this.form.controls['question'].setValue(files[0].name);
    console.log(this.form.controls['question'].value);


  }
  public changeListenerx(files: FileList) {
    console.log(files[0].name);
    this.form.controls['question'].setValue(files[0].name);
    console.log(this.form.controls['question'].value);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let allTextLines = csv.split(/\r|\n|\r/);
        let headers = allTextLines[0].split(',');
        let lines = [];
        for (let i = 0; i < allTextLines.length; i++) {
          // split content based on comma  
          let data = allTextLines[i].split(',');
          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }

            // log each row to see output  

            lines.push(tarr);
          }
        }
        console.log(lines);
        //console.log(csv);
      }
    }
  }
  /*
  selectMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      let names: string[] = [];
      for (let i: number = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileSelectMultipleMsg = names.join(',');
    } else {
      this.fileSelectMultipleMsg = files.name;
    }
  }
 
  uploadMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      let names: string[] = [];
      for (let i: number = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileUploadMultipleMsg = names.join(',');
    } else {
      this.fileUploadMultipleMsg = files.name;
    }
  }
 
  cancelMultipleEvent(): void {
    this.fileSelectMultipleMsg = 'No file(s) selected yet.';
    this.fileUploadMultipleMsg = 'No file(s) uploaded yet.';
  }
  */

  /**
   * @returns form controls 
   */
  get formErrors() {
    return this.form.controls;
  }

}
