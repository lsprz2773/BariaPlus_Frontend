import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form-footer',
  standalone: false,
  templateUrl: './register-form-footer.html',
  styleUrl: './register-form-footer.css'
})
export class RegisterFormFooter {
  @Input() step: number = 1;
  @Output() prevStep = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  onPreviousStep(){
    this.prevStep.emit()
  }

  toLogin(){
    this.router.navigate([''],{
      queryParams: {login: 'true'}
    });
  }
}
