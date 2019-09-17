import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective, ControlContainer } from "@angular/forms";
import { FieldConfig } from "../../field.interface";


@Component({
  selector: "app-input",
  template: `
      
      <mat-form-field class="dynamic-field" [formGroup]="group">
          <input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
          <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
             <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
          </ng-container>
      </mat-form-field>
			`,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  constructor() {}
  ngOnInit() {
    //console.log(this.field.name, this.group);
  }
}
