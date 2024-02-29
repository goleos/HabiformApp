# Habiform

[![EAS Build and Submit](https://github.com/goleos/HabitApplication/actions/workflows/submit_ios_app.yml/badge.svg)](https://github.com/goleos/HabitApplication/actions/workflows/submit_ios_app.yml)

![HabiformLogo](AppLogo.png)


<a href="https://apps.apple.com/us/app/habiform/id6471245234?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 230px; height: 63px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1708214400" alt="Download on the App Store" style="border-radius: 13px; width: 230px; height: 63px;"></a>

Habiform is an iOS app that aims to help with forming habits by relying on the published habit literature.

## Installation instructions

The app is now avalaible on the [App Store](https://apps.apple.com/us/app/habiform/id6471245234?itsct=apps_box_link&itscg=30200). To run it locally:

1. Make sure you have [Node JS and npm](https://nodejs.org/en/download) installed

2. Install Expo CLI ([documentation](https://docs.expo.dev/more/expo-cli/#installation))
   
   ```shell
    npm install expo-cli
   ```

3. Install all the project's dependencies with

   ```shell
   npm install
   ```

4. On a physical iOS device, install the [Expo Go app](https://itunes.apple.com/app/apple-store/id982107779) from the app store

5. In the root of the repository, run the following command to start the development server
    ```shell
   expo start
   ```
   This should display a QR code. Scan it with the Camera app on the device, click on the link from the QR code ([documentation](https://docs.expo.dev/more/expo-cli/#develop)).

6. The app will launch within the Expo Go App.
