import { Component, Input } from '@angular/core';
import { FormItem } from '../../../core/interfaces/form-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reusable-form',
  standalone: false,
  templateUrl: './reusable-form.html',
  styleUrl: './reusable-form.css'
})
export class ReusableForm {

  @Input() title: string = '';
  @Input() formItems: FormItem[] = [];
  @Input() classHelper?: string = '';

  formData: { [key:string]: any } = {};

  constructor(){
    this.formItems.forEach(item =>{
      this.formData[item.name]
    });
  }

  onInputChange(name:string, value: any){
    this.formData[name] = value;
    console.log('Form data', this.formData)
  }

}
