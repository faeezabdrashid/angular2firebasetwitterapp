import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AngularFire} from "angularfire2";
import {MdDialogRef} from "@angular/material";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	message: string;
	user: User = new User();

	constructor(private af: AngularFire, private dialogRef: MdDialogRef<RegisterComponent>) {


		this.af.auth.subscribe(auth => {

			if (auth) {

				this.dialogRef.close();

				let userId = auth.uid;

				const user = this.af.database.object('/users/' + userId);

				let userData = {
					firstName: this.user.firstName,
					lastName: this.user.lastName,
					avatar: this.user.avatar
				};

				user.set(userData);
			}

		});

	}

	ngOnInit() {


	}


	onRegister() {


		let data = {
			email: this.user.email,
			password: this.user.password
		};

		this.af.auth.createUser(data);
	}
}
