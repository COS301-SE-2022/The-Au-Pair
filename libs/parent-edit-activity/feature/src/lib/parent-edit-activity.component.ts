import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { API } from '../../../../shared/api/api.service';
import { Activity } from '../../../../shared/interfaces/activity.interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'the-au-pair-parent-edit-activity',
  templateUrl: './parent-edit-activity.component.html',
  styleUrls: ['./parent-edit-activity.component.scss'],
})
export class ParentEditActivityComponent implements OnInit {
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Variables**/

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
    behavior: "",
    day: "",
    child: "",
  };
  timeslot = "";
  //Children of logged in user
  allChildren: any;

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Functions*/

  //Constructor
  constructor(private serv: API, private router: Router, public toastCtrl: ToastController) 
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
    this.getChildren();
    this.getActivityDetails();
  }

  //From HTML Form
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

  returnToSchedule()
  {
    this.router.navigate(['/schedule']).then(()=>{
      window.location.reload();
    });
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

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Service calls**/
  getActivityDetails()
  { 
    this.serv.getActivity(this.activityDetails.id).subscribe(
      res=>{
        console.log("The response is:" + res); 
        this.activityDetails.id = res.id;
        this.activityDetails.name = res.name;
        this.activityDetails.description = res.description;
        this.activityDetails.location = res.location;
        this.activityDetails.day = res.day;
        this.activityDetails.timeStart = res.timeStart;
        this.activityDetails.timeEnd = res.timeEnd;
        this.activityDetails.budget = res.budget;
        this.activityDetails.child = res.child;
        this.timeslot = res.timeStart + "-" + res.timeEnd
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
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}
