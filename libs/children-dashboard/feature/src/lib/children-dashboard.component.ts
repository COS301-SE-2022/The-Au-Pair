import { Component, OnInit } from '@angular/core';
import { Child } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';

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
  allChildren: any;

  constructor(private serv: API, public router: Router, private store: Store, public toastCtrl: ToastController) {}

  ngOnInit(): void
  {
    this.parentID = this.store.snapshot().user.id;
    this.getChildren();
    this.getNumChildren();
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

  //Function to see number of existing children for the parent
  async getNumChildren()
  {
    this.serv.getParent(this.store.snapshot().user.id).subscribe(
      res=>{
        console.log("The response is:" + res); 
          this.allChildren = res.children;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  }

  //Checking the number of children (max=4)
  checkNumChildren()
  {
    if(this.allChildren.length ==4)
    {
      //Show toast with an error
      this.openToast("The maximum number of children is 4", "danger");
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
  

  navigateEdit(child : Child)
  { 
    //Route to the edit-activity page and parse the ActivityID of the selected Activity 
    this.router.navigate(['/edit-child'],{
      state: {child: child}
    });
  }
}
