import { Component, OnInit } from '@angular/core';
import { Activity, Child, Parent } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastController, AlertController } from '@ionic/angular';
import { SetCurrentChild } from '../../../../shared/ngxs/actions';

@Component({
  selector: 'the-au-pair-children-dashboard',
  templateUrl: './children-dashboard.component.html',
  styleUrls: ['./children-dashboard.component.scss'],
})
export class ChildrenDashboardComponent implements OnInit 
{
  //Parent and children information
  parentID = "";
  children: Child[] = []
  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
    rating: []
  }
  activities: Activity[] = [];

  constructor(private serv: API, public router: Router, private store: Store, public toastCtrl: ToastController, private alertController: AlertController) {}

  ngOnInit(): void
  {
    this.parentID = this.store.snapshot().user.id;
    this.getChildren();
    this.getParent();
  }

  async getChildren()
  {
    this.serv.getChildren(this.parentID).subscribe(
      res=>{
        let i = 0;
        res.forEach((element: Child) => 
        {
          this.children[i++] = element;
        });
      },
      error =>{console.log("Error has occured with API: " + error);}
    )
  }

  //Checking the number of children (max=4)
  checkNumChildren() : boolean
  {
    if(this.children !== undefined)
    {
      if(this.children.length ==4)
      {
        //Show toast with an error
        this.openToast("The maximum number of children is 4", "danger");
        return false;
      }
    }
    return true;
  }

  //Pop-up if child is successfully updates
  async openToast(message : string,  color: string) : Promise<boolean>
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

  async presentAlert(child: Child) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete ' + child.fname + '?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => { this.removeChild(child); }
        }
      ]
    });

    await alert.present();
  }

  async removeChild(child: Child)
  {
    //Removing the child from the parent's array of child in their document
    await this.removeChildFromParent(child.id);

    //Service call to delete child
    await this.serv.removeChild(child.id).toPromise().then(res => 
      {
        this.openToast(child.fname + " removed successfully!", "primary");
        location.reload();
        console.log("The response is:", res); 
        return res;
      }).catch(err => 
        {
          console.log(err);
        }
      );

    //Remove the activities associated with the child
    await this.getActivities(child.id);
    await this.serv.removeManyActivities(this.activities).toPromise().then(
      res=>{
        console.log("The response is: ", res);
        return res;
      }).catch(
      error=>{
        console.log("Error has occured with API: ", error);
        return error;
      }
    )
    
  }

  getParent()
  {
    this.serv.getParent(this.parentID).subscribe(
      res=>{        
        this.parentDetails = res;
        return res;
      },
      error=>{
        console.log("Error has occured with API: ", error);
        return error;
      }
    )
  }

  async getActivities(childID : string)
  {
    await this.serv.getSchedule(childID).toPromise().then(res=>
      {
          this.activities = res;
      }).catch(
          error=>{
            console.log("Error has occured with API: " + error);
        }
      );
  }

  async removeChildFromParent(id : string)
  {
    for (let i = 0; i < this.parentDetails.children.length; i++) 
    {
      const childID = this.parentDetails.children[i];
      if(childID === id)
      {
        this.parentDetails.children.splice(i,1);
      }
    }

    await this.serv.editParent(this.parentDetails).toPromise().then(res => 
      {
         console.log("The reponse is: ", res);   
      }).catch(err => 
        {
          console.log(err);
        }
      );
  }
  

  navigateEdit(child : Child)
  { 
    this.store.dispatch(new SetCurrentChild(child.id));
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-child'],{
      state: {child: child}
    });
  }

  getAge(dateString : string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
  }
}
