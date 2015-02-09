(function($){

	$(function() {
        $('.callback').on('click', function() {
            $('.popup').show()
            $('.popup-substrate').height($(document).height())
        });

        $('.popup-substrate, .popup .close').on('click', function() {
            $('.popup').hide()
        });
    });

})(jQuery,undefined)