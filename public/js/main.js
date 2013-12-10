$(function(){
	$('#results').hide();
 	$('#main-btn').on('click', function(){
    $.get( '/searching', function(data) {
    	$('#results').html(data);
    	$('#results').show();
  	});
 	});
});
