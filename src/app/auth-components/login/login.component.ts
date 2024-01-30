import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../auth-services/storage-services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginform: FormGroup;
  isSpinning: boolean;
  

  constructor(private service: AuthService, private fb: FormBuilder, private router: Router){}

  ngOnInit(){
    this.loginform = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  submitForm(){
    this.service.signin(this.loginform.value).subscribe((res) =>{
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        console.log(user);
        StorageService.savetoken(res.jwt);
        StorageService.saveuser(user);
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");
        } 
        else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/dashboard");
        }
      } 
      else{
        console.log("Wrong credentials");
      }
    })
 
  }
}
