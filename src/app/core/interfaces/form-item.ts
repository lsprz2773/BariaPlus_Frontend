export interface FormItem {
  id?: number;
  type: 'text' | 'date' | 'select' | 'tel' | 'password' | 'email' | 'number';
  label?: string;
  placeholder: string;
  name: string;
  required?: boolean;
  options?: string[];
  step?: string; //contar numero decimales
  min?: number; // validacion de datos q no sean negativo
}
