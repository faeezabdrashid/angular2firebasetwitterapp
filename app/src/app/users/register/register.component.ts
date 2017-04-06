import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AngularFire, AngularFireAuth} from "angularfire2";
import {MdDialogRef} from "@angular/material";
import * as firebase from "firebase";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	message: string;
	user: User = new User();
	profileFile: any;
	userId: string;

	constructor(private af: AngularFire, private dialogRef: MdDialogRef<RegisterComponent>) {


		this.af.auth.subscribe(auth => {

			if (auth) {

				this.dialogRef.close();

				let userId = auth.uid;
				this.userId = auth.uid;


				let userData = this.user;

				delete userData.password;

				userData.created = firebase.database.ServerValue.TIMESTAMP;


				/// that mean user created successful. now we do upload profile image.

				this.createUserWithObject(userData, auth);


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


	onSelectProfileImage(file) {

		this.profileFile = file;

	}

	createUserWithObject(data: User, auth: any) {

		let file = this.profileFile;
		let userId = auth.uid;
		const user = this.af.database.object('/users/' + userId);

		if (file) {


			const storageRef = firebase.storage().ref('/profiles').child(userId).child(file.name);


			storageRef.put(file).then(snapshot => {

				console.log("FIle has been uploaded with URL: ", snapshot.downloadURL);

				data.avatar = snapshot.downloadURL;
				user.set(data);



				// do update auth data

				let profileData = {displayName: data.firstName + " " + data.lastName, photoURL: data.avatar};

				auth.auth.updateProfile(profileData).then(_ => {

					console.log("Auth profile data has been updated.");
				}).catch(err => {

					console.log("An error updating auth profile ", err);

				});

			}).catch(err => {
				console.log("An error uppload the profile image ", err);
			});


		} else {

			user.set(data);
		}


	}
}
