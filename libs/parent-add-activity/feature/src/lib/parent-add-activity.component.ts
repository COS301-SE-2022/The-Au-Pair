import { Component, OnInit} from '@angular/core';
import { API } from '../../../../shared/api/api.service';
import { Activity, Child, Email } from '../../../../shared/interfaces/interfaces';
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
  childName = "";

  //Activity Model
  activityDetails: Activity = {
    id: "",
    name: "",
    description: "",
    location: "",
    boundary: 0.0,
    longitude: 0.0,
    latitude: 0.0,
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
  potentialLocations : any = [];
  longitude = 0.0;
  latitude = 0.0;

  //Children of logged in user
  allChildren: Child[] = [];

  //Time-slots available for selection
  availableTimes: string[] = 
  [
    "00:00-01:00",
    "01:00-02:00",
    "02:00-03:00",
    "03:00-04:00",
    "04:00-05:00",
    "05:00-06:00",
    "06:00-07:00",
    "07:00-08:00",
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
    "21:00-22:00",
    "22:00-23:00",
    "23:00-24:00",
    "24:00-00:00",
  ];

  emailRequest : Email = {
    to: "",
    subject: "",
    body: "",
  }

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
        let found = false;
        //Get the selected location and its coords
        this.potentialLocations.forEach((loc : any) => 
        {
          if(loc.display_name === this.location)
          {
            found = true;
            this.longitude = loc.lon;
            this.latitude = loc.lat;
          }
          
        });

        if(!found)
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
      this.activityDetails.longitude = this.longitude;
      this.activityDetails.latitude = this.latitude;
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
      for (let j = 0; j < len && j<5; j++) 
      { 
        if (this.potentialLocations.includes(res[j]) === false){
          this.potentialLocations.push(res[j]); 
        }
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
    this.allChildren.forEach(child => {
      if(child.id == act.child){
        this.childName = child.fname;
      }
    });

    this.serv.addActivity(act).toPromise().then(
      res=>{
        console.log("The response is:" + res); 
        //send email to parent about newly added activity
        this.emailRequest.to = this.store.snapshot().user.email;
        this.emailRequest.subject = "New Activity Added";
        this.emailRequest.body = "You have succesfully added a new activity for " + this.childName + ". The activity will apear on your child's schedule that can be viewed on the app." + 
                                 "If any changes need to be made to the activity, you can edit the activity on the schedule page as well!\n\nKind Regards,\nThe Au Pair Team";
        this.serv.sendEmail(this.emailRequest).toPromise().then(
          res=>{
            console.log(res);
          }
        ).catch(
          err=>{
            console.log(err);
          }
        );

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

  radioChecked(event: any){
    this.location = event.target.value;
  }
}
