import { Component, OnInit} from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Activity, Child } from '../../../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-parent-add-activity',
  templateUrl: './parent-add-activity.component.html',
  styleUrls: ['./parent-add-activity.component.scss'],
})
export class ParentAddActivityComponent implements OnInit{
  parentID = "";
  //Activity Model
  activityDetails: Activity = {
    id: "",
    name: "",
    description: "",
    location: "",
    boundary: 0.0,
    timeStart: "",
    timeEnd: "",
    budget: 0.0,
    comment: "",
    behavior: 0,
    day: "",
    child: "",
  };

  //Possible locations searched for
  location = "";
  potentialLocations : string[] = [];

  //Children of logged in user
  allChildren: Child[] = [];

  //Constructor
  constructor(private serv: API, private http: HttpClient, private store: Store, public toastCtrl: ToastController) {}

  ngOnInit(): void 
  {
    //Call getChildren service
    this.parentID = this.store.snapshot().user.id;
    this.getChildren();
  }

  //Populate the activityDetails object from form input
  async getActivityValues(val : any)
  {  
    console.log(val);
    
    //FORM ERROR CHECKING
    let emptyInput = false;
    let dom = document.getElementById("actNameError");

    //Activity Name
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

    //Description Name
    dom = document.getElementById("descripError");
    if(val.description === "")
    { 
      emptyInput = true;
      if(dom != null)
      {
        dom.innerHTML = "Description is empty";
        dom.style.display = "block";
      }
    }else
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

    //Day of the week
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

    //Time
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

    //Budget
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
        if(isNaN(parseFloat(val.budget)))
        {
          dom.innerHTML = "Please ensure this is a number e.g. 500.50";
          dom.style.display = "block";
          return;
        }
        else
        {
          dom.style.display = "none";
        }
      }
    }

    //Child selected
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
    
    //Empty input
    if(emptyInput == true)
    {
      console.log("You cannot add an activity with empty fields.");
    }
    else
    {
      const budget = parseFloat(val.budget);
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
      this.addActivity(this.activityDetails);
    }
  }

  async getLocations()
  {
    const loc = this.location;
    
    //Building the API query according to what is in the location input field
    const locationParam = loc.replace(' ', '+');
    const params = locationParam + '&limit=10&format=json&polygon_geojson=1&addressdetails=1';

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

      //Clear previous suggested locations
      this.potentialLocations.splice(0);
  
      //Add returned data to the array
      const len = res.length;
      for (let j = 0; j < len && j<10; j++) 
      { 
        this.potentialLocations.push(res[j].display_name);
      }
    })
    .catch(error=>{ // Failure
      console.log(error);
    });
  }

  //Pop-up if activity is successfully added
  async openToast()
  {
    const toast = await this.toastCtrl.create({
      message: 'Activity successfully added!',
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  //Service calls
  addActivity(act:Activity){
    this.serv.addActivity(act).toPromise().then(
      res=>{
        console.log("The response is:" + res); 
        this.openToast();
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
  };

  getChildren()
  {
    this.serv.getChildren(this.parentID).toPromise().then(
      res=>{
          this.allChildren = res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
  }
}
