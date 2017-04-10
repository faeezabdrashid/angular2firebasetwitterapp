import {Component, OnInit, Input} from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {Tweet} from "../../models/tweet.model";
import * as firebase from 'firebase';
import {AuthProfile} from "../../models/auth-profile.model";

@Component({
	selector: 'tweets',
	templateUrl: './tweets.component.html',
	styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {


	tweets: FirebaseListObservable<any[]>;

	private newTweet: Tweet = new Tweet();

	private userId: string;
	private profile: AuthProfile = new AuthProfile();

	@Input() sortBy: string;

	private submitted: boolean = false;
	private errorMesage: string;

	constructor(public af: AngularFire) {

		this.tweets = this.af.database.list('/tweets');


		this.af.auth.subscribe(auth => {
			this.getAuthProfile(auth);
			if (auth) {
				this.userId = auth.uid;

			} else {

				this.userId = null;

			}
		});

	}

	getAuthProfile(auth: any) {
		if (auth) {
			this.profile.id = auth.uid;
			this.profile.displayName = auth.auth.displayName;
			this.profile.photoURL = auth.auth.photoURL;
			this.profile.email = auth.auth.email;
		} else {

			this.profile = new AuthProfile();
		}


	}

	ngOnInit() {


	}

	createTweet() {


		if (this.newTweet.message) {
			this.newTweet.created = firebase.database.ServerValue.TIMESTAMP;


			this.newTweet.user = this.profile;


			this.newTweet.userId = this.userId ? this.userId : "everyone";
			console.log("New tweet with object:", this.newTweet);


			this.submitted = true;

			this.tweets.push(this.newTweet).then((success) => {

				console.log("Successful created tweet: ", success);

				this.submitted = false;
				this.newTweet = new Tweet();
				this.errorMesage = null;


			}).catch(error => {

				console.log("An error creating your tweet: ", error);
				this.submitted = false;
				this.errorMesage = error.message;

			});
		}


	}

}
