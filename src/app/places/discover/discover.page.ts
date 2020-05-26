import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { SegmentChangeEventDetail } from "@ionic/core";
import { MenuController } from "@ionic/angular";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log("event: ", event.detail);
  }

  // leaving this here to show that you can access the menu controller to get all kinds of details about
  // the menus in an app as well as perform operations
  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }
}
