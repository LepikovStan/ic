(function($){

	$(function() {
        $('.callback').on('click', function() {
            $('.popup').show()
            $('.popup-substrate').height($(document).height())
        });

        $('.popup-substrate, .popup .close').on('click', function() {
            $('.popup').hide()
        });

        var bannerPagerItem = '',
            bannerCounter = 0,
            bannerItemLength = $('.banner-cont ul li').length;

        $('.banner-cont').append('<div class="banner-pager"></div>');
        $('.banner-cont ul li').each(function(i, el) {
            if (i === 0) {
                bannerPagerItem += '<div class="banner-pager-item active"></div>';
            } else {
                bannerPagerItem += '<div class="banner-pager-item"></div>';
            }
        });
        $('.banner-cont .banner-pager').html(bannerPagerItem);

        changeCounter();
        $('.banner .prev').on('click', slideBanner);
        $('.banner .next').on('click', { next: true }, slideBanner);

        function changeCounter(next) {
            if (next) {
                bannerCounter = bannerCounter + 1;
            } else {
                bannerCounter = bannerCounter - 1;
            }

            if (bannerCounter <= 0) {
                bannerCounter = 0;
                $('.banner .prev').hide();
            } else {
                $('.banner .prev').show();
            }
            if (bannerCounter >= bannerItemLength-1) {
                bannerCounter = bannerItemLength-1;
                $('.banner .next').hide();
            } else {
                $('.banner .next').show();
            }
        }

        function changeBannerPager() {
            $('.banner-pager-item').removeClass('active');
            $('.banner-pager-item:eq('+bannerCounter+')').addClass('active');
        }

        function slideBanner(e) {
            var next = e.data && e.data.next;
            hideBanner(next);
            changeCounter(next);
            showBanner(next);
            changeBannerPager();
        }

        function hideBanner(next) {
            $('.banner-item:eq('+bannerCounter+')')
                .animate({
                    left: next ? -$('.banner-cont').width() : $('.banner-cont').width()
                }, 500);
        }

        function showBanner(next) {
            $('.banner-item:eq('+bannerCounter+')')
                .css({ left: next ? $('.banner-cont').width() : -$('.banner-cont').width() })
                .animate({
                    left: 0
                }, 500);
        }

        function initializeMap() {
            var address = $('#maps').text();
            $.get('http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false&language=ru', function(data) {
                var myLatlng = new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng),
                    myOptions = {
                        zoom: 8,
                        center: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    contentString = address,
                    infowindow = new google.maps.InfoWindow({
                        content: contentString
                    }),
                    map = new google.maps.Map(document.getElementById("maps"), myOptions),
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title:"Hello World!"
                    });

                infowindow.open(map,marker);
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
            });
        }

        initializeMap();
    });

})(jQuery,undefined)