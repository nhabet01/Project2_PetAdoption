//This code handles our API query
const express = require("express");
const router = express.Router();
var petfinder = require('petfinder')('357d4a946c3d94988341843dbe6abed5', '6b28ab1dc3723180ab6a01aa0491b5fe');

const API = {

        findAminals: (params, cb) => {
            console.log('PARAMS')
            console.log(params);
            let animalType = params.animal.toLowerCase();
            let animalAge = params.age;
            //Slice the first letter of the gender (M or F) as that is all that is needed to query the api 
            let animalSex = params.gender.slice(0,1);
            let zip = params.zip;
            console.log(animalType,animalAge,animalSex,zip)
            //Difference between age and size? why is size hardcoded
            petfinder.findPet(zip, {animal: animalType, sex: animalSex, age: animalAge, size: 'M' }, function(err, breeds) {


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
                        // console.log(breeds[i].media.photos['1'].x)
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

    module.exports = API;