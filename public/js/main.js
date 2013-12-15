$(function(){
  $(".btn-one").click(function() {
    var parameters = { addOne: 1 };
    $.post( '/rating',parameters, function(data) {
      $('#results').html(data);
    });
  });
  $(".btn-two").click(function() {
    var parameters = { addTwo: 1 };
    $.post( '/rating',parameters, function(data) {
      $('#results').html(data);
    });
  });
  $(".btn-vote").click(function() {
  	$(".btn-row").hide()
  	$(".answer-row").show()
  });
});



