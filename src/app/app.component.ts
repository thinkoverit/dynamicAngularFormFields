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
        }
      ]
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
            label: "First Name",
            name: "firstame",
            inputType: "text",
            value: ""
          },{
            type: "input",
            label: "Last Name",
            name: "lastname",
            inputType: "text",
            value: ""
          },
          {
            type: "group",
            label: "Address",
            name: "address",
            fields: [
              {
                type: "input",
                label: "Address Line 1",
                name: "line1",
                inputType: "text"
              },
              {
                type: "input",
                label: "Address Line 2",
                name: "line2",
                inputType: "text"
              },
              {
                type: "input",
                label: "Pincode",
                name: "pincode",
                inputType: "text"
              },
            ]
          }
        ]
      },
      data: [
        {
          firstame: "Shivajinagar",
          lastname: "MH",
          address: {
            line1: "Shivajinagar",
            line2: "FC Road",
            pincode: "411005"
          }
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
