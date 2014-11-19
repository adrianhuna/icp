/*!
* webTicker 1.3
* Examples and documentation at:
* http://jonmifsud.com
* 2011 Jonathan Mifsud
* Version: 1.2 (26-JUNE-2011)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* Requires:
* jQuery v1.4.2 or later
*
*/
(function( jQuery ){

  var globalSettings = new Array();

  var methods = {
    init : function( settings ) { // THIS
settings = jQuery.extend({
travelocity: 0.05,
direction: 1,
moving: true
}, settings);
globalSettings[jQuery(this).attr('id')] = settings;
return this.each(function(){
var jQuerystrip = jQuery(this);
jQuerystrip.addClass("newsticker")
var stripWidth = 0;
var jQuerymask = jQuerystrip.wrap("<div class='mask'></div>");
jQuerymask.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>")
var jQuerytickercontainer = jQuerystrip.parent().wrap("<div class='tickercontainer'></div>");
var count = jQuerystrip.find("li").length;
jQuerystrip.find("li").each(function(i){
stripWidth += jQuery(this, i).outerWidth(true);
});
var ww = stripWidth;
var content = jQuerystrip.html();
while((stripWidth-500)<jQuerystrip.parent('div').outerWidth(true))
{
	jQuerystrip.append(content);
	stripWidth += ww;
}
jQuerystrip.width(stripWidth+500);//20 used for ie9 fix
var first = jQuerystrip.children().first();
var travel = first.outerWidth(true);
var timing = travel/settings.travelocity;
jQuerystrip.css("left","940px");
scrollnews(travel, timing);


function scrollnews(spazio, tempo){
if (settings.direction == 1)
jQuerystrip.animate({left: '-='+ spazio}, tempo, "linear", function(){

var position = jQuerystrip.position();
if(position.left < 0)
{
	jQuerystrip.append(jQuerystrip.children().first());
	jQuerystrip.css("left", '0');
}
var first = jQuerystrip.children().first();
var width = first.outerWidth(true);
var defTiming = width/settings.travelocity;
//jQuerystrip.css("left", left);

scrollnews(width, defTiming);
});
else
jQuerystrip.animate({right: '-='+ spazio}, tempo, "linear", function(){
jQuerystrip.children().last().after(jQuerystrip.children().first());
var first = jQuerystrip.children().first();
var width = first.outerWidth(true);
var defTiming = width/settings.travelocity;
//jQuerystrip.css("left", left);
jQuerystrip.css("right", '0');
scrollnews(width, defTiming);
});
}


jQuerystrip.hover(function(){

jQuery(this).stop();
},
function(){
if (globalSettings[jQuery(this).attr('id')].moving){
var offset = jQuery(this).offset();
var first = jQuerystrip.children().first();
var width = first.outerWidth(true);
var residualSpace;
if (settings.direction == 1) residualSpace = parseInt(jQuery(this).css('left').replace('px',''))+ width;
else residualSpace = parseInt(jQuery(this).css('right').replace('px',''))+ width;
var residualTime = residualSpace/settings.travelocity;
scrollnews(residualSpace, residualTime);
}
});
});
},
    stop : function( ) {
			
if (globalSettings[jQuery(this).attr('id')].moving){
globalSettings[jQuery(this).attr('id')].moving = false;
return this.each(function(){
jQuery(this).stop();
});
}
},
    cont : function( ) { // GOOD
if (!(globalSettings[jQuery(this).attr('id')].moving)){
globalSettings[jQuery(this).attr('id')].moving = true;
var settings = globalSettings[jQuery(this).attr('id')];
return this.each(function(){
var jQuerystrip = jQuery(this);
function scrollnews(spazio, tempo){
if (settings.direction == 1)
jQuerystrip.animate({left: '-='+ spazio}, tempo, "linear", function(){

jQuerystrip.children().last().after(jQuerystrip.children().first());
var first = jQuerystrip.children().first();
var width = first.outerWidth(true);
var defTiming = width/settings.travelocity;
//jQuerystrip.css("left", left);
jQuerystrip.css("left", '0');
scrollnews(width, defTiming);
});
else
jQuerystrip.animate({right: '-='+ spazio}, tempo, "linear", function(){
jQuerystrip.children().last().after(jQuerystrip.children().first());
var first = jQuerystrip.children().first();
var width = first.outerWidth(true);
var defTiming = width/settings.travelocity;
//jQuerystrip.css("left", left);
jQuerystrip.css("right", '0');
scrollnews(width, defTiming);
});

}

var offset = jQuery(this).offset();
var first = jQuerystrip.children().first();
var width = first.outerWidth(true);
var residualSpace;
if (settings.direction == 1) residualSpace = parseInt(jQuery(this).css('left').replace('px',''))+ width;
else residualSpace = parseInt(jQuery(this).css('right').replace('px',''))+ width;
var residualTime = residualSpace/settings.travelocity;
scrollnews(residualSpace, residualTime);

});
}
}
  };

  jQuery.fn.webTicker = function( method ) {
			
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      jQuery.error( 'Method ' + method + ' does not exist on jQuery.webTicker' );
    }
  
  };

})( jQuery );