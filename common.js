/*
 *
 *
 * Global Variables
 *
 * */


var buildingMarkers = [];
var buildingPolygons = [];
var allPolygons



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

function removeAllMarkers() {

    // hide all previous markers
    for(var i = 0; i < buildingMarkers.length; i++) {
        buildingMarkers[i].setMap(null);
    }
    buildingMarkers = [];
    buildingMarker.setMap(null);

}


// Legend Click Events

$('#nav .buildingLink').click(function(){

    var lat = $(this).data('lat');
    var lon = $(this).data('lon');
    if (lat != '' && lon != '') {
        findMapItem(lat,lon,$(this));
    }


});


/*////////////////////
 *
 *
 * Polygon Display options
 *
 *
 */////////////////////
var residencePolygonStyles = {
    fillOpacity: 0.7,
    fillColor: 'blue',
    strokeWeight: 0,
    strokeOpacity: 0
};

var mapViewBuildingPolyOpts = {
    fillColor: '#B7B4AC',
    fillOpacity: .7,
    strokeColor: '#b7b4ac',
    strokeWeight: 0,
    strokeOpacity: 0
};


