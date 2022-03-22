import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs/operators';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  activeFragment = this.route.fragment.pipe(share());
  
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
