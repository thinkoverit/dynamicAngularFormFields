import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { tap, filter, debounceTime, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ApiService } from "../../api.service";
import { FieldConfig } from "../../field.interface";

@Component({
  selector: "app-autoselect",
  template: `
        <mat-form-field class="dynamic-field" [formGroup]="group">
          <input type="text" [placeholder]="field.label" [formControlName]="field.name" aria-label="Number" matInput [matAutocomplete]="auto">
          <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn()">
            <mat-option *ngFor="let option of field.options" [value]="option.id">
              {{option.title}}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>

        `,
  styles: []
})
export class AutoSelectComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  localSub: Subscription;
  control: FormControl;
  loader: boolean;

  constructor(private apiService: ApiService) {
    this.loader = false;
    this.control = null;
    this.localSub = null;
  }

  displayFn(id?: any) {
    return (id) => this.displayOptionName(id);
  }

  displayOptionName(key) {
      let matchedValue:any = '';
      if(this.field.options && this.field.options.length){
          this.field.options.forEach((item: any) => {
              if(item.id == key)
                  matchedValue = item.title;
          });
      }
      return matchedValue;
  }

  getOptionDisplayValue(){

  }
  ngOnInit() {
    this.control = <FormControl> this.group.get(this.field.name);

    this.localSub = this.control.valueChanges
        .pipe(debounceTime(500),
            filter(value => {
            console.log(value, this.control.valid);
                return this.control.valid;
            }),
            tap(() => this.loader = true),
            switchMap(value => this.apiService.postApiCancellable('https://jsonplaceholder.typicode.com/todos/', value, '')),
            tap(() => this.loader = false),
        ).subscribe((resp: any) => {
          this.field.options = resp;
        }, (err) => {
            this.field.options = [];
    });
  }

  ngOnDestroy() {
    if (this.localSub) { this.localSub.unsubscribe(); }
  }
}
