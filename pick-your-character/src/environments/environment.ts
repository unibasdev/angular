// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {C} from "src/app/service/c";

export const environment = {
  production: false,
  daoStrategy: C.IN_MEMORY_DAO,
  firebase: {
    apiKey: 'AIzaSyCBePOJCLcPppnHDtu71LVH0XkRczf7Oc8',
    authDomain: 'pyc-pick-your-character.firebaseapp.com',
    databaseURL: 'https://pyc-pick-your-character.firebaseio.com',
    projectId: 'pyc-pick-your-character',
    storageBucket: 'pyc-pick-your-character.appspot.com',
    messagingSenderId: '1080263486709',
    appId: '1:1080263486709:web:b4cc70b553ce1451'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
