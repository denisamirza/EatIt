import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  pass: string = '';
  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post('http://localhost:3000/auth/login', {
            username: this.username,
            password: this.pass
          }).subscribe(data => {
            this.router.navigate([`home`]);
            console.log("successss");
          })
  }
}
