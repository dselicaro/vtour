/**
 * Created by danielselicaro on 8/23/16.
 */

jQuery(function($){


    //Toggle visible layers on and off
    $('.toggle').click(function(){

        if ( $(this).hasClass('layerOn') ) {
            $(this).addClass('layerOff').removeClass('layerOn');
        } else {
            $(this).addClass('layerOn').removeClass('layerOff');
        }

    });



});