$(function(){
  $(".btn-one").click(function() {
	$('#totalOne').text(parseInt($('#totalOne').text()) + 1);
  });
  $(".btn-two").click(function() {
	$('#totalTwo').text(parseInt($('#totalTwo').text()) + 1);
  });
});
