import { Component, OnInit , ViewChild,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/location.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAdmin = false
  adminToken = false
  passengerToken= false
  ownerToken = false

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  @ViewChild('searchForm') searchForm!: NgForm; 
  showPopup = false;
  locations: { name: string; symbol: string }[] = [];
  selectedLocation: string = 'Select Location';
  constructor(private route: Router,private locationService: LocationService) {
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      this.adminToken = true
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.passengerToken = true
    }
    const agentToken = localStorage.getItem("ownerToken")
    if (agentToken) {
      this.ownerToken = true
    }
    
  }
  ngOnInit(): void {
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      this.adminToken = true
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.passengerToken = true
    }
    const agentToken = localStorage.getItem("ownerToken")
    if (agentToken) {
      this.ownerToken = true
    }
    this.locations = this.locationService.getLocations();
  }

  onLogout() {
    localStorage.clear()
    window.alert("Logout Successful!")
    this.ngOnInit()
    this.route.navigate(['/'])
    this.adminToken = false
    this.passengerToken= false
    this.ownerToken = false
  }
  searchQuery: string = ''; 
  onSubmit() {
    if (this.searchQuery.trim() === '') {
      // If the search query is empty, redirect to the desired page (e.g., 'another-page')
      this.route.navigateByUrl('/login');
    } else {
      // Handle the search query data or any other logic here
      this.route.navigateByUrl('/login');
    }

    // Clear the search box value after form submission
    this.searchQuery = '';
    this.searchForm.resetForm();
  }
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  showLocationsPopup() {
    this.showPopup = !this.showPopup;
  }

  selectLocation(location: { name: string; symbol: string }) {
    // Update the selected location text when a location is selected
    this.selectedLocation = location.name;
    this.showPopup = false; // Close the popup after selecting a location
  }
}