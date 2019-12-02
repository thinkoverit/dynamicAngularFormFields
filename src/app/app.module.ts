import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { AutoSelectComponent } from "./components/autoselect/autoselect.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";

import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { DynamicGroupComponent } from "./components/dynamic-group/dynamic-group.component";
import { DynamicArrayComponent } from "./components/dynamic-array/dynamic-array.component";

import { DynamicAccordianComponent } from "./layouts/dynamic-accordian.component";

import { ApiService } from "./api.service";

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    AutoSelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFormComponent,
    DynamicGroupComponent,
    DynamicArrayComponent,
    DynamicAccordianComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    AutoSelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicGroupComponent,
    DynamicArrayComponent
  ]
})
export class AppModule {}
