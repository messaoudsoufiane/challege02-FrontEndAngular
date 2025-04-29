import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,        // Pour *ngIf, *ngFor etc
    ReactiveFormsModule, // Pour formGroup, formControlName
    NzSpinModule,        // Pour <nz-spin>
    NzFormModule,        // Pour <nz-form-item>, <nz-form-control>
    NzInputModule,
    NzButtonModule       // Pour <input nz-input>
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  isSpinning: boolean = true;

  constructor(private fb: FormBuilder, private service: AuthService) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  // Validation pour confirmer que le mot de passe et la confirmation du mot de passe sont identiques
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // Méthode d'envoi du formulaire d'inscription
  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.service.register(this.signupForm.value).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
