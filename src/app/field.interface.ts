export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  fields?: any;
  group?: any;
  data?: any[];
  url?: string;
}

export interface LayoutConfig {
  label?: string;
  type: string;
  isMulti?: boolean;
  sections?: Layout[]
}
export interface Layout {
  label?: string;
  name: string;
  fields?: FieldConfig[];
  disabled?: boolean;
  expanded?: boolean;
}
