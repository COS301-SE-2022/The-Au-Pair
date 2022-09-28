import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetImgString } from '../../../../shared/ngxs/actions';
import { API } from '../../../../shared/api/api.service';
import { Activity, Child } from '../../../../shared/interfaces/interfaces';

@Component({
  selector: 'the-au-pair-parent-view-activity',
  templateUrl: './parent-view-activity.component.html',
  styleUrls: ['./parent-view-activity.component.scss'],
})
export class ParentViewActivityComponent implements OnInit
{
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Variables**/

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

  hasImage = false;
  src="";

  //Child name associated with ID
  selectedChild="";

  timeslot = "";
  constructor(private serv: API, private router: Router, private store: Store)
  {
    this.activityDetails.id=this.store.snapshot().user.currentActivity;
  }

  async ngOnInit(): Promise<void>
  {
    await this.getActivityDetails();
    await this.setImage();
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Service calls**/
  async getActivityDetails()
  { 
    await this.serv.getActivity(this.activityDetails.id).toPromise().then(
      res=>{
        console.log("The response is:" + res); 
        this.activityDetails.id = res.id;
        this.activityDetails.name = res.name;
        this.activityDetails.description = res.description;
        this.activityDetails.location = res.location;
        this.activityDetails.boundary = res.boundary;
        this.activityDetails.day = res.day;
        this.activityDetails.timeStart = res.timeStart;
        this.activityDetails.timeEnd = res.timeEnd;
        this.activityDetails.behavior = res.behavior;
        this.activityDetails.comment = res.comment;
        this.activityDetails.budget = res.budget;
        this.activityDetails.child = res.child;
        this.timeslot = res.timeStart + "-" + res.timeEnd
      }).catch(
      error=>{console.log("Error has occured with API: " + error);}
    );

    await this.serv.getChildren(this.store.snapshot().user.id).toPromise().then(
      async res=>{
          await res.forEach((c : Child) => {
            if(c.id == this.activityDetails.child)
              this.selectedChild = c.fname;
          });
      }).catch(
      error=>{
        console.log("Error has occured with API: " + error);
      }
    );
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /**Navigation**/

  returnToSchedule()
  {
    //Route depending on logged in user
    if(this.store.snapshot().user.type == 1)
    {
      this.router.navigate(['/schedule']);
    }
    else if(this.store.snapshot().user.type == 2)
    {
      this.router.navigate(['/au-pair-schedule']);
    }
  }

  async setImage(){
    await this.serv.getFile(this.activityDetails.id  +  ".png").toPromise().then(
      async res=>{
        if (res.size > 0){
          const dataType = res.type;
          const binaryData = [];
          binaryData.push(res);
          const href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          this.store.dispatch(new SetImgString(href));
          const dom = document.getElementById(this.activityDetails.id);

          if(dom != null)
          {
            dom.setAttribute("src", this.store.snapshot().user.imgString);
          }

          this.hasImage = true;
        }
        else{
          const dom = document.getElementById(this.activityDetails.id);
          if (dom != null) {
            dom.setAttribute("src","assets/images/no-image.png");
          }
          this.hasImage = true;
        }
      },
      error=>{
        return error;
      }
    );
  }
}
