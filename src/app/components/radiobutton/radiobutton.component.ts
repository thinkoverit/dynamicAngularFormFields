import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective, ControlContainer } from "@angular/forms";

import { FieldConfig } from "../../field.interface";

@Component({
  selector: "app-radio",
  template: `
            <div class="dynamic-field"  [formGroup]="group">
                <label class="radio-label-padding">{{field.label}}:</label>
                <mat-radio-group [formControlName]="field.name">
                    <mat-radio-button *ngFor="let item of field.options" [value]="item">{{item}}</mat-radio-button>
                </mat-radio-group>
            </div>
            `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class RadiobuttonComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
