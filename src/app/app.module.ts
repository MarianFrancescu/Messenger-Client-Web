import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { NavbarProfileComponent } from './components/navbar-profile/navbar-profile.component';
import { GroupsComponent } from './components/groups/groups.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MessageAreaComponent } from './components/message-area/message-area.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { rxStompConfig } from './configs/rx-stomp-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    ProfileDisplayComponent,
    NavbarProfileComponent,
    GroupsComponent,
    ProfileDisplayComponent,
    MessengerComponent,
    MessageAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'messenger', component: MessengerComponent }
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
