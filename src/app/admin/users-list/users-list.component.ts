import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  selectedPetitionType: string = "";
  petitionTypes: any = ['youth_jobs', 'other_jobs', 'old_age_pensions', 'self_jobs', 'handicap_helping_funds', 'area_problems', 'medical_needs', 'government_certificates', "subscribed_person"]
  usersList: any = [];
  petitionList: any = [];
  petitionName: any = petitionName;
  showingGalleryImages: Array<any> = [];
  selectedPetition: any;
  window: any = window;
  messageContent: string = "";
  searchText: string = "";

  constructor(public service: CommonService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.service.get('/petition/list').subscribe((data: any) => {
      if (data.status == 200) {
        this.usersList = data.results;
        this.petitionList = data.results;
      }
    })
  }

  searchPetition() {
    let data = this.usersList.concat();
    this.petitionList = this.selectedPetitionType ? data.filter((obj: any) => obj.petitionType == this.selectedPetitionType) : this.usersList.concat();
  }

  searchByText(){
    let data = this.usersList.concat();
    if(this.searchText!=='') {
      this.petitionList = data.filter((obj: any) => obj.userName.toLowerCase().indexOf(this.searchText.toLowerCase())!= -1 || obj.userMobile.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1);
    } else {
      this.petitionList = data;
    }
  }

  viewDeatils(petitionDet: any, neededView: string) {
    this.selectedPetition = petitionDet;
    this.messageContent = '';
    $("#" + neededView + "Modal").modal('show');
  }

  closeModal(neededView: string) {
    $("#" + neededView + "Modal").modal('hide');
  }

  getFileName(docURL: string) {
    let URL = docURL.split('/');
    let fileName = URL[URL.length - 1].split('.')[0];
    return fileName;
  }

  deleteConfirm() {
    this.service.patch('/petition/delete/' + this.selectedPetition.userMobile).subscribe((data: any) => {
      if (data.status == 200) {
        this.service.showToastr(this.selectedPetition.userName + ' petition deleted successfully','success', 'PMK 🥭');
        this.usersList.splice(this.usersList.findIndex((obj: any) => obj._id == this.selectedPetition._id), 1);
        this.closeModal('delete');

      }
    })
  }

  sendMessage(){
    if(this.messageContent!='') {
      let postData = {
        userMobile : this.selectedPetition.userMobile,
        message : this.messageContent
      }
      this.service.post('/sms/send',postData).subscribe((response: any)=>{
          if(response.status==200){
            this.service.showToastr('Message send Successfully to '+this.selectedPetition.userName,'success','PMK 🥭');
            this.closeModal('message');
          }
      })
    } else {
      this.service.showToastr('Please enter message content to send','warning','PMK 🥭');
    }
  }

}

export enum petitionName {
  "youth_jobs" = "Youth Jobs",
  "other_jobs" = "Other Jobs",
  "self_jobs" = "Self Jobs",
  "old_age_pensions" = "Old Age Pensions",
  "handicap_helping_funds" = "Handicap Helping Funds",
  "area_problems" = "Area Problems",
  "medical_needs" = "Medical Needs",
  "government_certificates" = "Government Certificates",
  "subscribed_person" = "Subscribe Person"
}