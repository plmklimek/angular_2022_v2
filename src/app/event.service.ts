import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  header = {
    headers: new HttpHeaders()
      .set('Authorization', `Basic ${localStorage.getItem("auth")}`)
  }
  getAll() {
    return this.http.get('http://localhost:8080/events', this.header);
  }

  getById(id: string) {
    return this.http.get('http://localhost:8080/events/' + id, this.header);
  }

  Accept(invitationId: string) {
    return this.http.post('http://localhost:8080/invitations/' + invitationId + '?status=ACCEPTED', {}, this.header);
  }

  Reject(invitationId: string) {
    return this.http.post('http://localhost:8080/invitations/' + invitationId + '?status=REJECTED', {}, this.header);
  }

  SendInvitation(userId: string, eventId: string) {
    return this.http.post('http://localhost:8080/invitations', { user_id: userId, event_id: eventId }, this.header);
  }

  Create(name: string) {
    return this.http.post('http://localhost:8080/events', { name: name }, this.header);
  }

  getInvitationsByEventId(id: string) {
    return this.http.get(`http://localhost:8080/event/${id}/invitations`, this.header);
  }
}
