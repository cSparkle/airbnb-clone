import { Component, OnInit } from "@angular/core";
import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
  }

  // leaving this here to show that you can access the menu controller to get all kinds of details about
  // the menus in an app as well as perform operations
  // onOpenMenu() {
  //   this.menuCtrl.toggle();
  // }
}
