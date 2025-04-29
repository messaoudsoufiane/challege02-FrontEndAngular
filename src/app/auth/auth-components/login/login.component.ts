import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form'; 
import { NzInputModule } from 'ng-zorro-antd/input'; 
import { CommonModule } from '@angular/common'; 
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router'; // <-- Importé Router
import { NzMessageService } from 'ng-zorro-antd/message'; // <-- Importé pour afficher les messages d'erreur

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSpinning: boolean = false;  // Mis à false par défaut

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,   // <-- Injection de Router
    private message: NzMessageService  // <-- Injection du service de message d'erreur
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.isSpinning = true;
    this.service.login(this.loginForm.value).subscribe(res => {
      if (res.user != null) {
        const user = {
          id: res.user.id,
          role: res.userRole
        };
        StorageService.saveUser(user);
        StorageService.saveToken(res.token);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        } else if (StorageService.isCostumerLoggedIn()) {
          this.router.navigateByUrl("/customer/dashboard");
        } else {
          this.message.error("Bad credentials", { nzDuration: 5000 });
        }
        this.isSpinning = false;
      }
    }, error => {
      // Gestion des erreurs
      this.isSpinning = false;
      this.message.error("Une erreur s'est produite", { nzDuration: 5000 });
    });
  }
}
