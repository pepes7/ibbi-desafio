import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Estoque de produtos';

  constructor(private router: Router){

  }

  public goToPage(path: string): void {

    this.router.navigate(['/', path])
        .then(nav => {
          console.log(nav);
        }, err => {
          console.log(err) 
        });
  }

  public goExternalUrl(url: string): void {
    window.open(url, "_blank");
  }
}
