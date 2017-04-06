import {Component} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {MdDialog} from "@angular/material";
import {LoginComponent} from "./users/login/login.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';


	items: FirebaseListObservable<any[]>;

	userId: string;

	constructor(private dialog: MdDialog, private af: AngularFire) {
		this.items = af.database.list('/tweets');

		this.af.auth.subscribe(auth => {

			this.userId = auth ? auth.uid : null;


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
