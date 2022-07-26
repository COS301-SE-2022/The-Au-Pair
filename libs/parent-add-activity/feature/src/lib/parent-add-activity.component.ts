import { Component, OnInit} from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Activity, Child } from '../../../../shared/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

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
  constructor(private serv: API, private http: HttpClient, private store: Store) {}

  ngOnInit(): void 
  {
    //Call getChildren service
    this.parentID = this.store.snapshot().user.id;
    this.getChildren();
  }

  //Populate the activityDetails object from form input
  async getActivityValues(val : any)
  {  
    //FORM ERROR CHECKING
    let emptyInput = false;
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
      this.activityDetails.name = val.activityName;
      this.activityDetails.description = val.description;
      this.activityDetails.location = val.location;
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
    const params = locationParam + '&limit=4&format=json&polygon_geojson=1&addressdetails=1';

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
  
      //Add returned data to the array
      const len = res.length;
      for (let j = 0; j < len && j<4; j++) 
      { 
        this.potentialLocations.push(res[j].display_name);
      }
    })
    .catch(error=>{ // Failure
      console.log(error);
    });
  }

  //Service calls
  addActivity(act:Activity){
    this.serv.addActivity(act).subscribe(
      res=>{
        console.log("The response is:" + res); 
        location.reload()},
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
  };

  getChildren()
  {
    this.serv.getChildren(this.parentID).subscribe(
      res=>{
          this.allChildren = res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
      }
    )
  }
}
