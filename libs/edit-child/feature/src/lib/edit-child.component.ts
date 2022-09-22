import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { ToastController } from '@ionic/angular';
import { Child, Parent } from '../../../../shared/interfaces/interfaces';
import { Store } from '@ngxs/store';
import { SetCurrentChild } from '../../../../../libs/shared/ngxs/actions';

@Component({
  selector: 'the-au-pair-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss'],
})
export class EditChildComponent implements OnInit {

  //All chidlren
  children: Child[] = [];

  //Child model
  childDetails: Child = {
    id: "",
    fname: "",
    sname: "",
    dob: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: ''
  }  

  parent: Parent ={
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }

  constructor(private serv: API, public router: Router, public toastCtrl: ToastController, private store: Store)
  {
    this.childDetails.id=this.store.snapshot().user.currentChild;
  }

  ngOnInit(): void 
  {
    this.getChild();
    this.getParent();
  }

  async getChildValues(val: any)
  {

    //Error check the fields for invalid input
    let emptyInput = false;
    //Child ID Field
    let dom = document.getElementById("childIDError");
    if(val.childID === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Child ID field is empty.";
        dom.style.display = "block";
      }
    }
    else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    //Child name field
    dom = document.getElementById("childNameError");
    if(val.childName === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Child name field is empty.";
        dom.style.display = "block";
      }
    }
    else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    
    //Surname field
    dom = document.getElementById("surnameError");
    if(val.surname === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Surname field is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    //Date of birth field
    dom = document.getElementById("dateOfBirthError");
    if(val.dateOfBirth === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Date of birth field is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    //Allergies field
    dom = document.getElementById("allergiesError");
    if(val.Allergies === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Allergies field is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    //Diet field
    dom = document.getElementById("dietError");
    if(val.diet === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Diet field is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    //Populate child model if no erroneous fields
    if(emptyInput == true)
    {
      console.log("You cannot add an child with empty fields.");
    }
    else
    { 
      this.childDetails.id = val.childID;
      this.childDetails.fname = val.childName;
      this.childDetails.sname= val.surname;
      this.childDetails.dob = val.dateOfBirth;
      this.childDetails.allergies= val.Allergies;
      this.childDetails.diet= val.diet;
      this.childDetails.parent= this.store.snapshot().user.id;
      this.childDetails.aupair = this.parent.auPair;
      this.updateChild(this.childDetails);
    }
  }

  //Pop-up if activity is successfully updates
  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Child details successfully updated!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  returnToChildrenDashboard()
  {
    this.store.dispatch(new SetCurrentChild(""));
    this.router.navigate(['/children-dashboard']).then(()=>{
      location.reload();
    });
  }

  updateChild(child : Child){    
    this.serv.updateChild(child).subscribe(
      res=>{
        // location.reload();
        console.log("The response is:" + res); 
        this.openToast();
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
  };

  async getChild()
  {

    await this.serv.getChildren(this.store.snapshot().user.id).toPromise().then(
      async res=>
      {
        await res.forEach( (c: Child) => {
          if(c.id == this.childDetails.id)
          {
            this.childDetails = c;
          }          
        }); 
      }).catch(
      error=>{
        console.log("Error has occured with API: " + error);
      }
    );
  }

  async getParent()
  {
    this.serv.getParent(this.store.snapshot().user.id).subscribe(
      res => {
        console.log("The response is:" + res);
        this.parent = res;
        console.log(this.parent);

      },
      error => { console.log("Error has occured with API: " + error); }
    )
  }
}
