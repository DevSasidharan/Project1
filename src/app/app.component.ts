import { Component } from '@angular/core';
import { StorageService } from './auth-services/storage-services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project-angular';
  isCustomerLoggedIn: boolean;
  isAdminLoggedIn: boolean;

  constructor(private router: Router){}
  ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout(){
  StorageService.signout();
  this.router.navigateByUrl("/login");
  }
}
