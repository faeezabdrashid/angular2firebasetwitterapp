import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import 'hammerjs';
import {AngularFireModule} from 'angularfire2';


export const firebaseConfig = {
	apiKey: ' AIzaSyAaJK3nMtjvUBHRE3H3oLKhiaFAmIdckTY ',
	authDomain: 'angularfire-e02eb.firebaseapp.com',
	databaseURL: 'https://angularfire-e02eb.firebaseio.com',
	storageBucket: 'angularfire-e02eb.appspot.com',
	messagingSenderId: '365059843606'
};


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		AngularFireModule.initializeApp(firebaseConfig)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
