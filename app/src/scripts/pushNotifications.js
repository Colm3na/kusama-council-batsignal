import * as Sentry from "@sentry/browser"
// import gql from "graphql-tag"
import { Plugins } from "@capacitor/core"
const { PushNotifications } = Plugins
import { FCM } from '@capacitor-community/fcm';
const fcm = new FCM();

const PushNotificationTokenKey = "push-notification-token"

export const registerForPushNotifications = async (store, router) => {
  // Request permission to use push notifications
  // iOS will prompt user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermission().then(async (result) => {
    if (result.granted) {
      // Register with Apple / Google to receive push via APNS/FCM
      console.log("User granted push notifications");
      PushNotifications.register();
      const fcmToken = await fcm.getToken();
      alert(JSON.stringify(fcmToken));
      console.log("Push Token:" + JSON.stringify(fcmToken));
    } else {
      // Show some error
      localStorage.setItem("push-notification-refused", true);
      console.log("User didn't accept push notifications");
    }
  })

  // Get FCM token instead the APN one returned by Capacitor
  // fcm
  //   .getToken()
  //   .then((r) => console.log(`Token ${r.token}`))
  //   .catch((err) => console.log(err));

  // On success, we should be able to receive notifications
  PushNotifications.addListener("registration", ({ value: token }) => {
    console.log("Push registration successful " + token);
    localStorage.setItem(PushNotificationTokenKey, token);
    store.dispatch("updatePushRegistrations");
  })

  // Some issue with our setup and push will not work
  PushNotifications.addListener("registrationError", (error) => {
    Sentry.captureException(error);
    console.error(
      "Error occurred during permission request for push notifications",
      error
    );
    alert("Error on push notification registration: " + JSON.stringify(error));
  })

  /* Leaving following code in as a reference but not needed for now */
  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
      alert('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    ({ notification }) => {
      console.log(`Notification arrived: ${notification.data}`);
      const link = notification.data.link;
      router.push(link);
    }
  )
}

export const updatePushNotificationRegistration = async (
  addressObjects,
  apollo
) => {
  // TODO check if the token is already available
  const pushToken = localStorage.getItem(PushNotificationTokenKey);
  if (!pushToken) return;
  try {
    await registerDevice(pushToken, addressObjects, apollo);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
}

const registerDevice = async (pushToken) => {
    console.log(`Device with token ${pushToken} was successfully registered`);
//   await apollo
//     .mutate({
//       mutation: gql`
//         mutation($pushToken: String!, $addressObjects: [NotificationInput]!) {
//           notifications(
//             pushToken: $pushToken
//             addressObjects: $addressObjects
//             notificationType: "push"
//           )
//         }
//       `,
//       variables: {
//         pushToken,
//         addressObjects,
//       },
//     })
//     .catch((error) => {
//       console.error("ERROR" + error.message);
//     })
}
