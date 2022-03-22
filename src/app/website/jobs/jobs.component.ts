import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../../shared/service/common.service';
declare var $: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobModalFormTitle: string ="";
  jobApplyForm: any;
  formSubmitted: boolean = false;
  resumeFileName: string = "";
  todayDate: any = this.service.changeDateFormat(new Date(),'yyyy-MM-dd');
  petitionType: string = '';
  isDisabled: boolean = false;

  constructor(private fb: FormBuilder, private service: CommonService) { }

  ngOnInit(): void {
  }

  openJobApplyFormModal(modalType: string){    
    this.formSubmitted = false;
    this.isDisabled = false;
    this.petitionType = modalType;
    this.jobModalFormTitle = this.petitionType=="youth_jobs" ? "Youth Job Oppotunities From" : this.petitionType=="self_jobs" ? "Self Job Oppotunities From" : this.petitionType=="other_jobs" ? "Other Job Oppotunities From" : '';
    this.loadJobApplyForm();
    this.resumeFileName = "";
    $('#jobApplyFormModal').modal({ backdrop: 'static', keyboard: false });
  }

  loadJobApplyForm() {
    this.jobApplyForm = this.fb.group({
      userName: ['', Validators.required],
      userDOB: ['', Validators.required],
      userAge: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern( "^((\\+91-?)|0)?[0-9]{10}$" )] ],
      userEmail: ['', this.petitionType=="youth_jobs" ? Validators.pattern( "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" ) : '' ],
      userQualification: ['', Validators.required],
      userAddress: ['', Validators.required],
      userResume: ['', Validators.required]
    })
  }

  get f() { return this.jobApplyForm.controls; }

  // File Selected Event  
  showPreview(fileInput: any ) 
  {
    // If The File Selected
    if( fileInput.target.files[0] ) {
      let file = fileInput.target.files[0];
      fileInput.target.value = '';
      this.resumeFileName = file.name;
      // Check The File MB size and If The File Less Than 1 MB or Not 
      if(this.service.getFileSize(file.size)) {
        //Show  preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const image     = new Image();
          image.src       = reader.result as string;
          image.onload = () => {     
          }
        }
        reader.readAsDataURL(file);
        // Bind The File Details On The Reactive Form
        this.jobApplyForm.patchValue( { userResume: file } );
        this.jobApplyForm.get('userResume').updateValueAndValidity();
      } else{
        this.service.showToastr('உங்கள் கோப்பு 2MB ஐ விட அதிகமாக உள்ளது','warning','PMK 🥭');
      }
    }
    // If The File Unselected
    else {
      this.resumeFileName = '';
      this.jobApplyForm.patchValue( { userResume: '' } );
      this.jobApplyForm.get('userResume').updateValueAndValidity();
    }
  }

  applyJobs(){
    this.formSubmitted = true;
    if(!this.jobApplyForm.valid) {
      return;
    }
    else {
      this.isDisabled = true;
      let updatedData = this.jobApplyForm.value;
      if(this.petitionType!="youth_jobs"){
        delete updatedData.userEmail;
      }
      updatedData['petitionType'] = this.petitionType;
      updatedData['status'] = "Your request has been accepted";

      let formData: any  = new FormData();
      formData.append('resume',updatedData.userResume);
      delete updatedData.userResume;
      formData.append('data',JSON.stringify(updatedData));
      this.service.postService('/petition/create',formData).subscribe((data: any)=>{
        if(data.status==200){
          this.service.showToastr('உங்கள் கோரிக்கை ஏற்றுக்கொள்ளப்பட்டது','success','PMK 🥭');
        }
        else {
          this.service.showToastr('இந்த தொலை பேசி எண்ணின் மனு முன்பாகவே பரிசீலனையில் உள்ளது','info','PMK 🥭')
        }
        this.isDisabled = false;
        $('#jobApplyFormModal').modal('hide');
      });
    }
  }
}
