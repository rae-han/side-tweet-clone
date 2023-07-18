import { RegisterOptions } from 'react-hook-form';

export interface FormSchemaType {
  type: 'email' | 'text' | 'password';
  key: string;
  defaultValue: string;
  placeholder?: string;
  options?: RegisterOptions;
}
