//hide alert
$(document).on("click", "[data-hide]", function(e) {
  e.preventDefault();
  var $this = $(this);
  $this.closest($this.attr("data-hide")).hide();
});
//iCheck
$(function () {
  $('input').iCheck({
    checkboxClass: 'icheckbox_square',
    radioClass: 'iradio_square',
    increaseArea: '20%' /* optional */
  });
});
//dropdown btn effect table responsive 
$('.table-responsive').on('show.bs.dropdown', function () {
     $('.table-responsive').css( "overflow", "inherit" );
});

$('.table-responsive').on('hide.bs.dropdown', function () {
     $('.table-responsive').css( "overflow", "auto" );
})
