import { Component, OnInit } from '@angular/core';
import { User, auPair, Parent } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import * as L from 'leaflet'
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

@Component({
  selector: 'the-au-pair-track-au-pair',
  templateUrl: './track-au-pair.component.html',
  styleUrls: ['./track-au-pair.component.scss'],
})

export class TrackAuPairComponent implements OnInit 
{
  //Map variables
  leafletMap : any;
  markerGroup : any;
  lat = -26;
  long = 28;
  zoom = 8;
  nearestAddy = "";

  /*User variables*/

  //Logged in parent details
  userID = "";
  userType = 0;

  userDetails: User = {
    id: "",
    fname: "",
    sname: "",
    email: "",
    address: "",
    registered: false,
    type: 0,
    password: "",
    number: "",
    salt: "",
    latitude: 0,
    longitude: 0,
    suburb: "",
    gender: "",
    fcmToken : "",
    birth: ""
  }

  parentDetails: Parent = {
    id: "",
    children: [],
    medID: "",
    auPair: "",
  }

  auPairDetails: auPair = {
    id: "",
    rating: 0,
    onShift: false,
    employer: "",
    costIncurred: 0,
    distTraveled: 0,
    payRate: 0,
    bio: "",
    experience: "",
    currentLong: 0.0,
    currentLat : 0.0
  }

  auPairName = "";

  constructor(private serv : API,  private http: HttpClient,  private store: Store) 
  {
    //Initialise parentID for logged in user
    this.userID = this.store.snapshot().user.id;
    this.userType = this.store.snapshot().user.type;

    setInterval(async ()=> {
      //Initialise parentID for logged in user
      this.userID = this.store.snapshot().user.id;
      this.userType = this.store.snapshot().user.type;
      await this.getUserDetails();
      this.putMarker();
     }, 10000);
  }

  async ngOnInit(): Promise<void> 
  { 
    this.loadLeafletMap();
    await this.getUserDetails();
    this.putMarker();
    this.leafletMap.setView(new L.LatLng(this.auPairDetails.currentLat, this.auPairDetails.currentLong),15, {animate: true});
    
  }

  loadLeafletMap() 
  {
    //Clearing the current marker before adding the new one
    this.leafletMap = new L.Map('leafletMap');
    this.markerGroup = L.layerGroup().addTo(this.leafletMap);

        //Load the map
    this.leafletMap.on("load",  () => {
      setTimeout(() => {
        this.leafletMap.invalidateSize();
      }, 1000);
    });
    this.leafletMap.setView([this.lat, this.long], this.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      minZoom: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(this.leafletMap);
  }

  async getUserDetails()
  {
    /* Find logged in user's au pair */
    let res = await this.serv.getParent(this.userID).toPromise();
    this.parentDetails.auPair = res.auPair;  
    
    /* Get the au pairs name */
    const auPairUser = await this.serv.getUser(this.parentDetails.auPair).toPromise();
    this.auPairName = auPairUser.fname;

    /* Get the onShift and current coords of the employed au pair  */
    res = await this.serv.getAuPair(this.parentDetails.auPair).toPromise();
    
    this.auPairDetails.id = res.id;
    this.auPairDetails.onShift = res.onShift;
    this.auPairDetails.currentLong = res.currentLong;
    this.auPairDetails.currentLat = res.currentLat;
  };

  async putMarker()
  {    
    //Only show location if the au pair is on shift    
    if(this.auPairDetails.onShift)
    {
      //Get the nearrest location to the au pair
      //Building the API query according to what is in the location input field
      const reverseGeoCode = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.auPairDetails.currentLat + '&lon=' + this.auPairDetails.currentLong + '&addressdetails=1';

      //Make the API call
      await this.http.get(reverseGeoCode)
      .toPromise()
      .then(data=>{ // Success
        //Populate nearest address
        const json_data = JSON.stringify(data);
        const res = JSON.parse(json_data);

        //Jump out if no results returned
        if(json_data === "{}")
        {
          return;
        }
    
        //Add returned data to the array
        this.nearestAddy = res.display_name;
      })
      .catch(error=>{ // Failure
        console.log(error);
      });

      //Clear all old markers
      this.leafletMap.removeLayer(this.markerGroup);
      this.markerGroup = L.layerGroup().addTo(this.leafletMap);

      //Put the marker and style the icon
      L.marker(
        [this.auPairDetails.currentLat, this.auPairDetails.currentLong],
        {icon: new L.Icon({iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'})
      }).addTo(this.markerGroup);
      // this.leafletMap.panTo([this.auPairDetails.currentLat, this.auPairDetails.currentLong], 14);

      //Display name of au pair and current address they are at
      const dom = document.getElementById("auPairStatus");
      if(dom != null)
      {
        dom.innerHTML = this.auPairName + " is near " + this.nearestAddy;
        dom.style.display = "flex";
        dom.style.color = "green";
        dom.style.fontSize = "20px";
      }
    }
    else
    {
      //Clear all location markers
      this.leafletMap.removeLayer(this.markerGroup);
      this.markerGroup = L.layerGroup().addTo(this.leafletMap);
      
      const dom = document.getElementById("auPairStatus");
      if(dom != null)
      {
        dom.innerHTML = "Your Au Pair is currently not on shift, and their location cannot currently be shown.";
        dom.style.display = "flex";
        dom.style.color = "var( --ion-color-danger-tint)";
      }
    }
  }
}