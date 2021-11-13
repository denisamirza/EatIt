import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  pass: string = '';
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post('api/login', {
            username: this.username,
            password: this.pass
          }).subscribe(data => {
            console.log("success");
          })
  }
}
