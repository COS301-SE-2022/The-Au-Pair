import { Component, OnInit } from '@angular/core';
import { Child } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastController, AlertController } from '@ionic/angular';

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

  constructor(private serv: API, public router: Router, private store: Store, public toastCtrl: ToastController, private alertController: AlertController) {}

  ngOnInit(): void
  {
    this.parentID = this.store.snapshot().user.id;
    this.getChildren();
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
  checkNumChildren()
  {
    if(this.children !== undefined)
    {
      if(this.children.length ==4)
      {
        //Show toast with an error
        this.openToast("The maximum number of children is 4", "danger");
      }
    }
    
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

  removeChild(child: Child)
  {
    console.log("Deleting child");

    //Service call to delete child
    this.serv.removeChild(child.id).subscribe(
      res=>{
        // location.reload();
        console.log("The response is:" + res); 
        location.reload();
        this.openToast(child.fname + " removed successfully!", "primary");
        return res;
      },
      error=>{
        console.log("Error has occured with API: " + error);
        return error;
      }
    )
    
  }
  

  navigateEdit(child : Child)
  { 
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-child'],{
      state: {child: child}
    });
  }
}
