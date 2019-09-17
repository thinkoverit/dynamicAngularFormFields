import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective, ControlContainer } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "[app-button]",
  template: `
            <div class="dynamic-radio" [formGroup]="group">
                <button type="submit" mat-raised-button color="primary">{{field.label}}</button>
            </div>
            `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ButtonComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
