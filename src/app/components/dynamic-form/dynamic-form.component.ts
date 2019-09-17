import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { FieldConfig, Validator } from "../../field.interface";

@Component({
  selector: "[dynamicForm]",
  template: `
        <ng-container *ngFor="let field of fields;" [ngSwitch]="field.type">
          <app-input *ngSwitchCase="'input'" [field]="field" [group]="group"></app-input>
          <app-input  *ngSwitchCase="'password'" [field]="field" [group]="group"></app-input>
          <app-checkbox *ngSwitchCase="'checkbox'" [field]="field" [group]="group"></app-checkbox>
          <app-radio *ngSwitchCase="'radio'" [field]="field" [group]="group"></app-radio>
          <app-select *ngSwitchCase="'select'" [field]="field" [group]="group"></app-select>
          <app-autoselect *ngSwitchCase="'autoselect'" [field]="field" [group]="group"></app-autoselect>
          <app-date *ngSwitchCase="'date'" [field]="field" [group]="group"></app-date>
          <div *ngSwitchCase="'group'"  dynamicFormGroup [field]="field" [group]="group"></div>
          <div *ngSwitchCase="'array'"  dynamicFormArray [field]="field" [group]="group"></div>
        </ng-container>
  `,
  styles: []
})
export class DynamicFormComponent{
  @Input() fields: FieldConfig[] = [];
  @Input() group: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }
  ngOnChanges(changes: SimpleChanges){
  console.log(changes);
    this.createControls(this.group, this.fields);
  }

  createControls(group, fields){

    fields.forEach(field => {
      if (field.type === "group") {

        let group2 = this.fb.group({});
        this.createControls(group2, field.fields)
        group.addControl(field.name, group2);

      }if (field.type === "array") {

        let group2 = this.fb.array([]);
        group.addControl(field.name, group2);

      }else if (field.type !== "button"){
      
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      }
    });
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(this.group.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}

