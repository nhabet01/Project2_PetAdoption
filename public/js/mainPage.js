$(document).ready(function() {

    $('.adaption').circleType({ radius: 384 });

    $('.logo').on('click', () => {
        console.log('hello')
        window.location.href = '/login'

    })
    $('.logo').on('mouseover', () => {
            $('.logo').animateCss('bounce');

    })
        // animate CSS
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });


});