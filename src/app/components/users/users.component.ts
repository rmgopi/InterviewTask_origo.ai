import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as Highcharts from "highcharts";
import { UserdetailComponent } from '../users/userdetail/userdetail.component'
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 
  
  constructor(
    private userService: UserService
  ) {

  }
  users: any = []
  latLessThanZero: any = []
  latGreatZero: any = []
  lngLessThanZero: any = []
  lngGreatZero: any = []
  displayedColumns: string[] = ['id', 'name', 'username', 'city', 'pincode', 'companyname'];
  dataArray: number[] = []
  chartname: string = '';
  userData: any = {
    id: '',
    name: '',
    username: '',
    email: ''
  }
  percentage: number = 0;
  Highcharts: typeof Highcharts = Highcharts;
  // chartOptions: Highcharts.Options = {}
  data1 = [100, 130, 230, 230];
  seriesName = "Geo Positions";
  chartOptions: Highcharts.Options = {
    responsive: {  
      rules: [{  
        condition: {  
          maxWidth: 500  
        },  
        chartOptions: { 
          legend: {  
            enabled: true  
          }  
        }  
      }]  
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{y}'
        },
        events: {
          click: function () {
              console.log('percent clicked')
          }
      }
      },
    },
    title: {
      text: "Users Geo Positions"
    },
    series: [
      {
        name: this.seriesName,
        type: "pie",
        data: this.data1
      }
    ]
  };


  ngOnInit(): void {
    console.log(this.data1)
    this.userService.getUsers().subscribe(users => {
      this.users = users

      this.userData.id = this.users[0].id;
      this.userData.name = this.users[0].name;
      this.userData.username = this.users[0].username;
      this.userData.email = this.users[0].email;
      
      console.log(this.users)
      this.latLessThanZero = this.users.filter((user: { address: { geo: { lat: number; }; }; }) => user.address.geo.lat < 0)
      console.log(this.latLessThanZero)
      this.dataArray.push(this.latLessThanZero.length * 10)
      this.latGreatZero = this.users.filter((user: { address: { geo: { lat: number; }; }; }) => user.address.geo.lat > 0)
      console.log(this.latGreatZero)
      this.dataArray.push(this.latGreatZero.length * 10)
      this.lngLessThanZero = this.users.filter((user: { address: { geo: { lng: number; }; }; }) => user.address.geo.lng < 0)
      console.log(this.lngLessThanZero)
      // create array of of filtered users with langitude < 0
      this.dataArray.push(this.lngLessThanZero.length * 10)
      this.lngGreatZero = this.users.filter((user: { address: { geo: { lng: number; }; }; }) => user.address.geo.lng > 0)
      console.log(this.lngGreatZero)
      this.dataArray.push(this.lngGreatZero.length * 10)
      console.log(this.dataArray)
      this.data1 = this.dataArray
     
      this.chartOptions = {
        title: {
          text: "Users Geo Positions"
        },
        series: [
          {
            name: this.seriesName,
            type: "pie",
            data: this.data1
          }
        ]
      }
      this.percentage = ((this.lngGreatZero.length / this.users.length) *100)
    })

  }

  onRowClick($event: any, user:User) {
    this.userData.id = user.id;
    this.userData.name = user.name;
    this.userData.username = user.username;
    this.userData.email = user.email;
  }

  showPercent(){
    console.log('Percent Clicked')
  }

}
