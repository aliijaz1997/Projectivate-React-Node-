import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebase from 'firebase-admin';
import { EnvironmentVariables } from 'src/config/environment-variables';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private defaultApp: firebase.app.App;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async onModuleInit() {
    if (!firebase.apps.length) {
      this.defaultApp = firebase.initializeApp({
        credential: firebase.credential.cert(
          JSON.parse(this.configService.get('FIREBASE_SERVICE_ACCOUNT_KEY')),
        ),
        databaseURL: this.configService.get('FIRESTORE_DATABASE_URL'),
      });
    } else {
      this.defaultApp = firebase.apps[0];
    }
  }

  get firebase() {
    return this.defaultApp;
  }
}
