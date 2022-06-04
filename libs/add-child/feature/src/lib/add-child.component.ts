import { Component, OnInit } from '@angular/core';
import { API } from '../../../../shared/api/api.service';


@Component({
  selector: 'the-au-pair-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss'],
})
export class AddChildComponent implements OnInit {
  
//Constructor
constructor(private serv: API) {}

ngOnInit(): void 
{
  console.log();
}

//Function to retrieve the child's details
async getChildValues(val: any)
{
  //Error check the fields for invalid input
  console.log(val);
  
}


//Service calls

}
