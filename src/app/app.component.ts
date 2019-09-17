import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;

  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        }
      ]
    },
    {
      type: "password",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        }
      ]
    },
    {
      type: "autoselect",
      label: "Employee",
      name: "employee",
      options: [],
      url: 'http://dummy.restapiexample.com/api/v1/employees',
      value: "Male"
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "DOB Required"
        }
      ]
    },
    {
      type: "group",
      label: "Personal Info",
      name: "personalInfo",
      fields: [
        {
          type: "radio",
          label: "Gender",
          name: "gender",
          inputType: "select",
          options: ["Male", "Female"],
          value: "Male"
        },{
          type: "checkbox",
          label: "Accept Terms",
          name: "accept",
          inputType: "checkbox",
          value: ""
        }
      ]
    },
    {
      type: "input",
      label: "PAN ",
      name: "pan",
      value: "",
      inputType: "text",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "PAN is Required"
        }
      ]
    },
    {
      type: "input",
      label: "GST",
      name: "gstin",
      inputType: "text",
      value: ""
    },
    {
      type: "array",
      label: "Directors",
      name: "directors",
      group: {
        label: "Director",
        name: "director",
        fields: [
          {
            type: "input",
            label: "Address",
            name: "address",
            inputType: "text",
            value: ""
          },{
            type: "input",
            label: "State",
            name: "state",
            inputType: "text",
            value: ""
          },
          {
            type: "group",
            label: "Personal Info",
            name: "personalInfo",
            fields: [
              {
                type: "input",
                label: "Gender",
                name: "gender",
                inputType: "text",
                value: "Male"
              }
            ]
          }
        ]
      },
      data: [
        {
          address: "Shivajinagar",
          state: "MH"
        },{
          address: "Mambai",
          state: "MH"
        }

      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  submit() {
    console.log(this.form.getRawValue());
  }
}
