import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from '../../../core/interfaces/form-item';

@Component({
  selector: 'app-reusable-form',
  standalone: false,
  templateUrl: './reusable-form.html',
  styleUrls: ['./reusable-form.css']
})
export class ReusableForm {

  @Input() formGroup!: FormGroup;
  @Input() title: string = '';
  @Input() formItems: FormItem[] = [];
  @Input() classHelper: string = '';

  //helper para control de lista

  getControl(name: string){
    return this.formGroup.get(name) ||null;
  }

    trackByName(_: number, item: FormItem) {
    return item.name;
  }
}
