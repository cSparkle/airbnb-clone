import { Component, OnInit, OnDestroy } from "@angular/core";
import { BookingService } from "./booking.service";
import Booking from "./booking.model";
import { IonItemSliding, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingsSub: Subscription;
  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingsSub = this.bookingService.bookings.subscribe((bookings) => {
      this.loadedBookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: "Cancelling...",
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingElement.dismiss();
        });
      });
  }
}
