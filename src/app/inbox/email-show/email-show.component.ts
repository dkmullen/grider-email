import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    })
   }

  ngOnInit() {
    // console.log(this.route)
    // this.route.params.subscribe(({ id }) => {

    // // })
    // this.route.params.pipe(
    //   //switchmap cancels previous request, switches to a new observable
    //   // useful here because user may quickly click on one email, then another,
    //   // and we want only the most recent click, so we drop the others w/switchMap
    //   switchMap(( {id }) => { 
    //     return this.emailService.getEmail(id);
    //   })
    // )
    // .subscribe(email => {
    //   this.email = email;
    // })
  }

}
