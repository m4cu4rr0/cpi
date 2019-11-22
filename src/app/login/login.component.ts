import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private authService: AuthService, private router: Router) { }

  login(){
    this.authService.login();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
  }

}
