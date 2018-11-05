````
ver 1.0.0

1. DEMO
#keytool -genkey -v -keystore lakalantas.keystore -alias lakalantas-keyalg RSA -keysize 2048 -validity 10000
pass: Sp1d3rm4n4
first * last name : piter novian
organizational: programmer
organizational name: cudo
City: tangerang
provincy: banten
cunty code : 62

#ionic cordova build android --release --prod

#jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore lakalantas.keystore E:/ionicProject/MP_Dashboard/lakalantas/platforms/android/build/outputs/apk/release/android-release-unsigned.apk lakalantas
1.
2. Geolocation
  #ionic cordova plugin add cordova-plugin-geolocation --variable 
  GEOLOCATION_USAGE_DESCRIPTION="To locate you"
  #npm install --save @ionic-native/geolocation

3. mock Gps
  #cordova plugin add https://github.com/tomloprod/cordova-plugin-fakelocation.git
  window.plugins.fakeLocation.check(function(IsEnabledMockLocations){
      console.log(IsEnabledMockLocations);
  });
  Reff: https://forum.ionicframework.com/t/detect-or-avoid-mock-gps-location/32406/2
4. Barcode Scaner
#ionic cordova plugin add phonegap-plugin-barcodescanner
#npm install --save @ionic-native/barcode-scanner

5. Action sheet
#ionic cordova plugin add cordova-plugin-actionsheet
#npm install --save @ionic-native/action-sheet
````

