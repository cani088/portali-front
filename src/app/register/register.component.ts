import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public myForm:FormGroup;
  public hasError=false;
  public errorMessage='';
  public success=false;
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit() {

    this.regsiterFrom();
  }

  regsiterFrom(){

    this.myForm=this.fb.group({
      username:"",
      user_email:"",
      password:"",
      password_2:"",
      birth_year:"" 
    });

  }


  register(){
    var res=this.userService.register(this.myForm.value);
    res.subscribe((data:any)=>{
      if(data.success==1){
        //when the user has been registered successfully
        this.success=true;
        this.hasError=false;
        this.router.navigate(['/top'])
        localStorage.setItem('token',data.token);
      }else{
        //when there has been an error
        this.hasError=true;
        this.errorMessage=data.message;
      }
    });
  }
}
