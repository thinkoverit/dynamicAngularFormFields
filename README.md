# DynamicGeneratedForm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

Generate Angular 6 form with configurable fields and validations using JSON schema in Angular 6+

This project is still under development..

Sampel JSON config to generate Angular Form 

[
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
  ]

Main Component:
    Create empty top level form Group and pass to dynamicForm directive

    this.form = this.fb.group({});


Min component template:

  <form *ngIf="form" [formGroup]="form"  class="dynamic-form">
      <div dynamicForm [fields]="regConfig" [group]="form"></div>
      <button (click)="submit();">Save</button>
  </form>

Custom "dynamicForm" directive will generate the form based on fields JSON config passed to it..


TODO
    Dynamic form layouts...

    
ENJOY!!!

