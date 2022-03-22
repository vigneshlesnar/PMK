import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannerImages = [
    {
      img : "./assets/img/banner2.jpg",
      title : "Welcome",
      description: ""
    },
    {
      img : "./assets/img/banner3.jpg",
      title : "Welcome",
      description: ""       
    },
    {
      img : "./assets/img/banner4.jpg",
      title : "Welcome",
      description: ""
    },        
    {
      img : "./assets/img/banner5.jpg",
      title : "Welcome",
      description: ""
    }        
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
