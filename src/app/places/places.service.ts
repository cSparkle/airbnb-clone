import { Injectable } from "@angular/core";
import { Place } from "./place.model";

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
      new Date("2020-06-03")
    ),
    new Place(
      "p2",
      "L'Amour Toujour",
      "A romantic hideaway in Paris",
      "../../assets/images/paris.jpeg",
      349.99,
      new Date("2020-06-01"),
      new Date("2020-06-03")
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not your average hotel room!",
      "../../assets/images/fairy_cottage.jpg",
      149.99,
      new Date("2020-06-01"),
      new Date("2020-06-03")
    ),
  ];

  // we do this so we can't directly edit the _places array
  // from anywhere else where we might access the _places array
  get places() {
    return [...this._places];
  }
  constructor() {}

  getPlace(id: string) {
    return { ...this._places.find((place) => place.id === id) };
  }
}
