import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective, ControlContainer } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-checkbox",
  template: `
            <div class="dynamic-checkbox" [formGroup]="group" >
                <mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
            </div>
            `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CheckboxComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
