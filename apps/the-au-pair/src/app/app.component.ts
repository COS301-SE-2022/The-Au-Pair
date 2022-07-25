import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'the-au-pair-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public httpClient : HttpClient) {}

  ngOnInit(): void {
    const  requestHeaders = new HttpHeaders().set('Authorization', 'key=AAAAlhtqIdQ:APA91bFlcYmdaqt5D_jodyiVQG8B1mkca2xGh6XKeMuTGtxQ6XKhSY0rdLnc0WrXDsV99grFamp3k0EVHRUJmUG9ULcxf-VSITFgwwaeNvrUq48q0Hn1GLxmZ3GBAYdCBzPFIRdbMxi9');


    const postData = {
      "to":"cpCzpEgxS-a499oPCvLMen:APA91bFT5p3bJFyl4wVQw4TBs5WShA0jPhZTZrRtzlYjpo5SwlilkhER0LPQjB_ySMYaxiREpuEVuqiUZsIoBg-__zveSXUgS_ouwWFal3GzfNcYg47MDnJSlGpaZBqHjRkvFbH0i1Gb",
      "notification":{
        "title":"Order #44",
        "body": "Hello bro"
      }
    }
    
    const hour = 15;
    const mins = 15;
    const day = 1;

    const intv = setInterval( () => {
      const current = new Date();
      console.log("checking");
      if ( current.getHours() == hour && current.getMinutes() == mins && current.getDay() == day ) {
        console.log("sending");
        this.httpClient.post('https://fcm.googleapis.com/fcm/send',postData, {headers: requestHeaders}).subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        });
        clearInterval(intv);
      }
  
    }, 1000);
  }
  
}
