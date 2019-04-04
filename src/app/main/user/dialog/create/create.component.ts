import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

    form: FormGroup;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CreateComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CreateComponent>,
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
            mht_id      : ['', Validators.required],
            name        : ['', Validators.required],
            mobile      : ['', Validators.required],
            email       : ['', [Validators.required, Validators.email]],
            totalscore  : ['', Validators.required],
            user_group  : ['', Validators.required],
            lives       : ['', Validators.required],
        });

        console.log('Data :: ', this._data);

        // Edit mode
        if (this._data[0] == 'edit') {
            this.form.patchValue(this._data[1]);
        }
    }

    /**
     * @returns form controls 
     */
    get formErrors() {
        return this.form.controls;
    }

}
