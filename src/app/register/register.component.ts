import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public myForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.myForm=this.fb.group({
      username:"",
      name:"",
      last_name:"",
      email:"",
      password:"",
      password_2:"",
      birth_year:"" 
    });

  }


  register(){
    
    this.myForm.valueChanges.subscribe((data)=>{
      console.log("dada",data);
    });
  }
}
