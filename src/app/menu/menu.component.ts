import { Component } from '@angular/core';
import { AuthenticationService } from '../firebase-services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private authService: AuthenticationService) {

  }

  logout() {
    this.authService.logout();
  }
}
