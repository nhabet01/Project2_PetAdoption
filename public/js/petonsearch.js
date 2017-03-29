$(document).ready(function() {

	console.log('ready');

	$('.myBtn').on('click' , function(e){

 	//console.log($(this).parent().find('.description')["0"].innerHTML)
 	// var text = $(this).parent().find('.description')["0"].innerHTML
 	console.log($(this).parent().find('.fix')["0"].innerHTML);
 	$(".myModal").find('.description').text($(this).parent().find('.fix')["0"].innerHTML);
 	//our text!

 		$(".myModal").css("display" , "block")
 })
$(".close").on('click', function(e){
	$(".myModal").css("display" , "none")
})

// this.parent.find()
	
	// console.log()
	// Get the modal
// var modal = document.getElementsByClassName('myModal');

// // Get the button that opens the modal
// var btn = document.getElement("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
})
