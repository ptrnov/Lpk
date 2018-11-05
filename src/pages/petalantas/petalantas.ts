import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { defaultNewStyle } from './mapStyle';

declare var google;
var map: any;

@IonicPage()
@Component({
  selector: 'page-petalantas',
  templateUrl: 'petalantas.html',
})
export class PetalantasPage {

  public _defaultNewStyle=defaultNewStyle;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}


  ngOnInit() {
    setTimeout(() => {
      this.initMap();
    }, 100);
    setTimeout(() => {
      this.updatemap();
    }, 200);
  }

  /**
   * Reff: https://developers.google.com/maps/documentation/javascript/trafficlayer#traffic_layer
   */
  private initMap(){
    var ambilPosisi= new google.maps.LatLng(-6.239179,106.645725);
    var circleStrokeColor="rgb(243, 9, 9)";
    var circleFillColor="#449af0";
    var mapOptions={
      zoom: 14,
      // center: new google.maps.LatLng(-2.209764,117.114258),
      // center: new google.maps.LatLng(-6.239179,106.645725),
      center: ambilPosisi,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
      },
      // styles: this._defaultNewStyle,
      scrollwheel: true,
    };
    map = new google.maps.Map(document.getElementById("map"),mapOptions);
    // map1 = new google.maps.Map(this.mapElement2.nativeElement,mapOptions);
    var trafficLayer = new google.maps.TrafficLayer();

     // SET PEROPERTIES CIRCLE
    // var cirMarker =  new google.maps.Circle({
    //   center: ambilPosisi,
    //   // radius: 10000,
    //   strokeColor: circleStrokeColor,
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor:circleFillColor,
    //   fillOpacity: 1
    //   // infowindow: myInfoWindow
    // });

    var styledMapType = new google.maps.StyledMapType(
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
    ],
    {name: 'Styled Map'}
  );

    var marker = new google.maps.Marker({
      position: ambilPosisi,
      map: map,
      title: 'Hello World!'
    });
    marker.setMap(map);
    trafficLayer.setMap(map);
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

  }

  private updatemap(){
    // var ambilPosisi;
    // ambilPosisi =  new google.maps.LatLng(-6.239179,106.645725);
    // var trafficLayer = new google.maps.TrafficLayer({
    //   zoom: 13,
    //   center: ambilPosisi,
    //   radius: 10000,
    // });
    // trafficLayer.setMap(map);
  }
}
