//This code handles our API query
const express = require("express");
const router = express.Router();
var petfinder = require('petfinder')('357d4a946c3d94988341843dbe6abed5', '6b28ab1dc3723180ab6a01aa0491b5fe');

const API = {

    // <<<<<<< HEAD
    //     findAminals: (params, cb) => {
    //         console.log('PARAMS')
    //         console.log(params);
    //         let animalType = params.animal.toLowerCase();
    //         let animalAge = params.age;
    //         //Slice the first letter of the gender (M or F) as that is all that is needed to query the api 
    //         let animalSex = params.gender.slice(0, 1);
    //         let zip = params.zip;
    //         console.log(animalType, animalAge, animalSex, zip)
    // =======
    findAminals: (params, cb) => {
        console.log('PARAMS')
        console.log(params);
        let animalType = params.animal.toLowerCase();
        let animalAge = params.age;
        //Slice the first letter of the gender (M or F) as that is all that is needed to query the api 
        let animalSex = params.gender.slice(0, 1);
        let zip = params.zip;
        console.log(animalType, animalAge, animalSex, zip, params.username, params.id)
            // >>>>>>> Gilbert
            //Difference between age and size? why is size hardcoded
        petfinder.findPet(zip, { animal: animalType, sex: animalSex, age: animalAge }, function(err, breeds) {

            let data = []
            for (var i = 0; i < breeds.length; i++) {

                if (breeds[i].contact.address1 && breeds[i].contact.email && breeds[i].media.photos['1']) {
                    //this is out pet ids
                    console.log(breeds[i])

                    let pet = {
                        petPicture: breeds[i].media.photos['1'].x,
                        descriptsion: breeds[i].description,
                        phone: breeds[i].contact.phone,
                        email: breeds[i].contact.email,
                        address: breeds[i].contact.address1,
                        petid: breeds[i].id, //good,passed to animalSearch.handlebars
                        petuserid: params.id,
                        petusername: params.username
                    }
                    data.push(pet)
                        // >>>>>>> Gilbert
                }
            }
            cb(data)
        });


    },

    findfav() {

        petfinder.getPet(37624160, {}, function(err, breeds) {


            console.log(breeds)
        })

        // petfinder.getPet('37624160', function(data) {
        //     console.log(data)
        // })
        // console.log('boo')

        // petId = 37624160
        // getPet(petId, {}, function(favPet) {

        //     console.log(favPet)
        // })
    }
}
API.findfav();

module.exports = API;



// for favotrite animal we will call API.findfav(petId)