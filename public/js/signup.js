$(document).ready(function() {
    // console.log("ready!");
    let passwordArr = []
    let passwordtoMatch = []
    let emailtomatch = []
    let email;
    var name = $('#name');
    var username = $('#username');


    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('#email').keyup((e) => {

        // console.log(e.originalEvent.key)


        if (e.originalEvent.key == 'Backspace') {
            emailtomatch.pop()
        } else if (e.originalEvent.key == 'Tab' || e.originalEvent.key == 'Shift') {

        } else { emailtomatch.push(e.originalEvent.key) }
        // console.log(emailtomatch)
        email = emailtomatch.join('')
            // console.log(email)
            // console.log(name.val().length)
    });




    $('.btn').prop('disabled', true);
    $('#password').keyup((e) => {

        // console.log(e.originalEvent.key)


        if (e.originalEvent.key == 'Backspace') {
            passwordArr.pop()
        } else if (e.originalEvent.key == 'Tab') {

        } else { passwordArr.push(e.originalEvent.key) }
        // console.log(passwordArr, passwordtoMatch)
    });

    $('body').keyup((e) => {
        Confurm(email, name, username)

    })



    $('#confirm').keyup((e) => {

        // console.log(e.originalEvent.key)

        if (e.originalEvent.key == 'Backspace') {
            passwordtoMatch.pop()
        } else if (e.originalEvent.key == 'Tab') {

        } else {
            passwordtoMatch.push(e.originalEvent.key)
        }
        console.log(passwordArr, passwordtoMatch)
    });

    let Confurm = (email, name, username) => {
        if (passwordArr.length >= 5 && passwordtoMatch.length >= 5 && name.val().length >= 4 && username.val().length >= 4) {
            if (passwordArr.toString() == passwordtoMatch.toString()) {
                console.log('password matches')
                    // console.log(email)
                    // console.log(isEmail(email))

                if (isEmail(email)) {
                    $('.btn').prop('disabled', false);
                }

            } else {

                console.log('password is not matching')
                $('.btn').prop('disabled', true);

            }

        } else {
            $('.btn').prop('disabled', true);
        }

    }


});