var petfinder = require('petfinder')('357d4a946c3d94988341843dbe6abed5','6b28ab1dc3723180ab6a01aa0491b5fe');
 
// Get list of breeds 
// petfinder.getBreedList('cat', function(err, breeds) {
//   console.log(breeds)
// });


petfinder.findPet('28204', {animal: 'dog', age: 'Adult', size: 'M', count: 250}, function(err, breeds) {

	for (var i = 0; i < breeds.length; i++) {
		console.log(breeds[i].animal + "-" + breeds[i].age + "-" + breeds[i].size + "-" + breeds[i].name);
	}
	   console.log(breeds.length);
  
});