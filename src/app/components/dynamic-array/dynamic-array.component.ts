import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormGroupDirective, ControlContainer } from "@angular/forms";

import { FieldConfig, Validator } from "../../field.interface";

@Component({
  selector: "[dynamicFormArray]",
  template: `
    <h5>{{field.label}}</h5>
    <div *ngIf="localGroup['controls'] && localGroup['controls'].length" class="dynamic-form-group" [formArrayName]="field.name">
      <ng-container *ngFor="let itemrow of localGroup['controls']; let i = index;">
        <div class="dynamic-form-group" [formGroupName]="i">
          <ng-container *ngFor="let field of field.group.fields;" [ngSwitch]="field.type">
            <app-input *ngSwitchCase="'input'" [field]="field" [group]="itemrow"></app-input>
            <app-input  *ngSwitchCase="'password'" [field]="field" [group]="itemrow"></app-input>  
            <app-checkbox *ngSwitchCase="'checkbox'" [field]="field" [group]="itemrow"></app-checkbox>
            <app-radio *ngSwitchCase="'radio'" [field]="field" [group]="itemrow"></app-radio>
            <app-select *ngSwitchCase="'select'" [field]="field" [group]="itemrow"></app-select>
            <app-date *ngSwitchCase="'date'" [field]="field" [group]="itemrow"></app-date>
            <div *ngSwitchCase="'group'"  dynamicFormGroup [field]="field" [group]="itemrow"></div>
          </ng-container>
        </div>
      </ng-container>
    </div>
    <button class="btn" (click)="addNew()">Add New </button>
  `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicArrayComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  localGroup: FormArray;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes.group && changes.field){
      this.localGroup = <FormArray> this.group.get(this.field.name);
      this.intFormArray();
    }
  }

  intFormArray(){
    this.clearFormArray(this.localGroup);

    if(this.field.data && this.field.data.length){
      this.field.data.forEach(item => {
        this.localGroup.push(this.createControls(this.field.group.fields, item));
      });
    }
  }

  addNew(){
    this.localGroup.push(this.createControls(this.field.group.fields, null));
    console.log(this.localGroup['controls']);
  }

  createControls(fields, values){

    let group = this.fb.group({});
    fields.forEach(field => {
      if (field.type === "group") {
        group.addControl(field.name, this.createControls(field.fields, null));
      }else if (field.type !== "button"){
        const control = this.fb.control(
          field.value,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
      }
    });

    if(values){
      group.patchValue(values);
    }
    return group;
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
  clearFormArray = (formArray: FormArray) => {
      if(!formArray) return;
      while (formArray.length !== 0) {
          formArray.removeAt(0);
      }
  }
}
