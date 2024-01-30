import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] 
})
export class SignupComponent {

  isSpinning: boolean;
  validateForm: FormGroup;

  confirmationValidator = (control:FormControl): { [s: string]: boolean} => {
    if (!control.value){ return {required: true};}
    else if(control.value !== this.validateForm.controls['password'].value){ return {confirm: true, error: true}}
    return{};
  }

  constructor(private service: AuthService,private fb: FormBuilder,private notification: NzNotificationService){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      checkPassword: ["", [Validators.required, this.confirmationValidator]],
      name: ["", Validators.required]
    })
  }

  register(){
    this.service.signup(this.validateForm.value).subscribe((res) =>{
    if(res.id != null){ 
      this.notification.success("success","Resgistered Successfully",{nzDuration: 5000});
    }
    else{
      this.notification.success("Failed","Registered Unsuccessful!", {nzDuration: 5000});
    }
  })
  }

}
