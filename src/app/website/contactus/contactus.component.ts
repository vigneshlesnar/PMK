import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../../shared/service/common.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  contactForm: any;
  formSubmitted: boolean = false;
  isDisabled: boolean = false;

  constructor(private fb: FormBuilder, private service: CommonService) { }

  ngOnInit(): void {
    this.loadContactForm();
  }

  loadContactForm() {
    this.contactForm = this.fb.group({
      userName: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern( "^((\\+91-?)|0)?[0-9]{10}$" )] ],
      userEmail: ['', [Validators.required,Validators.pattern( "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      userMessage: ['', Validators.required]
    });
  }

  get f() { return this.contactForm.controls; }

  subscribePMK(){
    this.formSubmitted = true;
    if(!this.contactForm.valid) {
      return;
    }
    else {
      this.isDisabled = true;
      let updatedData = this.contactForm.value;
      updatedData['petitionType'] = 'subscribed_person';
      updatedData['status'] = "Your request has been accepted";
      let formData: any  = new FormData();
      formData.append('data',JSON.stringify(updatedData));
      this.service.postService('/petition/create',formData).subscribe((data: any)=>{
        if(data.status==200){
          this.service.showToastr('உங்கள் கோரிக்கை ஏற்றுக்கொள்ளப்பட்டது','success','PMK 🥭');
        }
        else {
          this.service.showToastr('இந்த தொலை பேசி எண்ணின் மனு முன்பாகவே பரிசீலனையில் உள்ளது','info','PMK 🥭')
        }
        this.loadContactForm();
        this.isDisabled = false;
      });
    }
  }
}
