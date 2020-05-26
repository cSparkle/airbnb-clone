import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { delay, map, take, tap } from "rxjs/operators";

import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
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
  ]);

  // we do this so we can't directly edit the _places array
  // from anywhere else where we might access the _places array
  get places() {
    return this._places.asObservable();
  }
  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((place) => place.id === id) };
      })
    );
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

    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  editPlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex(
          (place) => place.id === placeId
        );
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
