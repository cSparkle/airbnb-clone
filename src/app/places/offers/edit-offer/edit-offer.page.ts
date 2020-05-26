import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NavController, LoadingController } from "@ionic/angular";

import { PlacesService } from "../../places.service";
import { Place } from "../../place.model";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  editPlaceForm: FormGroup;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }

      this.placeSub = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe((place) => {
          this.place = place;
          this.editPlaceForm = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            description: new FormControl(this.place.description, {
              updateOn: "blur",
              validators: [Validators.required, Validators.maxLength(180)],
            }),
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onEditPlace() {
    if (!this.editPlaceForm.valid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: "Updating...",
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.placesService
          .editPlace(
            this.place.id,
            this.editPlaceForm.value.title,
            this.editPlaceForm.value.description
          )
          .subscribe(() => {
            loadingElement.dismiss();
            this.editPlaceForm.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }
}
