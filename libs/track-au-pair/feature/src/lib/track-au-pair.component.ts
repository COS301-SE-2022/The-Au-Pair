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

  ngOnInit(): void {
    this.loadLeafletMap();
    this.getUserDetails();
    this.
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
      minZoom: 10,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(this.leafletMap);

    //Create 5 random jitteries and add them to the map

    // L.marker([-26, 28], {icon:
    //   new L.Icon({iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'})}).addTo(this.leafletMap);

    // const jittery = Array(5).fill(this.centroid).map(
    //   x => [x[0] + (Math.random() - 0.5)/10, x[1] + (Math.random() - 0.5)/10]
    // ).map(
    //   x =>L.marker(x as L.LatLngExpression, {icon:
    //     new L.Icon({iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'})})
    // ).forEach(
    //     x => x.addTo(this.leafletMap)
    // );
  }

  async getUserDetails()
  {
    /* Find logged in user's au pair */
    await this.serv.getParent("7542108615984").subscribe(
      res=>{
        this.parentDetails.auPair = res.auPair;       
      },
      error=>{console.log("Error has occured with API: " + error);}
    )

    /* Get the onShift and current coords of the employed au pair  */
    await this.serv.getAuPair(this.parentDetails.auPair).subscribe(
      res=>{
        this.auPairDetails.id = res.id;
        this.auPairDetails.onShift = res.onShift;
        this.auPairDetails.currentLong = res.currentLong;
        this.auPairDetails.currentLat = res.currentLat;
      },
      error=>{console.log("Error has occured with API: " + error);}
    )
  };

}
