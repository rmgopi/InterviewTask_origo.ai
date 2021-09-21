import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  @Input() user: any = {};

  userData: User = {
    id: '',
    name: '',
    username: '',
    email: ''
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
    // this.userData.id = this.user.id
    // this.userData.name = this.user.name,
    // this.userData.username = this.user.username,
    // this.userData.email = this.user.email

  }

}
