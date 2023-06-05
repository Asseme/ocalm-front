import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ocalm_gestion';

  constructor(private router: Router){}

  menuItemClicked(url: string) {
    this.router.navigate([url]);
  }
}
