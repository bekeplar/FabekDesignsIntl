# FabekDesigns | E-commerce react app

Simple ecommerce react js app with firebase.


## Install Dependencies

```sh
npm install
```

### Create a new firebase project

Login into your google account and create a new firebase project [here](https://console.firebase.google.com/u/0/)

Create a `.env.prod` file for production and `.env.dev`for development in the root of your project folder
and add the following configuration details. It can be found on your firebase project.

<!-- ```
SAMPLE CONFIG, you should put the actual config details found on your project settings

FIREBASE_API_KEY=AIzaKJgkjhSdfSgkjhdkKJdkjowf
FIREBASE_AUTH_DOMAIN=yourauthdomin.firebaseapp.com
FIREBASE_DB_URL=https://yourdburl.firebaseio.com
FIREBASE_PROJECT_ID=yourproject-id
FIREBASE_STORAGE_BUCKET=yourstoragebucket.appspot.com
FIREBASE_MSG_SENDER_ID=43597918523958
FIREBASE_APP_ID=234598789798798fg3-034

``` -->

After setting up necessary configuration,
create a **Database** and choose **Cloud Firestore** and start in test mode

### Run development server

```sh
npm run dev-server
```

### Build the project

```sh
npm run build
```

### How to add products or perform CRUD operations for Admin

1. Inside `src/routers/AppRouter.js` uncomment all code related to admin.
2. Inside `src/reducers/authReducer.js`, uncomment initState and change the initState type value from 'client' to 'admin'. Delete `initState` variable if you want to authenticate client.
3. Inside `src/sagas/authSaga.js`, on `case ON_AUTHSTATE_FAIL`, comment out `yield put(signOutSuccess())`.
4. Create a *Storage* in your Firebase Console.
5. Set Storage and Database Rule to public, change `allow read, write: if request.auth != null;` to only `allow read, write;` 
6. Delete persisting auth state in localStorage if one exists.
**Revert on doing all these if you want to switch back to default user and when you are deploying the app**

### Features

* Admin CRUD operations
* Firebase authentication
* Firebase auth provider authentication
* Account creation and edit
