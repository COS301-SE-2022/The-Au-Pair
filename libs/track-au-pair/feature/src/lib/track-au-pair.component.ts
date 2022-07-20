import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'

@Component({
  selector: 'the-au-pair-track-au-pair',
  templateUrl: './track-au-pair.component.html',
  styleUrls: ['./track-au-pair.component.scss'],
})
export class TrackAuPairComponent implements OnInit {
  leafletMap : any;
  // private map : L.Map = new  L.Map('leafletMap');
  private centroid : L.LatLngExpression = [42.3601, -71.0589]; //Boston
  lat = 42.3601;
  long = -71.0589;
  zoom = 8;


  constructor() {
    // this.map = L.map('map',{
    //   center : this.centroid,
    //   zoom : 12
    // })
  }

  ngOnInit(): void {
    this.loadLeafletMap();
  }

  loadLeafletMap() {

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
      const jittery = Array(5).fill(this.centroid).map(
        x => [x[0] + (Math.random() - 0.5)/10, x[1] + (Math.random() - 0.5)/10]
      ).map(
        x =>L.marker(x as L.LatLngExpression, {icon:
          new L.Icon({iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'})})
      ).forEach(
          x => x.addTo(this.leafletMap)
      );
    }

}
