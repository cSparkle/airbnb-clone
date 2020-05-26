import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the heart of NYC",
      "../../assets/images/nyc_mansion.jpg",
      489.99,
      new Date("2020-06-01"),
      new Date("2020-06-03"),
      "abc"
    ),
    new Place(
      "p2",
      "L'Amour Toujour",
      "A romantic hideaway in Paris",
      "../../assets/images/paris.jpeg",
      349.99,
      new Date("2020-06-01"),
      new Date("2020-06-03"),
      "abc"
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not your average hotel room!",
      "../../assets/images/fairy_cottage.jpg",
      149.99,
      new Date("2020-06-01"),
      new Date("2020-06-03"),
      "abc"
    ),
  ];

  // we do this so we can't directly edit the _places array
  // from anywhere else where we might access the _places array
  get places() {
    console.log("places in get places: ", this._places);
    return [...this._places];
  }
  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return { ...this._places.find((place) => place.id === id) };
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "../../assets/images/fairy_cottage.jpg",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    this._places.push(newPlace);
    console.log("places: ", this._places);
  }
}
