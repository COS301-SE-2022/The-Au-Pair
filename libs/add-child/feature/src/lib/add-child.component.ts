import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Navigate } from 'libs/shared/ngxs/actions';
import { API } from '../../../../shared/api/api.service';
import { Child, Parent } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent
{
  //Child model
  childDetails: Child = {
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: ""
  }  

  parent: Parent ={
    id: "",
    children: [],
    medID: "",
    auPair: ""
  }

  //Regex for south african ID number
  SA_ID = new RegExp(/(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/);

  //Constructor
  constructor(private serv: API, public router: Router, public toastCtrl: ToastController, private store: Store) {}

  //Function to retrieve the child's details
  async getChildValues(val: any)
  {

    //Error check the fields for invalid input

    //Child ID Field
    let emptyInput = false;
    let invalidInput = false;
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
    else if(!this.SA_ID.test(val.childID))
    {
      if(dom != null)
      {
        dom.innerHTML = "Invalid South African ID number.";
        dom.style.display = "block";
        invalidInput = true;
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
    else if(invalidInput == true)
    {
      console.log("Entered South African is invalidID");
    }
    else
    {
      let idNum = val.childID.replaceAll(' ', '');
      idNum = val.childID.replaceAll('-', '');
      
      this.childDetails.id = idNum;
      this.childDetails.fname = val.childName;
      this.childDetails.sname= val.surname;
      this.childDetails.allergies= val.Allergies;
      this.childDetails.diet= val.diet;
      this.childDetails.parent= this.store.snapshot().user.id;
      this.addChild(this.childDetails);
    }
  }

  //Pop-up if child is successfully updates
  async openToast() : Promise<boolean>
  {
    const toast = await this.toastCtrl.create({
      message: 'Child added successfully!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
    return true;
  }

  returnToChildrenDashboard()
  {
    this.store.dispatch(new Navigate('/children-dashboard'));
  }

  //Service calls
  addChild(child: Child)
  {
    this.serv.getParent(this.childDetails.parent).subscribe(
      res=>{
        this.parent.id = res.id;
        this.parent.children = res.children;
        this.parent.medID = res.medID;
        this.parent.auPair = res.auPair;
        this.parent.children.push(child.id);
        //Update the parent object to contain the new child ID
        this.serv.editParent(this.parent).subscribe(
          res=>{
            console.log("The response is:" + res); 
          },
          error=>{
            console.log("Error has occured with API: " + error);
          }
        );
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )

    this.serv.addChild(child).subscribe(
      res=>{
        console.log("The response is:" + res); 
        this.openToast();
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
  }
}
