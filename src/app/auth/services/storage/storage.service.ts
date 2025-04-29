import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // Sauvegarde du token dans le localStorage
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  // Sauvegarde de l'utilisateur dans le localStorage
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Récupération du token du localStorage
  static getToken(): string {
    return localStorage.getItem(TOKEN) || ''; // Renvoie une chaîne vide si le token n'est pas trouvé
  }

  // Récupération de l'utilisateur du localStorage
  static getUser(): any {
    try {
      return JSON.parse(localStorage.getItem(USER) || '{}');
    } catch (e) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', e);
      return {}; // Retourne un objet vide en cas d'erreur
    }
  }

  // Récupération du rôle de l'utilisateur
  static getUserRole(): string {
    const user = this.getUser();
    return user.role || 'guest'; // Renvoie 'guest' par défaut si aucun rôle n'est trouvé
  }

  // Vérifie si l'utilisateur est administrateur
  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false; // Si le token est vide, l'utilisateur n'est pas connecté
    const role: string = this.getUserRole();
    return role === 'ADMIN'; // Vérifie si l'utilisateur est un administrateur
  }

  // Vérifie si l'utilisateur est un client
  static isCostumerLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false; // Si le token est vide, l'utilisateur n'est pas connecté
    const role: string = this.getUserRole();
    return role === 'COSTUMER'; // Vérifie si l'utilisateur est un client
  }

  // Vérifie si le token existe
  static hasToken(): boolean {
    return !!localStorage.getItem(TOKEN); // Retourne true si le token existe, sinon false
  }

  // Récupère l'ID de l'utilisateur
  static getUserId(): string {
    const user = this.getUser();
    return user.id || ''; // Renvoie l'ID de l'utilisateur ou une chaîne vide si aucun ID n'est trouvé
  }

  // Déconnexion de l'utilisateur (supprime le token et l'utilisateur du localStorage)
  static signout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
