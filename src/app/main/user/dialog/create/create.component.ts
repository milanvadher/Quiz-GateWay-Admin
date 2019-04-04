import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent {

    showExtraToFields: boolean;
    composeForm: FormGroup;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CreateComponent>} matDialogRef
     * @param _data
     */
    constructor(
        public matDialogRef: MatDialogRef<CreateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
        console.log('Data :: ', _data);

        if (_data[0] == 'edit') {
            this.composeForm.patchValue(_data[1]);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm(): FormGroup {
        return new FormGroup({
            mht_id: new FormControl({
                value: '',
                disabled: true
            }),
            name: new FormControl(''),
            mobile: new FormControl(''),
            email: new FormControl(''),
            totalscore: new FormControl(''),
            user_group: new FormControl(''),
            lives: new FormControl('')
        });
    }

    /**
     * Toggle extra to fields
     */
    toggleExtraToFields(): void {
        this.showExtraToFields = !this.showExtraToFields;
    }

}
