import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormArray, FormControl, FormGroupDirective, ControlContainer } from "@angular/forms";

import { FieldConfig, Validator } from "../../field.interface";

@Component({
  selector: "[dynamicFormGroup]",
  template: `
    <div class="form-group" [formGroup]="group">
      <h5>{{field.label}}</h5>
      <div class="form-row" class="dynamic-form-group" [formGroupName]="field.name">
        <ng-container *ngFor="let field of field.fields;" [ngSwitch]="field.type">
          <app-input *ngSwitchCase="'input'" [field]="field" [group]="localGroup"></app-input>
          <app-input  *ngSwitchCase="'password'" [field]="field" [group]="localGroup"></app-input>          
          <app-checkbox class="form-col" *ngSwitchCase="'checkbox'" [field]="field" [group]="localGroup"></app-checkbox>
          <app-radio class="form-col" *ngSwitchCase="'radio'" [field]="field" [group]="localGroup"></app-radio>
          <app-select class="form-col" *ngSwitchCase="'select'" [field]="field" [group]="localGroup"></app-select>
          <app-date class="form-col" *ngSwitchCase="'date'" [field]="field" [group]="localGroup"></app-date>
          <div class="form-col" *ngSwitchCase="'group'"  dynamicFormGroup [field]="field" [group]="localGroup"></div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DynamicGroupComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  localGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    if(this.group instanceof FormArray){
      this.localGroup = <FormGroup> this.group.at(Number(this.field.name));
    }else{
      this.localGroup = <FormGroup> this.group.get(this.field.name);
    }
  }
}
