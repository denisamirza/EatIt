import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from "../shared/shared.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  pass: string = '';
  constructor(private http : HttpClient,
              private router: Router,
              private shared: SharedService) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post('http://localhost:3000/auth/login', {
            username: this.username,
            password: this.pass
          }).subscribe(data => {
            this.shared.setUsername(this.username);
            this.router.navigate([`home`]);
          })
  }
}
