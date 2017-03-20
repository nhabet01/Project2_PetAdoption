const express = require("express");
const router = express.Router();
var petfinder = require('petfinder')('357d4a946c3d94988341843dbe6abed5', '6b28ab1dc3723180ab6a01aa0491b5fe');

const API = {

        findAminals: (params, cb) => {
            console.log(params);
            let animalType = params.animalType.toLowerCase();
            let animalAge = params.animalAge;
            let animalSex = params.animalSex.slice(0, 1);
            let zip = params.zip;

            petfinder.findPet(zip, { animal: animalType, sex: animalSex, age: animalAge, size: 'M' }, function(err, breeds) {
                let data = []
                for (var i = 0; i < breeds.length; i++) {

                    if (breeds[i].contact.address1 && breeds[i].contact.email && breeds[i].media.photos['1']) {
                        // console.log(breeds[i].sex)
                        // console.log(breeds[i].age)
                        // console.log(breeds[i].shelterId)
                        //     //Here we need to do fnction if objHasAkey(for phone email and address and if it does then display it)
                        // console.log('_______CONTACT INFO_________')
                        // console.log(breeds[i].contact)
                        //     // console.log(breeds[i].options)
                        // console.log(`_______Picture ${i}___________`)
                        // console.log(breeds[i].media.photos['1'].x)
                        // console.log(`_______NEXT PET ${i}___________`)
                        console.log(breeds[i].media.photos['1'].x)
                        let pet = {
                            petPicture: breeds[i].media.photos['1'].x,
                            descriptsion: breeds[i].description,
                            phone: breeds[i].contact.phone,
                            email: breeds[i].contact.email,
                            address: breeds[i].contact.address1,

                        }
                        data.push(pet)
                    }
                }
                cb(data)
            });


        }
    }
    // router.post("/signup", function(req, res) {
    //     console.log('SIGNUP')

//     console.log(req.body)

// });

// router.post("/login", function(req, res) {
//     console.log('LOGIN')

//     console.log(req.body)

// });



// router.post("/search", function(req, res) {

//     console.log(req.body)

// });


module.exports = API;