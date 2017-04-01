//This code handles our API query
const express = require("express");
const router = express.Router();
var petfinder = require('petfinder')('d9fef56b9ddab7a97e72e53d5ac6fe30', '4b44d9d627a82b811c3986f75db408f8');
var chalk = require('chalk');

const API = {


    findAminals: (params, cb) => {
        console.log('PARAMS')
        console.log(params);
        let animalType = params.animal.toLowerCase();
        let animalAge = params.age;
        //Slice the first letter of the gender (M or F) as that is all that is needed to query the api 
        let animalSex = params.gender.slice(0, 1);
        let zip = params.zip;
        console.log('DATA TO THE FIND ANIMALS')
        console.log(animalType, animalAge, animalSex, zip, params.username, params.id)
            //Difference between age and size? why is size hardcoded

        petfinder.findPet(zip, {
            animal: animalType,
            sex: animalSex,
            age: animalAge
        }, function(err, breeds) {

            let data = []
            for (var i = 0; i < breeds.length; i++) {

                if (breeds[i].contact.address1 && breeds[i].contact.email && breeds[i].media.photos['1']) {
                    //this is out pet ids
                    // console.log(breeds[i])

                    let pet = {
                        petPicture: breeds[i].media.photos['1'].x,
                        description: breeds[i].description,
                        phone: breeds[i].contact.phone,
                        email: breeds[i].contact.email,
                        address: breeds[i].contact.address1,
                        petid: breeds[i].id, //good,passed to animalSearch.handlebars
                        petuserid: params.id,
                        petusername: params.username

                    }
                    data.push(pet)

                }
            }
            cb(data)
        });


    },

    //recieve an array of ID's
    findfav(arrayOfFavs, cb) {

        var ObjectMaintoCB = []

        function reduceArray(arrayOfFavs) {
            if (arrayOfFavs.length > 7) {
                arrayOfFavs.pop()
                console.log(arrayOfFavs)
                reduceArray(arrayOfFavs)

            } else {
                return arrayOfFavs
            }

        }
        reduceArray(arrayOfFavs)
        for(i = 0; i<arrayOfFavs.length; i++) {
            //find each pet by id and send it to array with return! 

            petfinder.getPet(arrayOfFavs[i], {}, function(err, breeds) {
                // try {
                //     throw 'I am a tea pot and don't know how to code!'; // generates an exception
                // } catch (e) {
                    // statements to handle any exceptions
                    //logMyErrors(e); // pass exception object to error handler
                //     console.log(e)
                // }

                //===========nh: try code above is activated regardless of errors...=============
                console.log('Bugssss')
                let pet = {
                    petPicture: breeds.media.photos['1'].x,
                    description: breeds.description,
                    phone: breeds.contact.phone,
                    email: breeds.contact.email,
                    address: breeds.contact.address1,
                    petid: breeds.id, //good,passed to animalSearch.handlebars
                };
               
                    // console.log(pet)
                    //return it
                ObjectMaintoCB.push(pet)
                if (ObjectMaintoCB.length == arrayOfFavs.length) {

                    console.log('Favs retrieved, send to page');
                    // send data back to routes
                    cb(ObjectMaintoCB)
                }

            })


        };



    }
}


module.exports = API;