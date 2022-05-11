import { Component} from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'the-au-pair-parent-add-activity',
  templateUrl: './parent-add-activity.component.html',
  styleUrls: ['./parent-add-activity.component.scss'],
})
export class ParentAddActivityComponent{
  //Activity object to hold the activity details
  activityDetails = <Activity>{};

  //Constructor
  constructor() {
    console.log();
  }

  //Populate the activityDetails object from form input
  async getActivityValues(val : any)
  {         
    //Check if any details are missing
    let emptyInput = false;

    if(val.activityName === "")
    {
      emptyInput = true;
    }
    if(val.description === "")
    {
      emptyInput = true;
    }
    if(val.location === "")
    {
      emptyInput = true;
    }
    if(val.dayOfWeek === "")
    {
      emptyInput = true;
    }
    if(val.timeSlot === "")
    {
      emptyInput = true;
    }
    if(val.budget === "")
    {
      emptyInput = true;
    }
    if(val.childId === "")
    {
      emptyInput = true;
    }
    
    if(emptyInput == true)
    {
      console.log("You cannot add an activity with empty fields.");
    }
    else
    {
      const budget = parseInt(val.budget);
      this.activityDetails = new Activity(val.activityName, val.description, val.location, val.dayOfWeek, val.timeSlot, budget, val.childId);
    }
  }
  //Function to populate db with this info here

}

export class Activity
{
  //Private variables
  private _activityName: string;
  private _description: string;
  private _location: string;
  private _dayOfTheWeek: string;
  private _timeSlot: string;
  private _budget: number;
  private _childId: string;

  //Getters and setters
  public get activityName(): string {
    return this._activityName;
  }
  public set activityName(value: string) {
    this._activityName = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get location(): string {
    return this._location;
  }
  public set location(value: string) {
    this._location = value;
  }
  public get dayOfTheWeek(): string {
    return this._dayOfTheWeek;
  }
  public set dayOfTheWeek(value: string) {
    this._dayOfTheWeek = value;
  }
  public get timeSlot(): string {
    return this._timeSlot;
  }
  public set timeSlot(value: string) {
    this._timeSlot = value;
  }
  public get budget(): number {
    return this._budget;
  }
  public set budget(value: number) {
    this._budget = value;
  }
  public get childId(): string {
    return this._childId;
  }
  public set childId(value: string) {
    this._childId = value;
  }

  //Constructor
  constructor(actName: string, descrip: string, location: string, dayOfWeek: string, timeSlot: string, budget: number, childId: string)
  {
    this._activityName=actName;
    this._description = descrip;
    this._location = location;
    this._dayOfTheWeek = dayOfWeek;
    this._timeSlot = timeSlot;
    this._budget = budget;
    this._childId = childId;
  }
}
