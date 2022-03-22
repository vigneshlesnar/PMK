import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private service: CommonService) { }

  ngOnInit(): void {
  }

  logout(){
    this.service.logout();
  }

}
