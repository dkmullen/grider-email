import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailResolverService } from './email-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      { 
        path: ':id',  // will show inbox/any-wildcard
        component: EmailShowComponent, 
        resolve: { // says that there is an object called email and its source is the resolverservice
          email: EmailResolverService 
        } 
      },
      { path: '', component: PlaceholderComponent } // will show inbox/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
