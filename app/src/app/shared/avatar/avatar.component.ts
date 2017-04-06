import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFire} from "angularfire2";

@Component({
	selector: 'avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

	userId: string;

	@Output() onFileSelect: EventEmitter<any> = new EventEmitter<any>();

	constructor(private af: AngularFire) {

		this.af.auth.subscribe(auth => {

			this.userId = auth ? auth.uid : null;

		});
	}

	ngOnInit() {


	}

	handleUpload(e: any, input: any): void {

		this.onFileSelect.emit(input.files[0]);


	}

}
