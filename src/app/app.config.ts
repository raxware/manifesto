import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"manifesto-268c5","appId":"1:167271764279:web:a156eaed7b7723d6d58ab2","storageBucket":"manifesto-268c5.appspot.com","apiKey":"AIzaSyB8ISzWHB4YBy6S4QX6apmeal6tpdI6q4E","authDomain":"manifesto-268c5.firebaseapp.com","messagingSenderId":"167271764279","measurementId":"G-XVJEEQW56C"})), provideAuth(() => getAuth())]
};
