// location.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations = [
    { name: 'Vetapalem', symbol: '🕌' },
    { name: 'Chirala', symbol: '🌃' },
    { name: 'Gudivada', symbol: '🎡' },
    { name: 'vijayawada', symbol: '🏙️' },
    { name: 'Guntur', symbol: '🏰' },
    { name: 'Machilipatnam', symbol: '🕌' },
    { name: 'Hyderabad', symbol: '🏜️' },
    { name: 'Bengaluru', symbol: '🏞️' },
    { name: 'Varanasi', symbol: '🛕' },
    // Add more locations and their symbols as needed
  ];

  getLocations(): { name: string, symbol: string }[] {
    return this.locations;
  }
}

