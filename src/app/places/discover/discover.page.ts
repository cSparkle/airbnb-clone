import { Component, OnInit } from "@angular/core";
import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { SegmentChangeEventDetail } from "@ionic/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.fetchPlaces();
  }

  ionViewWillEnter() {
    this.fetchPlaces();
  }

  fetchPlaces() {
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
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
