import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import 'hammerjs';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { AvatarComponent } from './shared/avatar/avatar.component';


export const firebaseConfig = {
	apiKey: ' AIzaSyAaJK3nMtjvUBHRE3H3oLKhiaFAmIdckTY ',
	authDomain: 'angularfire-e02eb.firebaseapp.com',
	databaseURL: 'https://angularfire-e02eb.firebaseio.com',
	storageBucket: 'angularfire-e02eb.appspot.com',
	messagingSenderId: '365059843606'
};

const fbAuthConfig = {
	provider: AuthProviders.Google,
	method: AuthMethods.Password
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		AvatarComponent
	],
	entryComponents: [LoginComponent, RegisterComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		AngularFireModule.initializeApp(firebaseConfig, fbAuthConfig)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
