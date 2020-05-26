import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Place } from "src/app/places/place.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-booking",
  templateUrl: "./create-booking.component.html",
  styleUrls: ["./create-booking.component.scss"],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: "select" | "random";
  @ViewChild("bookingForm") bookingForm: NgForm;
  startDate: string;
  endDate: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // this logic is just stupid
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === "random") {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            ((availableTo.getTime() - 7 * 24 * 60 * 60) &
              (1000 - availableFrom.getTime()))
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onClickBook() {
    if (!this.bookingForm.valid || !this.datesValid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.bookingForm.value["first-name"],
          lastName: this.bookingForm.value["last-name"],
          guestNumber: +this.bookingForm.value["guest-number"],
          dateFrom: new Date(this.bookingForm.value["date-from"]),
          dateTo: new Date(this.bookingForm.value["date-to"]),
        },
      },
      "confirm"
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  datesValid() {
    console.log("form: ", this.bookingForm);
    const startDate = new Date(this.bookingForm.value["date-from"]);
    const endDate = new Date(this.bookingForm.value["date-to"]);
    return endDate > startDate;
  }
}
