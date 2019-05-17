import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/providers/profile.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss']
})
export class NearbyPage implements OnInit {
  nearbyPeepsList: any;
  ImageUrl: string = '';
  constructor(private profileService: ProfileService, private storage: Storage) {}

  ngOnInit() {
    this.ImageUrl = environment.IMAGE_BASE_URL;
    this.searchNearbyPeeps();
  }

  searchNearbyPeeps() {
    this.storage.get("location").then(res => {
      console.log(res);
      this.profileService.searchNearby(res.latitude, res.longitude).subscribe(data => {
        this.nearbyPeepsList = data;
      });
    });
  }
}
