import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {
  isLoading = false
  bookings: any[] = []
  today = new Date();

  constructor(private http:HttpClient){
    const userId = localStorage.getItem('userId')
    this.isLoading = true
    this.http.get<any[]>(`http://localhost:5100/bookings/user/${userId}`).subscribe((res) => {
      this.bookings = res
      console.log(res)
      this.isLoading = false
    })
  }

  isDateBeforeToday(journeyDate: string): boolean {
    const today = new Date();
    const journey = new Date(journeyDate);
    return journey < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  onCancleTicket(bookingId: string) {
    this.isLoading = true;
  
    // Send HTTP DELETE request to delete the booked ticket
    this.http.delete(`http://localhost:5100/bookings/${bookingId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the DELETE request error here
        console.error('Error:', error);
        if (error.status === 404) {
          // Display a user-friendly message when booking is not found
          // You can use a notification service or a dialog to show the message
          alert('Booking not found. It might have already been canceled.');
        } else {
          // Display a generic error message for other errors
          alert('Failed to cancel the booking. Please try again later.');
        }
        return throwError('Failed to delete the booking.');
      })
    ).subscribe(() => {
      // After successful deletion, fetch updated bookings for the user
      const userId = localStorage.getItem('userId');
      this.http.get<any[]>(`http://localhost:5100/bookings/user/${userId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle the GET request error here
          console.error('Error:', error);
          return throwError('Failed to fetch updated bookings.');
        })
      ).subscribe((res) => {
        this.bookings = res;
        this.isLoading = false;
      });
    });
  }
}  
