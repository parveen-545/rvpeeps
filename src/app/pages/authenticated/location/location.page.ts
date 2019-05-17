import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder, NativeGeocoderReverseResult,  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoder,   NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';

declare var google;
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss']
})
export class LocationPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private  storage: Storage
  ) {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.storage.set("location",  {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude});
          
        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

       // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        this.map.addListener('tilesloaded', () => {
          console.log('accuracy', this.map);
          //this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        });
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }

  // getAddressFromCoords(lattitude, longitude) {
  //   console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  //   };

  //   this.nativeGeocoder
  //     .reverseGeocode(lattitude, longitude, options)
  //     .then((result: NativeGeocoderReverseResult[]) => {
  //       this.address = '';
  //       let responseAddress = [];
  //       for (let [key, value] of Object.entries(result[0])) {
  //         debugger
  //         if (value)
  //         {
  //           responseAddress.push(value);
  //         }
  //       }
  //       responseAddress.reverse();
  //       for (let value of responseAddress) {
  //         this.address += value + ', ';
  //       }
  //       this.address = this.address.slice(0, -2);
  //     })
  //     .catch((error: any) => {
  //       this.address = 'Address Not Available!';
  //     });
  // }
}
