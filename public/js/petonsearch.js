$(document).ready(function() {

    console.log('ready');

    $('.myBtn').on('click', function(e) {


        //console.log($(this).parent().find('.description')["0"].innerHTML)
        // var text = $(this).parent().find('.description')["0"].innerHTML
        console.log($(this).parent().find('.fix')["0"].innerHTML);
        $(".myModal").find('.description').text($(this).parent().find('.fix')["0"].innerHTML);
        //our text!

        $(".myModal").css("display", "block")
            // e.preventDefault();
    })
    $(".close").on('click', function(e) {
        $(".myModal").css("display", "none")
    })

  
})