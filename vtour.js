
function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.google.com/maps/api/js?&key=AIzaSyCATynZB-ihVISDEPrMHT8sRVdgwHG6NCA&callback=init";
    document.body.appendChild(script);
}
window.onload = loadScript;

var map;
var infowindow;
var academicMarkers = [],
    residentialMarkers = [],
    contemporaryMarkers = [],
    poiMarkers = [];
var perryOutline, campusOutline;

//Set center of map,
var ChamplainCampus = {lat: 44.474406, lng: -73.204027};

function toggleBuildingPolys(id){
    if($('#' + id).is(':checked')){
        perryOutline.setMap(map);
    } else {
        perryOutline.setMap(null);
    }
}

function toggleCampusPolys(id){
    if($('#' + id).is(':checked')){
        campusOutline.setMap(map);
    } else {
        campusOutline.setMap(null);
    }
}

//Initialize the map, set map on each layer
function init() {

    //Define general map options
    var mapOptions = {
        center: ChamplainCampus,
        zoom: 17,
        styles: [{featureType:"road",elementType:"geometry",stylers:[{lightness:100},{visibility:"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF",}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]

    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    var marker, i;



    // Construct the polygons.
    perryOutline = new google.maps.Polygon({
        paths: perryPoly,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#B3CE87',
        fillOpacity: 0.35
    });
    perryOutline.setMap(map);

    campusOutline = new google.maps.Polygon({
        paths: campusPolyPoints,
        strokeColor: '#1377db',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#c6e2ff',
        fillOpacity: 0.35
    });
    //campusOutline.setMap(map);


    //Generate the marker layer functions
    function generateAcademicLayer(){
        for (i =0; i<academics.length; i++){
            var building = academics[i];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(building.lat, building.lng),
                map:map,
                icon: 'http://www.champlain.edu/Images/Admin/icons/academic_icon.png'
            });

            academicMarkers.push(marker);


            google.maps.event.addListener(marker, 'click', (function(marker, i) {

                return function() {
                    infowindow.setContent('<h1>' +  academics[i].name + "</h1>" + '<p><img src="' + academics[i].image + '"/></p>' + '<p>' + academics[i].copy + '</p>');
                    infowindow.open(map, marker);
                }

            })(marker, i));
        }
    }

    function generateResidentialLayer(){
        for (i =0; i<residential.length; i++){
            var building = residential[i];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(building.lat, building.lng),
                map:map,
                icon: 'http://www.champlain.edu/Images/Admin/icons/residence_icon.png'
            });

            residentialMarkers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {

                return function() {
                    infowindow.setContent('<h1>' +  residential[i].name + "</h1>" + '<p><img src="' + residential[i].image + '"/></p>' + '<p>' + residential[i].copy + '</p>');
                    infowindow.open(map, marker);
                }

            })(marker, i));

        }
    }
    function generateContemporaryLayer(){
        for (i =0; i<contemporary.length; i++){
            var building = contemporary[i];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(building.lat, building.lng),
                map:map,
                icon: 'http://www.champlain.edu/Images/Admin/icons/residence_icon.png'
            });

            contemporaryMarkers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {

                return function() {
                    infowindow.setContent('<h1>' +  contemporary[i].name + "</h1>" + '<p><img src="' + contemporary[i].image + '"/></p>' + '<p>' + contemporary[i].copy + '</p>');
                    infowindow.open(map, marker);
                }

            })(marker, i));

        }
    }

    function generatePoiLayer(){
        for (i =0; i<poi.length; i++){
            var building = poi[i];
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(building.lat, building.lng),
                map:map,
                icon: 'http://www.champlain.edu/Images/Admin/icons/shield_icon.png'
            });

            poiMarkers.push(marker);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {

                return function() {
                    infowindow.setContent('<h1>' +  poi[i].name + "</h1>" + '<p><img src="' + poi[i].image + '"/></p>' + '<p>' + poi[i].copy + '</p>');
                    infowindow.open(map, marker);
                }

            })(marker, i));

        }
    }


    //Switch case here:

    function showAcad(category) {
        for (var i=0; i<academics.length; i++) {
            var building = academics[i];
            if (building.type  == category) {
                console.log(category);
                academicMarkers[i].setVisible(true);
            }
        }
    }


    function hideAcad(category) {
        for (var i=0; i<academics.length; i++) {
            var building = academics[i];
            if (building.type  == category) {
                academicMarkers[i].setVisible(false);
            }
        }
    }

    function showRes(category) {
        for (var i=0; i<residential.length; i++) {
            var building = residential[i];
            if (building.type  == category) {
                residentialMarkers[i].setVisible(true);
            }
        }
    }

    function hideRes(category) {
        for (var i=0; i<residential.length; i++) {
            var building = residential[i];
            if (building.type  == category) {
                residentialMarkers[i].setVisible(false);
            }
        }
    }

    function showContemporary(category) {
        for (var i=0; i<contemporary.length; i++) {
            var building = contemporary[i];
            if (building.type  == category) {
                contemporaryMarkers[i].setVisible(true);
            }
        }
    }

    function hideContemporary(category) {
        for (var i=0; i<contemporary.length; i++) {
            var building = contemporary[i];
            if (building.type  == category) {
                contemporaryMarkers[i].setVisible(false);
            }
        }
    }

    function showPoi(category) {
        for (var i=0; i<poi.length; i++) {
            var building = poi[i];
            if (building.type  == category) {
                poiMarkers[i].setVisible(true);
            }
        }
    }

    function hidePoi(category) {
        for (var i=0; i<poi.length; i++) {
            var building = poi[i];
            if (building.type  == category) {
                poiMarkers[i].setVisible(false);
            }
        }
    }


    generateAcademicLayer();
    generateResidentialLayer();
    generateContemporaryLayer();
    generatePoiLayer();

    showAcad("AcademicBuilding");
    showRes("ResidentialBuilding");
    showContemporary("ContemporaryBuilding");
    showPoi("PointOfInterest");


    $(function(){

        $('.AcademicBuilding').on('change', function(){
            var value = $(this).attr("value");
            // If checked
            if ($(this).is(":checked"))
            {
                showAcad(value);
            }
            else
            {
                hideAcad(value);
            }
        });

        $('.ResidentialBuilding').on('change', function(){
            var value = $(this).attr("value");
            // If checked
            if ($(this).is(":checked"))
            {
                showRes(value);
            }
            else
            {
                hideRes(value);
            }
        });

        $('.ContemporaryBuilding').on('change', function(){
            var value = $(this).attr("value");
            // If checked
            if ($(this).is(":checked"))
            {
                showContemporary(value);
            }
            else
            {
                hideContemporary(value);
            }
        });
        $('.PointOfInterest').on('change', function(){
            var value = $(this).attr("value");
            // If checked
            if ($(this).is(":checked"))
            {
                showPoi(value);
            }
            else
            {
                hidePoi(value);
            }
        });




    });//end function


}//end init



