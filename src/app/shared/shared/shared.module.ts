import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../service/common.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoRecordsComponent } from '../no-records/no-records.component';
import { HeaderComponent } from 'src/app/admin/header/header.component';



@NgModule({
  declarations: [NoRecordsComponent, HeaderComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CommonService,
    DatePipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NoRecordsComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
