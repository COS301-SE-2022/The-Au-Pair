import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Activity, Child } from '../../../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-parent-edit-activity',
  templateUrl: './parent-edit-activity.component.html',
  styleUrls: ['./parent-edit-activity.component.scss'],
})
export class ParentEditActivityComponent implements OnInit {
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Variables**/
  //Possible locations searched for
  location = "";
  potentialLocations : string[] = [];
  originalLocation = "";

  //Activity Model
  activityDetails: Activity = {
  id: "",
  name: "",
  description: "",
  location: "",
  timeStart: "",
  boundary: 0.0,
  longitude: 0.0,
  latitude: 0.0,
  timeEnd: "",
  budget: 0.0,
  comment: "",
  behavior: 0,
  day: "",
  child: "",
  };

  currentChild : Child = {
    id: "",
    fname: "",
    sname: "",
    dob: "",
    allergies: "",
    diet: "",
    parent: "",
    aupair: ''
  };

  timeslot = "";
  //Children of logged in user
  allChildren: any;

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Functions*/

  //Constructor
  constructor(private serv: API, private router: Router, public toastCtrl: ToastController, private http : HttpClient, private store: Store, private alertController: AlertController) 
  {
    this.activityDetails.id=this.store.snapshot().user.currentActivity;
  }

  ngOnInit(): void
  {    
    this.getActivityDetails();
  }

  //From HTML Form
  getActivityValues(val : any)
  {  
    //FORM ERROR CHECKING
    let emptyInput = false;

    //Activity Name
    let dom = document.getElementById("actNameError");
    if(val.activityName === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Activity name is empty";
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

  //Description
    dom = document.getElementById("descripError");
    if(val.description === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Description is empty";
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

    //Location
    dom = document.getElementById("locError");
    if(val.location === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Location is empty";
        dom.style.display = "block";
      }
    }
    else
    {
      //Only check for valid location if its not empty and different from the original
      if(this.originalLocation !== val.location)
      {
        if(dom != null)
        {
          //Check that the selected location is from the API
          this.getLocations()
          if (this.potentialLocations.indexOf(this.location) == -1)
          {
            dom.innerHTML = "Please select a valid location from the suggested below.";
            dom.style.display = "block";
            return;
          }
          else
            dom.style.display = "none";
        }
      }
    }

    //Boundary
    dom = document.getElementById("boundaryError");
    if(val.boundary === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Boundary is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      { 
        if(isNaN(parseFloat(val.boundary)))
        {
          dom.innerHTML = "Please ensure this is a number e.g. 5.2";
          dom.style.display = "block";
          return;
        }
        else
        {
          dom.style.display = "none";
        }
      }
    }

    //Day
    dom = document.getElementById("dayError");
    if(val.dayOfWeek === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Day of the week is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("timeError");
    if(val.timeSlot === "" || val.timeSlot.length < 11)
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Time slot is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("budgetError");
    if(val.budget === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Budget is empty";
        dom.style.display = "block";
      }
    }else
    {
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }
    dom = document.getElementById("childError");
    if(val.childId === "")
    {
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Child ID is empty";
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
    
    if(emptyInput == true)
    {
      console.log("You cannot add an activity with empty fields.");
    }
    else
    {
      const budget = parseInt(val.budget);
      const bound = parseFloat(val.boundary);
      this.activityDetails.name = val.activityName;
      this.activityDetails.description = val.description;
      this.activityDetails.location = val.location;
      this.activityDetails.boundary = bound;
      this.activityDetails.day = val.dayOfWeek;
      this.activityDetails.timeStart = val.timeSlot.substring(0,5);
      this.activityDetails.timeEnd = val.timeSlot.substring(6,11);
      this.activityDetails.budget = budget;
      this.activityDetails.child = val.childId;
      this.editActivity(this.activityDetails);
    }
  }


  async getLocations()
  {
    const loc = this.location;
    
    //Building the API query according to what is in the location input field
    const locationParam = loc.replace(' ', '+');
    const params = locationParam + '&limit=5&format=json&polygon_geojson=1&addressdetails=1';

    //Make the API call
    await this.http.get('https://nominatim.openstreetmap.org/search?q='+params)
    .toPromise()
    .then(data=>{ // Success
      //Populate potential Locations Array
      const json_data = JSON.stringify(data);
      const res = JSON.parse(json_data);

      //Jump out if no results returned
      if(json_data === "{}")
      {
        return;
      }

      this.potentialLocations.splice(0);

      //Add returned data to the array
      const len = res.length;
      for (let j = 0; j < len && j<5; j++) 
      { 
        if (this.potentialLocations.includes(res[j].display_name) === false){
          this.potentialLocations.push(res[j].display_name); 
        }
      }
    })
    .catch(error=>{ // Failure
      console.log(error);
    });
  }

  returnToSchedule()
  {
    this.router.navigate(['/schedule']);
  }

  //Pop-up if activity is successfully updates
  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Activity successfully updated!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this activity?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => { this.removeActivity(); }
        }
      ]
    });

    await alert.present();
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Service calls**/
  getActivityDetails()
  { 
    this.serv.getActivity(this.activityDetails.id).subscribe(
      async res=>{
        console.log("The response is:" + res); 
        
        this.activityDetails.id = res.id;
        this.activityDetails.name = res.name;
        this.activityDetails.description = res.description;
        this.activityDetails.location = res.location;
        this.location = res.location;
        this.activityDetails.boundary = res.boundary;
        this.originalLocation = res.location;
        this.activityDetails.day = res.day;
        this.activityDetails.timeStart = res.timeStart;
        this.activityDetails.timeEnd = res.timeEnd;
        this.activityDetails.budget = res.budget;
        this.activityDetails.child = res.child;
        this.timeslot = res.timeStart + "-" + res.timeEnd
        await this.getChildrenDetails();
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };

  editActivity(act:Activity){
    this.serv.editActivity(act).subscribe(
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

  async getChildrenDetails()
  {
    this.serv.getChildren(this.store.snapshot().user.id).toPromise().then(
      res=>{
          this.allChildren = res;
          //Removing the child that is already set from getActivity ( to remove duplicates )
          for (let i = 0; i < this.allChildren.length; i++) 
          {
            if(this.allChildren[i].id === this.activityDetails.child)
            { 
              this.currentChild = this.allChildren[i];
              //Remove
              this.allChildren.splice(i, 1);
            }
          }
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
  }

  removeActivity()
  {
    this.serv.removeActivity(this.activityDetails.id).toPromise().then(
      res=>{
        console.log("The response is:", res);
        this.returnToSchedule();
      },
      error=>{
        console.log("Error has occured with API: ", error);
        return error;
      }
    ); 
  }

  radioChecked(event: any){
    this.location = event.target.value;
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}
