import { Injectable } from "@angular/core";
import Booking from "./booking.model";

@Injectable({ providedIn: "root" })
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: "osding",
      placeId: "p1",
      placeTitle: "Manhattan Mansion",
      guestNumber: 2,
      userId: "sodign",
    },
  ];

  get bookings() {
    return [...this._bookings];
  }
}
