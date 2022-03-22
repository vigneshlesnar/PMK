import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from './shared/service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pmk';
  isAdmin: boolean = false;

  constructor(public router: Router, public service: CommonService) {
    this.router.events.subscribe((event)=>{
        if(event instanceof NavigationEnd){
          this.isAdmin = (event.url).includes('admin');
        }
    });
  }
}
