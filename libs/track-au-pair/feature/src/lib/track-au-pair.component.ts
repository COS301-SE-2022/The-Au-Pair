import { Component, OnInit } from '@angular/core';
import { User, auPair, Parent } from '../../../../shared/interfaces/interfaces';
import { API } from '../../../../shared/api/api.service';
import * as L from 'leaflet'

@Component({
  selector: 'the-au-pair-track-au-pair',
  templateUrl: './track-au-pair.component.html',
  styleUrls: ['./track-au-pair.component.scss'],
})
export class TrackAuPairComponent implements OnInit {

  //Map variables
  leafletMap : any;
  lat = -26;
  long = 28;
  zoom = 8;

  //User variables
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

  constructor(private serv : API) {}

  async ngOnInit(): Promise<void> {
    this.loadLeafletMap();
    await this.getParentDetails();
    this.putMarker();
  }

  

  loadLeafletMap() 
  {

    this.leafletMap = new L.Map('leafletMap');

    const self = this;

    this.leafletMap.on("load", function () {
      setTimeout(() => {
        self.leafletMap.invalidateSize();
      }, 1000);
    });
    this.leafletMap.setView([this.lat, this.long], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      minZoom: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(this.leafletMap);
  }

  async getParentDetails()
  {
    /* Find logged in user's au pair */
    let res = await this.serv.getParent("4561237814867").toPromise();
    this.parentDetails.auPair = res.auPair;   
    
    /* Get the onShift and current coords of the employed au pair  */
    res = await this.serv.getAuPair(this.parentDetails.auPair).toPromise();
    this.auPairDetails.id = res.id;
    this.auPairDetails.onShift = res.onShift;
    this.auPairDetails.currentLong = res.currentLong;
    this.auPairDetails.currentLat = res.currentLat;
  };

  putMarker()
  {    
    //Put the marker and style the icon
    L.marker(
      [this.auPairDetails.currentLat, this.auPairDetails.currentLong],
      {icon: new L.Icon({iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png'})
    }).addTo(this.leafletMap);
    // this.leafletMap.flyTo([this.auPairDetails.currentLong, this.auPairDetails.currentLong], 8);
    this.leafletMap.setView(new L.LatLng(this.auPairDetails.currentLat, this.auPairDetails.currentLong), 14, { animation: true });
  }

}
