import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { User, auPair, Parent } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';

@Component({
  selector: 'the-au-pair-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public parentRegisterDetailsForm: FormGroup;
  public submitAttempt: boolean;
  public notSamePasswords: boolean;
  public locationError: boolean;

  location = "";
  potentialLocations : string[] = [];
  
  parentChosen = true;

  userDetails: User ={
    id: '',
    fname: '',
    sname: '',
    email: '',
    address: '',
    registered: false,
    type: 3,
    password: '',
    number: '',
    salt: '',
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    age: 0,
  }

  parentDetails: Parent ={
    id: '',
    children: [],
    medID: '',
    auPair: ''
  }

  aupairDetails: auPair ={
    id: '',
    rating: 0,
    onShift: false,
    employer: '',
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: '',
    experience: ''
  }


  constructor(public formBuilder: FormBuilder, public toastCtrl: ToastController, private http: HttpClient, private serv: API) 
  {
    this.parentRegisterDetailsForm = formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
      surname : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ,\'-]+$'), Validators.required])],
      email : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required])],
      phone : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(\\+27|0)[6-8][0-9]{8}$'), Validators.required])],
      id : ['', Validators.compose([Validators.maxLength(13), Validators.pattern('(((\\d{2}((0[13578]|1[02])(0[1-9]|[12]\\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\\d|30)|02(0[1-9]|1\\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\\d{4})( |-)(\\d{3})|(\\d{7}))'), Validators.required])],
      medAid : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('\\d*'), Validators.required])],
      address : ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      pass : ['', Validators.compose([Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.required])],
      confPass : ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.required])],
    });

    this.submitAttempt = false;
    this.notSamePasswords = false;
    this.locationError = false;
  }

  async registerUser() 
  {
    this.submitAttempt = true;
    this.notSamePasswords = true;
    let formError = false;

    let dom = document.getElementById("nameError");
    if(!this.parentRegisterDetailsForm.controls['name'].valid)
    {
      formError = true
      if(dom != null)
      {
        dom.innerHTML = "Name is empty";
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

    dom = document.getElementById("snameError");
    if(!this.parentRegisterDetailsForm.controls['surname'].valid)
    {
      formError = true
      if(dom != null)
      {
        dom.innerHTML = "Surname is empty";
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

    dom = document.getElementById("emailError");
    if(!this.parentRegisterDetailsForm.controls['email'].valid)
    {
      formError = true
      if(dom != null)
      {
        dom.innerHTML = "Invalid email";
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

    dom = document.getElementById("numberError");
    if(!this.parentRegisterDetailsForm.controls['phone'].valid)
    {
      formError = true
      if(dom != null)
      {
        dom.innerHTML = "Invalid phone number";
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

    dom = document.getElementById("idError");
    if(!this.parentRegisterDetailsForm.controls['id'].valid)
    {
      formError = true
      if(dom != null)
      {
        dom.innerHTML = "Invalid ID";
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

    if(this.parentChosen)
    {
      dom = document.getElementById("medError");
      if(!this.parentRegisterDetailsForm.controls['medAid'].valid)
      {
        formError = true
        if(dom != null)
        {
          dom.innerHTML = "Invalid medical aid number";
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
    }

    dom = document.getElementById("addrError");
    if(dom != null)
    {
      this.getLocations();
      if (this.potentialLocations.indexOf(this.parentRegisterDetailsForm.value.address) == -1)
      {
        formError = true
        this.locationError = true;
        dom.innerHTML = "Please select a valid location from the suggested below.";
        dom.style.display = "block";
      }
      else
      {
        this.locationError = false;
        if(dom != null)
        {
          dom.style.display = "none";
        }
      }
    }

    dom = document.getElementById("pswError");
    if(!this.parentRegisterDetailsForm.controls['pass'].valid)
    {
      formError = true
      if(dom != null)
      {
        dom.innerHTML = "Invalid password : should be of minimum length 8 and contain upper and lowercase characters as well as special characters and numbers";
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

    dom = document.getElementById("cpswError");
    if(this.parentRegisterDetailsForm.get('pass')?.value !== this.parentRegisterDetailsForm.get('confPass')?.value)
    {
      formError = true
      this.notSamePasswords = true;
      if(dom != null)
      {
        dom.innerHTML = "Passwords do not match";
        dom.style.display = "block";
      }
    }
    else
    {
      this.notSamePasswords = false;
      if(dom != null)
      {
        dom.style.display = "none";
      }
    }

    if(!formError)
    {
      let application = "";
      this.userDetails.id = this.parentRegisterDetailsForm.value.id;
      this.userDetails.fname = this.parentRegisterDetailsForm.value.name;
      this.userDetails.sname = this.parentRegisterDetailsForm.value.surname;
      this.userDetails.email = (this.parentRegisterDetailsForm.value.email).toLowerCase();
      this.userDetails.address = this.parentRegisterDetailsForm.value.address;
      this.userDetails.number = this.parentRegisterDetailsForm.value.phone;
      this.userDetails.password = this.parentRegisterDetailsForm.value.pass;

      if(this.parentChosen) 
      {
        this.userDetails.type = 1;
        this.userDetails.registered = true;
      }
      else
      {
        this.userDetails.type = 2;
      }

      await this.serv.register(this.userDetails)
      .toPromise()
      .then(
        res => {
          application = res;
        },
        error => {
          console.log("Error has occured with API: " + error);
        }
      )

      if(application == "pending")
      {
        if(this.parentChosen)
        {
          this.openToast("Registration succesfull");
          this.parentDetails.id = this.userDetails.id;
          this.parentDetails.medID = this.parentRegisterDetailsForm.value.medAid;

          await this.serv.addParent(this.parentDetails)
          .toPromise()
          .then(
            res => {
              console.log("The response is:" + res);
            },
            error => {
              console.log("Error has occured with API: " + error);
            }
          )
        }
        else
        {
          this.openToast("Registration succesfull pending approval");
          this.aupairDetails.id = this.userDetails.id;
          this.serv.addAuPair(this.aupairDetails)
          .toPromise()
          .then(
            res => {
              console.log("The response is:" + res);
            },
            error => {
              console.log("Error has occured with API: " + error);
            }
          )
        }
      }
      else
      {
        this.openToast("Account already exists with email : "+application);
      }
    }
  }

  async openToast(message: string)
  {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      color: 'primary',
      cssClass: 'toastPopUp'
    });
    await toast.present();
  }

  async getLocations()
  {
    const loc = this.parentRegisterDetailsForm.value.address;
    
    const locationParam = loc.replace(' ', '+');
    const params = locationParam + '&limit=4&format=json&polygon_geojson=1&addressdetails=1';

    await this.http.get('https://nominatim.openstreetmap.org/search?q='+params)
    .toPromise()
    .then(
      data => {
        const json_data = JSON.stringify(data);
        const res = JSON.parse(json_data);

        if(json_data === "{}")
        {
          return;
        }

        const len = res.length;
        for (let j = 0; j < len && j<4; j++) 
        { 
          this.potentialLocations.push(res[j].display_name);
        }
        console.log(this.potentialLocations);
      },
      error => { 
        console.log(error);
      }
    )
  }
}
