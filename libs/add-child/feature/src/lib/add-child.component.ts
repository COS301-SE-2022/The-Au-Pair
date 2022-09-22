import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { API } from '../../../../shared/api/api.service';
import { Child, Parent } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent implements OnInit
{
  //Child model
  childDetails: Child = {
    id: "",
    fname: "",
    sname: "",
    dob: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: "",
  }  

  parent: Parent ={
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }

  allChildren: any;

  //Constructor
  constructor(private serv: API, public router: Router, public toastCtrl: ToastController, private store: Store) {}

  ngOnInit(): void {
      this.getNumChildren();
  }

  //Function to retrieve the child's details
  async getChildValues(val: any)
  {        
    //Max number of children for each user is 4
    if(this.allChildren.length < 4)
    {
      //Error check the fields for invalid input
      //Child ID Field
      let emptyInput = false;

      //Child name field
      let dom = document.getElementById("childNameError");
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
          dom.innerHTML = "Diet field is incomplete";
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
        //ID number is generated in child service
        this.childDetails.id = "";
        this.childDetails.fname = val.childName;
        this.childDetails.sname= val.surname;
        this.childDetails.dob = val.dateOfBirth;
        this.childDetails.allergies= val.Allergies;
        this.childDetails.diet= val.diet;
        this.childDetails.parent= this.store.snapshot().user.id;
        this.childDetails.aupair= this.parent.auPair;
        this.addChild(this.childDetails);
      }
    }
    else
    {
      this.openErrToast("The maximum number of children is 4", "danger");
    }
  }

  //Function to see number of existing children for the parent
  async getNumChildren()
  {
    this.serv.getParent(this.store.snapshot().user.id).subscribe(
      res=>{
        console.log("The response is:" + res); 
          this.allChildren = res.children;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
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

  //Pop-up if child is successfully updates
  async openErrToast(message : string,  color: string) : Promise<boolean>
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      color: color,
      cssClass: 'toastPopUp'
    });
    await toast.present();
    return true;
  }

  returnToChildrenDashboard()
  {
    this.router.navigate(['/children-dashboard']).then(()=>{
      window.location.reload();
    });
  }

  //Service calls
  async addChild(child: Child)
  {
    let generatedChildID = "";
    //Add the child to the Children collection
    await this.serv.addChild(child).toPromise().then(
      res=>
      {
        const returnedChild = JSON.parse(res);
        generatedChildID = returnedChild.id;
        this.openToast();
      }).catch(
      error=>{
        console.log("Error has occured with API: " + error);
      }
    );

    // Set the childs ID in the parents document
    await this.serv.getParent(this.childDetails.parent)
    .toPromise()
    .then(
      async res=>
      {
        this.parent.id = res.id;
        this.parent.children = res.children;
        this.parent.medID = res.medID;
        this.parent.auPair = res.auPair;
        this.parent.children.push(generatedChildID);
        this.parent.rating = res.rating;

        // Update the parent object to contain the new child ID
        await this.serv.editParent(this.parent)
        .toPromise()
        .then(
          res=>
          {
            console.log("The response is:" + res); 
          })
        .catch(
          error=>
          {
            console.log("Error has occured with API: " + error);
          }
        );

      })
    .catch(
      error=>
      {
        console.log("Error has occured with API: " + error);
      }
    );
  }
}
