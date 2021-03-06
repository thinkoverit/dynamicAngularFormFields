import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-select",
  template: `
        <mat-form-field class="dynamic-field"  [formGroup]="group">
            <mat-select [placeholder]="field.label" [formControlName]="field.name">
                <mat-option *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
            </mat-select>
        </mat-form-field>
        `,
  styles: []
})
export class SelectComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
