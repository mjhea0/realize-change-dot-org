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
});



