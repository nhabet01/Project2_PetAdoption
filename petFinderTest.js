var petfinder = require('petfinder')('357d4a946c3d94988341843dbe6abed5', '6b28ab1dc3723180ab6a01aa0491b5fe');

// Get list of breeds 
// petfinder.getBreedList('cat', function(err, breeds) {
//   console.log(breeds)
// });

// animal = barnyard, bird, cat, dog, horse, pig, reptile, smallfurry
// age: 'Adult', or Baby
petfinder.findPet('28105', { animal: 'cat', size: 'M' }, function(err, breeds) {
    for (var i = 0; i < breeds.length; i++) {
        console.log(breeds[i].sex)
        console.log(breeds[i].age)

        console.log(breeds[i].description)
        console.log(breeds[i].shelterId)
            //Here we need to do fnction if objHasAkey(for phone email and address and if it does then display it)
        console.log('_______CONTACT INFO_________')
        console.log(breeds[i].contact)
        console.log(breeds[i].options)
        console.log(`_______Picture ${i}___________`)
        console.log(breeds[i].media.photos['1'].x)
        console.log(`_______NEXT PET ${i}___________`)
    }


});