import { Component, OnInit } from '@angular/core';  // Importer OnInit
import { Router, NavigationEnd } from '@angular/router';  // Corriger l'importation de Router
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  // Implémenter OnInit
  title = 'sellcar_anguler';
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isCostumerLoggedIn: boolean = StorageService.isCostumerLoggedIn();

  constructor(private router: Router) { }

  ngOnInit() {  // Définir correctement ngOnInit
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Mettre à jour l'état de la connexion de l'utilisateur après chaque navigation
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCostumerLoggedIn = StorageService.isCostumerLoggedIn();
      }
    });
  }

  logout() {
    StorageService.signout();  // Appeler la méthode pour effacer le stockage
   this.router.navigateByUrl('/login');  // Rediriger vers la page d'accueil
}
}