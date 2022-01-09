import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  pass: string = '';
  constructor(private http : HttpClient,
              private router: Router,) { }

  ngOnInit(): void {
  }

  register() {
    this.http.post('http://localhost:3000/auth/register', {
            username: this.username,
            password: this.pass
          }).subscribe(data => {
            console.log("success");
            this.router.navigate([`login`]);
          })
  }
}
