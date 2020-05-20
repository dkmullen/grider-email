import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: ':id', component: EmailShowComponent }, // will show inbox/any-wildcard
      { path: '', component: PlaceholderComponent } // will show inbox/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
