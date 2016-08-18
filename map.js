// Legend Click Events

$('#nav .buildingLink').click(function(){

    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    if (lat != '' && lon != '') {
        findMapItem(lat,lon,$(this));
    }


});




//Functions

function findMapItem(lat,lon,$this) {

    //map.setZoom(18);

    var buildingLoc = new google.maps.LatLng(lat,lon);
    map.panTo( buildingLoc );

    //removeAllMarkers();

    if (!buildingMarker ) {

        buildingMarkerIcon = {
            url: 'i/marker-location.png',
            scaledSize: new google.maps.Size(55,55)
        }

        // add new marker
        buildingMarker = new google.maps.Marker({
            map: map,
            position: buildingLoc,
            clickable: false,
            icon: buildingMarkerIcon,
            animation: google.maps.Animation.DROP,
            //title: ,
            optimized: false
        });

    } else {
        // just move the existing icon
        buildingMarker.setPosition(buildingLoc);
        buildingMarker.setMap(map);

    }

    //buildingMarkers.push(buildingMarker);

    // do the popup window
    popupWindow(
        $this.find('.featureTitle').text(),
        $this.find('.itemDescription').html(),
        lat,
        lon
    );

}

function getMarkerIcon(mtype,path) {

    path = (typeof path == 'undefined') ? '' : path;

    switch (mtype) {
        case 'handicapped parking' :
            return {
                url: path+'i/handicapped-icon_5.png',
                scaledSize: new google.maps.Size(20,20)
            };
            break;
        case 'emergency phone' :
            return {
                url: path+'i/emergency-phone-icon_sq_lg6.png',
                scaledSize: new google.maps.Size(15,15)
            };
            break;
        case 'aed' :
            return {
                url: path+'i/aed-icon2.png',
                scaledSize: new google.maps.Size(20,20)
            };
            break;
        case 'notification' :
            return {
                url: path+'i/info-icon.png',
                scaledSize: new google.maps.Size(20,20)
            };
            break;
        case 'you-are-here' :
            return {
                url: path+'i/marker-youarehere_blue.png',
                scaledSize: new google.maps.Size(45,45),
                anchor: new google.maps.Point(18,18)
            }
            break;
        default :
            return {
                url: 'http://www.champlain.edu/Images/Admin/icons/map-icon.png',
                scaledSize: new google.maps.Size(55,55)
            }
    }
}


//Extras




//////////////////////////////////////////////
/*
*
*
* BEGIN the map settings
*
*
*
* ////////////////////////////////////////////
* */

var map;
var buildingIcon;
var campusCenter = new google.maps.LatLng(44.474907,-73.203771);
var champlainCollegeLabel;


var mapStyles = [
    {
        featureType: 'administrative',
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: 'landscape',
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: 'poi',
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: 'water',
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: 'transit',
        elementType: "labels",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {visibility: "off"}

        ]
    }
];




//Initialize the map
function initialize() {
    var mapOptions = {
        center: campusCenter,
        zoom: 17,
        styles: mapStyles,
        streetViewControl: false
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //var mapLabel = new MapLabel({
    //    map: map,
    //    fontSize: 16,
    //    text: "Champlain College"
    //});
    //mapLabel.set('position', campusCenter);

    for (key in allBuildings){
        try {
            var object = allBuildings[key];

            var label = new Label({
                map: map
            });
            label.set('position', new google.maps.LatLng(object.lat, object.lng));
            label.set('text', object.name);
            label.set('visible', true);
            label.set('zIndex',25);
            label.set('fontSize',9);
            label.set('strokeWeight',6);
            label.set('align','right');
            label.set('fontFamily','Times New Roman');

            jQuery(label.span_).addClass('mapLabel');

        } catch(e){
            console.log('ERRORRR!:' + e);
        }



    }// end for ... in


    var schillhammer = [
        {lng:-73.2027995, lat: 44.4730199},
        {lng:-73.2028015, lat: 44.4729864},
        {lng:-73.2027928, lat: 44.4729414},
        {lng:-73.2027197, lat:44.4729424 },
        {lng:-73.2027183, lat: 44.472929},
        {lng:-73.2026392, lat: 44.4729314},
        {lng:-73.2026406, lat:44.4729376 },
        {lng:-73.2026184, lat: 44.4729376},
        {lng: -73.2026151, lat: 44.4729275},
        {lng:-73.2026003, lat: 44.4729175},
        {lng:-73.2025802, lat: 44.4729098},
        {lng:-73.2025594, lat:44.4729103 },
        {lng: -73.202538, lat:44.472918 },
        {lng: -73.2025239,lat: 44.4729285},
        {lng:-73.2025158, lat:44.4729414 },
        {lng:-73.2025158, lat: 44.4729582},
        {lng: -73.2025246, lat:44.4729649 },
        {lng:-73.2025272, lat:44.4730304 },
        {lng:-73.2026453, lat:44.4730285 },
        {lng: -73.2026466, lat:44.47304 },
        {lng:-73.2026721, lat: 44.4730385},
        {lng: -73.2026754, lat:44.4730433 },
        {lng:-73.2027338, lat: 44.4730409},
        {lng: -73.2027338,lat: 44.4730213},
        {lng: -73.2027995, lat: 44.4730199}
    ];


    var buildingPoly = [
        {lat: 44.4734395, lng: -73.2048105},
        {lat: 44.4733663, lng:-73.2048105 },
        {lat: 44.4733639, lng: -73.2048534},
        {lat: 44.4732515, lng: -73.2048467},
        {lat: 44.4732553, lng: -73.2046811},
        {lat: 44.4733204, lng: -73.2046824},
        {lat: 44.4733209, lng: -73.2046442},
        {lat: 44.4733615, lng: -73.2046462},
        {lat: 44.4733615, lng: -73.2046341},
        {lat: 44.4733831, lng: -73.2046368},
        {lat: 44.4733826, lng: -73.2046462},
        {lat: 44.4734008, lng: -73.2046435},
        {lat: 44.4734008, lng: -73.204618},
        {lat: 44.4734433, lng: -73.2046247},
        {lat:44.4734395 , lng: -73.2048105}
    ];

    var cushingPoly = new google.maps.Polygon({
        paths: buildingPoly,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        strokeColor: '#FF0000',
        strokeOpacity:.035

    });

    var shillPoly = new google.maps.Polygon({
        paths: schillhammer,
        fillColor: 'blue',
        fillOpacity: 0.35,
        strokeColor: '#FF0000',
        strokeOpacity:.035

    });

    shillPoly.setMap(map);

    function noShilly(){

    }

}

google.maps.event.addDomListener(window, 'load', initialize);
