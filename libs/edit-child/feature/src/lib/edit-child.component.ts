import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { ToastController } from '@ionic/angular';
import { Child, Parent } from '../../../../shared/interfaces/interfaces';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss'],
})
export class EditChildComponent implements OnInit {

  //Child model
  childDetails: Child = {
    id: "",
    fname: "",
    sname: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: ""
  }  

  parent: Parent ={
    id: "",
    children: [],
    medID: "",
    auPair: ""
  }

  //Regex for south african ID number
  SA_ID = new RegExp(/(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/);

  constructor(private serv: API, public router: Router, public toastCtrl: ToastController, private store: Store)
  {
    const navigation = this.router.getCurrentNavigation();
    if(navigation !== null)
      if(navigation.extras !== null)
      { 
        this.childDetails = navigation.extras.state?.['child'];
      }
  }

  ngOnInit(): void 
  {
    console.log();
    
  }

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
    this.router.navigate(['/children-dashboard']);
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
}
