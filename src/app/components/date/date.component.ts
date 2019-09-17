import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective, ControlContainer } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-date",
  template: `
        <mat-form-field class="dynamic-datepicker" [formGroup]="group">
            <input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-hint></mat-hint>
            <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
                <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
            </ng-container>
        </mat-form-field>
        `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DateComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
