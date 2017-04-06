import {Component} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {MdDialog} from "@angular/material";
import {LoginComponent} from "./users/login/login.component";
import {AuthProfile} from "./models/auth-profile.model";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';


	items: FirebaseListObservable<any[]>;

	userId: string;

	authProfile: AuthProfile = new AuthProfile();

	constructor(private dialog: MdDialog, private af: AngularFire) {
		this.items = af.database.list('/tweets');

		this.af.auth.subscribe(auth => {

			console.log("Auth: ", auth);
			this.userId = auth ? auth.uid : null;

			if (auth) {
				this.authProfile.userId = auth.uid;
				this.authProfile.displayName = auth.auth.displayName;
				this.authProfile.photoURL = auth.auth.photoURL;
				this.authProfile.email = auth.auth.email;
			}

		});

	}


	login() {
		this.dialog.open(LoginComponent, {
			width: '500px'
		});

	}

	logout() {

		this.af.auth.logout();
	}
}
