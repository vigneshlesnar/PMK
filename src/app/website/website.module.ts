import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { JobsComponent } from './jobs/jobs.component';
import { ServicesComponent } from './services/services.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';

@NgModule({
  declarations: [
    WebsiteComponent,
    TopNavComponent,
    HomeComponent,
    FooterComponent,
    ContactusComponent,
    JobsComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
