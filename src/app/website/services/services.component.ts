import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { CommonService } from '../../shared/service/common.service';
declare var $: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  serviceModalFormTitle: string ="";
  serviceNeededForm: any;
  formSubmitted: boolean = false;
  aadharCardName: string = "";
  drvingLicenceName: string = "";
  rationCardName: string = "";
  voterIdName: string = "";
  todayDate: any = this.service.changeDateFormat(new Date(),'yyyy-MM-dd');
  petitionType: string = '';
  isDisabled: boolean = false;

  constructor(private fb: FormBuilder, private service: CommonService) { }

  ngOnInit(): void {
  }

  openServiceNeededModal(modalType: string){
    this.formSubmitted = false;
    this.isDisabled = false;
    this.petitionType = modalType;
    this.serviceModalFormTitle = 
      this.petitionType=="old_age_pensions" ? 
        "Old Age Pension From" : 
          this.petitionType=="handicap_helping_funds" ? 
            "Handicap Helping Fund From" : 
              this.petitionType=="area_problems" ? 
                "Area Problems Complaint From" : 
                  this.petitionType=="medical_needs" ? 
                    "Medical Helping Fund Form" :
                    this.petitionType=="government_certificates" ?  
                      "Government Certificates Request Form" : "";
    this.loadserviceNeeded();
    this.aadharCardName = "";
    this.voterIdName = "";
    this.drvingLicenceName = "";
    this.rationCardName = "";
    $('#serviceNeededModal').modal({ backdrop: 'static', keyboard: false });
  }

  closeModal(){
    $('#serviceNeededModal').modal('hide');
    this.serviceNeededForm.reset();
  }

  loadserviceNeeded() {
    this.serviceNeededForm = this.fb.group({
      userName: ['', Validators.required],
      userAge: ['', this.petitionType!='area_problems'? Validators.required : ''],
      userMobile: ['', [Validators.required, Validators.pattern( "^((\\+91-?)|0)?[0-9]{10}$" )] ],
      userAddress: ['', Validators.required],
      userWard : ['', this.petitionType=='area_problems'? Validators.required : ''],
      userPanchayat : ['', this.petitionType=='area_problems'? Validators.required : ''],
      userTaluk : ['', this.petitionType=='area_problems'? Validators.required : ''],
      certificateType : ['', this.petitionType=='government_certificates'? Validators.required : ''],
      issueType : ['', this.petitionType=='area_problems'? Validators.required : ''],
      disease : ['', this.petitionType=='medical_needs'? Validators.required : ''],
      problemDescription : '',
      drivingLicence : '',
      voterId : ['', Validators.required],
      rationCard : ['', Validators.required],
      aadharCard : ['', Validators.required]
    })
  }

  get f() { return this.serviceNeededForm.controls; }

    // File Selected Event  
  showPreview(fileInput: any, fileType: string) 
  {
    // If The File Selected
    if( fileInput.target.files[0] ) {
      let file = fileInput.target.files[0];
      fileInput.target.value = '';
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
        this.serviceNeededForm.get(fileType.toString()).setValue(file);
        this.serviceNeededForm.get(fileType.toString()).updateValueAndValidity();
        this.setFileName(fileType,file.name);
      } else{
        this.service.showToastr('உங்கள் கோப்பு 2MB ஐ விட அதிகமாக உள்ளது','warning','PMK 🥭');
      }
    }
    // If The File Unselected
    else {
      fileInput.target.value = '';
      this.setFileName(fileType,'');
      this.serviceNeededForm.get(fileType.toString()).setValue('');
      this.serviceNeededForm.get(fileType.toString()).updateValueAndValidity();
    }
  }

  setFileName(fileType: string, fileName: string){
    if(fileType=="aadharCard") {
      this.aadharCardName = fileName;
    } else if(fileType=="drivingLicence") {
      this.drvingLicenceName = fileName;
    } else if(fileType=="voterId") {
      this.voterIdName = fileName;
    } else if(fileType=="rationCard") {
      this.rationCardName = fileName;
    }
  }

  changeIssueTypes(issueType: any){
    if(issueType.value=="others/இதர")
      this.serviceNeededForm.get('problemDescription').setValidators([Validators.required]);
    else
      this.serviceNeededForm.get('problemDescription').setValidators([]);
    this.serviceNeededForm.get('problemDescription').updateValueAndValidity();
  }

  sendServiceRequest(){
    this.formSubmitted = true;
    if(!this.serviceNeededForm.valid) {
      return;
    }
    else {
      this.isDisabled = true;
      let updatedData = this.serviceNeededForm.value;
      if(this.petitionType=="area_problems"){
        delete updatedData.userAge;
        delete updatedData.certificateType;
        delete updatedData.disease;
      } 
      else if(this.petitionType!="area_problems") {
        delete updatedData.userWard;
        delete updatedData.userPanchayat; 
        delete updatedData.userTaluk;
        delete updatedData.problemDescription;
        delete updatedData.issueType;
        if(this.petitionType=='medical_needs'){
          delete updatedData.certificateType;
        }
        else if(this.petitionType=="government_certificates"){
          delete updatedData.disease;
        }
        else if(this.petitionType=="old_age_pensions" || this.petitionType=="old_age_pensions") {
          delete updatedData.certificateType;
          delete updatedData.disease;        
        }
      }
      updatedData['petitionType'] = this.petitionType;
      updatedData['status'] = "Your request has been accepted";  
      let formData: any        = new FormData();
      ['aadharCard','rationCard','voterId','drivingLicence'].forEach((item: string)=>{
        updatedData[item] ? formData.append(item,updatedData[item]) : '';
        delete updatedData[item];
      });
      formData.append('data',JSON.stringify(updatedData));      
      this.service.postService('/petition/create',formData).subscribe((data: any)=>{
        if(data.status==200){
          this.service.showToastr('உங்கள் கோரிக்கை ஏற்றுக்கொள்ளப்பட்டது','success','PMK 🥭');
        }
        else {
          this.service.showToastr('இந்த தொலை பேசி எண்ணின் மனு முன்பாகவே பரிசீலனையில் உள்ளது','info','PMK 🥭')
        }
        this.isDisabled = false;
        $('#serviceNeededModal').modal('hide');  
      });
    }
  }
}