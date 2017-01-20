
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
var campusCenter = new google.maps.LatLng(44.474478,-73.20397);
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
            {visibility: "on"}

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

    // Create labels.

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



    }// end labels

    // start Polygons.

    console.log(allBuildings[0].category)

    var buildingPolys = [];
    //POLYGONS
    for (i=0;i<allBuildings.length;i++){
            var arr = [];
            var coords = allBuildings[i].poly;
            //console.log(coords.length)
            for (j=0;j<coords.length;j++) {
                var latitude = coords[j].lat;
                var longitude = coords[j].lng;

                arr.push(new google.maps.LatLng(
                    latitude,
                    longitude
                ));


            }

        buildingPolys.push(new google.maps.Polygon({
            paths: arr,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 0.1,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        }));

        console.log(buildingPolys[i].name);
        buildingPolys[buildingPolys.length-1].setMap(map);
    }


}

google.maps.event.addDomListener(window, 'load', initialize);