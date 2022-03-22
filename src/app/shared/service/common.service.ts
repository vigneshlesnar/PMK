import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { FileSizePipe } from '../pipes/filesize.pipe';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public baseUrl: string = environment.domainAPI;

  constructor(private filesizepipe: FileSizePipe, private datePipe: DatePipe, private router: Router,
    private http: HttpClient, private toastr: ToastrService, private httpClient: HttpClient, private titleService: Title,) {
  }

  // get the file size
  getFileSize(fileSize: number): boolean {
    const max_size = 2.00;  // Max File Upload Size
    const file_size = (this.bytesToExtensions(fileSize, "MB")).split('')[0]; // File Size in Mb
    return parseInt(file_size) < max_size;
  }

  // Convert File Size Bytes to KB or MB or GB
  bytesToExtensions(size: number, extension: string) {
    return this.filesizepipe.transform(size, extension);
  }

  changeDateFormat(date: any, format: string): any {
    return this.datePipe.transform(date, format);
  }

  // POST API Method While Pass JSON Data
  postService(url: string, data?: any): any {
    return this.http.post(this.baseUrl + url, data).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // Show the Toast Message 
  showToastr(message: string, messageType: string, title?: string) {
    var customClass: string = '';
    switch (messageType) {
      case 'success':
        customClass = 'success-toastr mt-4';
        break;
      case 'error':
        customClass = 'error-toastr mt-4';
        break;
      case 'warning':
        customClass = 'wanring-toastr mt-4';
        break;
      case 'info':
        customClass = 'information-toastr mt-4';
        break;
    }
    // without Title
    if (message && !title) {
      this.toastr.show(message, '', { extendedTimeOut: 3000 }, customClass);
    }
    // with Title 
    else if (message && title) {
      this.toastr.show(message, title, { extendedTimeOut: 3000 }, customClass);
    }
  }

  // Set Meta Tag Titiles For Show in the Browser on Particular Page
  set_meta_title(obj: any) {
    this.titleService.setTitle(obj['title']);
  }

  // Get Data From Api 
  public get(url: string) {
    return this.httpClient.get(environment.domainAPI + url);
  }

  // Post Data to Api
  public post(url: string, obj: any,) {
    return this.httpClient.post(environment.domainAPI + url, obj).pipe(map((response) => {
      let result = response;
      return result;
    }));
  }

  // Patch Data to Api
  public patch(url: string, obj?: any,) {
    return this.httpClient.patch(environment.domainAPI + url, obj).pipe(map((response) => {
      let result = response;
      return result;
    }));
  }

  // SetLogin User Details
  setLoginUserDetails(loginUserDetails: any) {
    sessionStorage.setItem('pmkAdminUserDetails', JSON.stringify(loginUserDetails));
  }
  // Remove login use details
  logout() {
    sessionStorage.removeItem('pmkAdminUserDetails');
    this.router.navigate(['/admin/login']);
  }
  // Get Login User Details
  getLoginUserDetails() {
    let loginUserDet = JSON.parse(JSON.stringify(sessionStorage.getItem("pmkAdminUserDetails")));
    return loginUserDet;
  }

  getDate(date?: any, format?: any): any {
    return typeof date !== 'undefined' ? this.datePipe.transform(date, format) : '-NILL-';
  }
}

