import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

  @Input() coords: string = '';
  @ViewChild('mapa',{static: true}) mapa: any;
  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);


    mapboxgl.accessToken = 'pk.eyJ1IjoiYnltYW51ZWwxMTgiLCJhIjoiY2tzc3NxbjM0MDdraTJxb2Z1ZmpyaWtxdiJ9.2kvNe7hS1QWkKn1AeECChQ';
    const map = new mapboxgl.Map({
    container: this.mapa.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
  }

}
