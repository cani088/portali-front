import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  closeResult: string;
  public myForm:FormGroup;
  public hasError=false;
  public errorMessage='';
  public success=false;
  private _url='http://127.0.0.1:8000/api';
  constructor(private userService:UserService, private modalService: NgbModal,public fb:FormBuilder,private router:Router) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(){

    this.loginFrom();
  }

  loginFrom(){

    this.myForm=this.fb.group({
      user_email:"",
      password:""
    });
  }

  // setSession(){

  //   this.localSto
  // }

  userLogin(){

    var res= this.userService.login(this.myForm.value);
    res.subscribe((data:any)=>{
      localStorage.setItem('token',data.token);

      if(data.success==1){
        //when the user has been registered successfully
        this.success=true;
        this.hasError=false;
        this.router.navigate(['/top'])
        console.log('data',data);

        console.log('dataToken',data.token);
        
      }else{
        //when there has been an error
        this.hasError=true;
        this.errorMessage=data.message;
      }
      console.log('data',data);

        console.log('dataToken',data.token);
    })
  }
}
