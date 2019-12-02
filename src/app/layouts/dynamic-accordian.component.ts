import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { FieldConfig, Validator, LayoutConfig } from "../field.interface";

@Component({
  selector: "app-accordian",
  template: `
      <mat-accordion [multi]="layout.isMulti">
        <ng-container *ngFor="let section of layout.sections;" [ngSwitch]="layout.type">
          <mat-expansion-panel [disabled]="section.disabled" [expanded]="section.expanded">
              <mat-expansion-panel-header [collapsedHeight]="'47px'" [expandedHeight]="'47px'">
                  <mat-panel-title class="group-header">
                      <p class="group-title"><span class="star-icon"></span><span [innerHTML]="section.label"></span></p>
                  </mat-panel-title>
              </mat-expansion-panel-header>

              <ng-template matExpansionPanelContent>
                <div dynamicForm [fields]="section.fields" [group]="group.get(section.name)"></div>
              </ng-template>
          </mat-expansion-panel>
        </ng-container>
      </mat-accordion>  
  `,
  styles: []
})
export class DynamicAccordianComponent implements OnInit {
  @Input() layout: LayoutConfig;
  @Input() group: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges){
  console.log(changes);
    this.layout.sections.forEach(section => {
      let group2 = this.fb.group({});
      this.group.addControl(section.name, group2);
    });
  }
}
