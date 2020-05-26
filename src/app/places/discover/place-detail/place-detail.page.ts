import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
} from "@ionic/angular";

import { PlacesService } from "../../places.service";
import { Place } from "../../place.model";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { BookingService } from "src/app/bookings/booking.service";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/discover");
        return;
      }

      this.placeSub = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe((place) => {
          this.place = place;
        });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: "Choose an action",
        buttons: [
          {
            text: "Select Date",
            handler: () => {
              this.openBookingModal("select");
            },
          },
          {
            text: "Random Date",
            handler: () => {
              this.openBookingModal("random");
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      })
      .then((actionSheet) => {
        actionSheet.present();
      });
  }

  openBookingModal(mode: "select" | "random") {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === "confirm") {
          this.loadingCtrl
            .create({
              message: "Booking place...",
            })
            .then((loadingElement) => {
              loadingElement.present();
              const bookingData = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  bookingData.firstName,
                  bookingData.lastName,
                  bookingData.guestNumber,
                  bookingData.dateFrom,
                  bookingData.dateTo
                )
                .subscribe(() => {
                  loadingElement.dismiss();
                });
            });
        }
      });
  }
}
