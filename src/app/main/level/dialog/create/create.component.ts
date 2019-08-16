import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

    form: FormGroup;
    options: FormArray;

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
            question_id: ['', Validators.required],
            level: ['', Validators.required],
            question: ['', Validators.required],
            options: this._formBuilder.array([]),
            reference: ['', Validators.required],
            score: ['', Validators.required],
            date: ['', Validators.required],
        });

        console.log('Data :: ', this._data);

        // Edit mode 
        if (this._data[0] == 'edit') {
            this.form.patchValue(this._data[1]);
            this._data[1].options.forEach(option => {
                this.addOption(option);
            });
        } else {
            for (let i = 0; i < 4; i++) {
                this.addOption();
            }
        }
    }

    /**
     * get options array from Form
     * 
     * @returns {FormArray} options
     */
    get optionsArray() {
        return this.form.get('options') as FormArray;
    }

    /**
     * Add new option in Form options form
     * 
     * @param data 
     */
    addOption(data?: { option_number: number; option: string; }) {
        const optionGroup = this._formBuilder.group({
            option_number: [data ? data.option_number : this.optionsArray.length + 1, Validators.required],
            option: [data ? data.option : '', Validators.required]
        });

        this.optionsArray.push(optionGroup);
    }

    /**
     * Remove option from Options array in form
     * 
     * @param {number} i 
     */
    deleteOption(i: number) {
        this.optionsArray.removeAt(i);
    }

    /**
     * @returns form controls 
     */
    get formErrors() {
        return this.form.controls;
    }

}
