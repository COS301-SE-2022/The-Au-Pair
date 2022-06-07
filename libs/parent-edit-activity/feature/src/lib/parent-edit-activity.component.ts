import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { Activity } from '../../../../shared/interfaces/activity.interfaces';

@Component({
  selector: 'the-au-pair-parent-edit-activity',
  templateUrl: './parent-edit-activity.component.html',
  styleUrls: ['./parent-edit-activity.component.scss'],
})
export class ParentEditActivityComponent implements OnInit {
   //Activity Model
   activityDetails: Activity = {
    id: "deault",
    name: "",
    description: "",
    location: "",
    timeStart: "",
    timeEnd: "",
    budget: 0.0,
    comment: "",
    behavior: "",
    day: "",
    child: "",
  };

  //Children of logged in user
  allChildren: any;

  //Constructor
  constructor(private serv: API, private router: Router) 
  {
    const navigation = this.router.getCurrentNavigation();
    if(navigation !== null)
      if(navigation.extras !== null)
      { 
        this.activityDetails.id = navigation.extras.state?.['id'];
      }
  }

  ngOnInit(): void 
  {    
    //Call getChildren service
    this.getChildren();

    //Call API for all of the selected activity's info
    this.getActivityDetails();
  }

  //Populate the activityDetails object from the form's input
  getActivityValues(val : any)
  {  
    console.log(val);
    
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
    }else
    {
      if(dom != null)
      {
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
      this.editActivity(this.activityDetails);
    }
  }

  //Pre-populate the fields with activities details
  prePopulateFields(response: Activity)
  {
    console.log("The description is: ", response.description);
    
    //Name
    let dom = (<HTMLInputElement>document.getElementById("actNameText"));
    if(dom != null)
      dom.value = response.name;

    //Description
    const dom2 = (<HTMLInputElement>document.getElementById("descriptionText"));
    //  = document.getElementById("descriptionText");
    if(dom2 != null)
      dom2.value = response.description;

    //Location
    dom = (<HTMLInputElement>document.getElementById("locationText"));
    if(dom != null)
      dom.value = response.location;

    //Selected Day
    dom = (<HTMLInputElement>document.getElementById("selectedDay"));
    if(dom != null)
      dom.value = response.day;

    //Timeslot
    dom = (<HTMLInputElement>document.getElementById("selectedTime"));
    if(dom != null)
    {
      const timeslot = response.timeStart + "-" + response.timeEnd;
      dom.value = timeslot;
    }
      
    //Budget
    dom = (<HTMLInputElement>document.getElementById("budgetText"));
    if(dom != null)
    {
      const budg = "" + response.budget;
      dom.value = budg;
    }
      
    //Selected Child
    dom = (<HTMLInputElement>document.getElementById("childId"));
    if(dom != null)
    {
      const child = "" + response.child;
      dom.value = child;
      console.log("the child is: ", response.child);
    } 
  }

  //Service calls
  getActivityDetails()
  { 
    this.serv.getActivity(this.activityDetails.id).subscribe(
      res=>{
        console.log("The response is:" + res); 
        this.prePopulateFields(res);
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };

  editActivity(act:Activity){
    this.serv.editActivity(act).subscribe(
      res=>{
        location.reload();
        console.log("The response is:" + res); 
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };

  getChildren()
  {
    this.serv.getParent().subscribe(
      res=>{
        console.log("The response is:" + res); 
          this.allChildren = res.children;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }
}
