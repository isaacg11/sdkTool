Stamplay.init('sdktool');


/*-----------*/
/* NAVBAR    */
/*-----------*/
// function goToObject(){
// 	var newUser = new Stamplay.User().Model;
// 	newUser.currentUser().then(function(){
// 		if(newUser.isLogged()){
// 			document.location.href = 'objects.html';
// 		}
// 		else{
// 			Materialize.toast('You must log in first!', 3000);
// 		}
// 	});
// }

$(".dropdown-button").dropdown();

$('.datepicker').pickadate({
    	selectMonths: true,
    	selectYears: 15 
  });
/*----------------------*/
/* CREATE OBJECT SCRIPT */
/*----------------------*/

function createObject(){
	var objectName = document.getElementById('objectName').value;
	var objectAuthor = document.getElementById('objectAuthor').value;
	var objectPrice = document.getElementById('objectPrice').value;
	var objectDate = document.getElementById('objectDate').value;
	var published = new Date(objectDate);
	var price = parseFloat(objectPrice);

	var objectInstance = new Stamplay.Cobject('book').Model;
	objectInstance.set('title', objectName);
	objectInstance.set('author', objectAuthor);
	objectInstance.set('price', price);
	objectInstance.set('datePublished', published);
	objectInstance.save().then(function(){

		var title = objectInstance.get('title');
		var author = objectInstance.instance.author;
		var price = objectInstance.instance.price;
		var datePublished = objectInstance.instance.datepublished;
		var date = objectInstance.get('dt_create');
		var id = objectInstance.get('_id');
		document.getElementById("objectOutputName").innerHTML = title;
		document.getElementById("objectOutputAuthor").innerHTML = author;
		document.getElementById("objectOutputDate").innerHTML = date;
		document.getElementById("objectOutputID").innerHTML = id;
		document.getElementById("objectName").value = "";
		document.getElementById("objectAuthor").value = "";
		document.getElementById("objectPrice").value = "";
		document.getElementById("objectDate").value = "";
	});
}

function resetCreated(){
	document.getElementById("objectOutputName").innerHTML = '';
	document.getElementById("objectOutputAuthor").innerHTML = '';
	document.getElementById("objectOutputDate").innerHTML = '';
	document.getElementById("objectOutputID").innerHTML = '';
}

/*----------------------*/
/* UPDATE OBJECT SCRIPT */
/*----------------------*/


function updateObject(){
	var newTitle = document.getElementById('title').value;
	var newAuthor = document.getElementById('author').value;

	var objectInstance = new Stamplay.Cobject('book').Model;
	objectInstance.fetch('562ec63677589e2e0f86c23c').then(function(){
    objectInstance.set('title', newTitle);
    objectInstance.set('author', newAuthor);
    objectInstance.save().then(function(){
    	
		document.getElementById('updateOutputName').innerHTML = objectInstance.instance.title;
		document.getElementById('updateOutputAuthor').innerHTML = objectInstance.instance.author;
		document.getElementById('updateOutputDate').innerHTML = objectInstance.instance.dt_update;
		document.getElementById('title').value = "";
		document.getElementById('author').value = "";
    	});
	});
}

/*----------------------*/
/* QUERY OBJECT SCRIPT  */
/*----------------------*/

function queryObject(){
	var cuisine = document.getElementById('cuisine').value;
	var city = document.getElementById('city').value;
	
	var objectCollection = new Stamplay.Cobject('resturaunt').Collection;
	objectCollection.equalTo("cuisine", cuisine).equalTo("city", city).fetch().then(function() {
		var cuisine = objectCollection.instance[0].get('cuisine');
		var resturaunt = objectCollection.instance[0].get('resturaunt');
		var city = objectCollection.instance[0].get('city');
		var address = objectCollection.instance[0].get('address');

		document.getElementById('queryOutputName').innerHTML = resturaunt; 
		document.getElementById('queryOutputCuisine').innerHTML = cuisine; 
		document.getElementById('queryOutputCity').innerHTML = city; 
		document.getElementById('queryOutputAddress').innerHTML = address; 

		document.getElementById('cuisine').value = ""; 
		document.getElementById('city').value = ""; 
	});
}

function reset(){
	document.getElementById('queryOutputName').innerHTML = ''; 
	document.getElementById('queryOutputCuisine').innerHTML = ''; 
	document.getElementById('queryOutputCity').innerHTML = ''; 
	document.getElementById('queryOutputAddress').innerHTML = ''; 
}

/*----------------------------*/
/* RATE/UPVOTE/REVIEW SCRIPT  */
/*----------------------------*/



function rateFive(){
	var a = document.getElementById("fiveStars").checked;
	if(a === true) {
		var objectInstance = new Stamplay.Cobject('resturaunt').Model;
		objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    		return objectInstance.rate(5).then(function(){
    		var ratings = objectInstance.instance.actions.ratings.avg;
			document.getElementById('rateOutputRatings').innerHTML = ratings;
    		});
  		});
	}
}


function rateFour(){
	var b = document.getElementById("fourStars").checked;
	if(b === true) {
		var objectInstance = new Stamplay.Cobject('resturaunt').Model;
		objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    		return objectInstance.rate(4).then(function(){
    		var ratings = objectInstance.instance.actions.ratings.avg;
			document.getElementById('rateOutputRatings').innerHTML = ratings;
    		});
  		});
	}
}
function rateThree(){
	var c = document.getElementById("threeStars").checked;
	if(c === true) {
		var objectInstance = new Stamplay.Cobject('resturaunt').Model;
		objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    		return objectInstance.rate(3).then(function(){
    		var ratings = objectInstance.instance.actions.ratings.avg;
			document.getElementById('rateOutputRatings').innerHTML = ratings;
    		});
  		});
	}
}
function rateTwo(){
	var d = document.getElementById("twoStars").checked;
	if(d === true) {
		var objectInstance = new Stamplay.Cobject('resturaunt').Model;
		objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    		return objectInstance.rate(2).then(function(){
    		var ratings = objectInstance.instance.actions.ratings.avg;
			document.getElementById('rateOutputRatings').innerHTML = ratings;
    		});
  		});
	}
}
function rateOne(){
	var e = document.getElementById("oneStar").checked;
	if(e === true) {
		var objectInstance = new Stamplay.Cobject('resturaunt').Model;
		objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    		return objectInstance.rate(1).then(function(){
    		var ratings = objectInstance.instance.actions.ratings.avg;
			document.getElementById('rateOutputRatings').innerHTML = ratings;
    		});
  		});
	}
}


function review(){
	var userReview = document.getElementById('review').value;
	var objectInstance = new Stamplay.Cobject('resturaunt').Model;
		objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    		return objectInstance.comment(userReview).then(function(){
    			var reviews = objectInstance.getComments();
    			for(i = 0; i<reviews.length; i++){
    				newReview = reviews[i].text;
    				document.getElementById('rateOutputReview').innerHTML = newReview;
    			}
    		});
		});
} 

function upvote(){
	var objectInstance = new Stamplay.Cobject('resturaunt').Model;
	objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
    	return objectInstance.upVote(1).then(function(){
			var total = document.getElementById('rateOutputLikes').innerHTML;
			var totalLikes = parseInt(total, 10) + 1;
			document.getElementById('rateOutputLikes').innerHTML = totalLikes;
    	});
  	});
}
function downvote(){
	var objectInstance = new Stamplay.Cobject('resturaunt').Model;
	objectInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){		
    	return objectInstance.downVote(1).then(function(){
    		var total = document.getElementById('rateOutputLikes').innerHTML;
			var totalLikes = parseInt(total, 10) - 1;
			document.getElementById('rateOutputLikes').innerHTML = totalLikes;	
    	});
  	});
}

/*-----------*/
/* SIGN UP   */
/*-----------*/
function signUp() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	var registrationData = {
		displayname: name,
  		email : email,
  		password: password
	};
	var newUser = new Stamplay.User().Model;
	newUser.signup(registrationData).then(function(){
		var displayname = newUser.get('displayname');
		var email = newUser.get('email');
		var date = newUser.get('dt_create');
		var id = newUser.get('_id');

		document.getElementById('userOutputName').innerHTML = displayname;
		document.getElementById('userOutputEmail').innerHTML = email;
		document.getElementById('userOutputDate').innerHTML = date;
		document.getElementById('userOutputID').innerHTML = id;

		document.getElementById('name').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";
		Materialize.toast('Success!', 4000);
	});
}

function facebook(){
	var newUser = new Stamplay.User().Model;
	newUser.login('facebook');
}



function resetSignUp(){
		document.getElementById('userOutputName').innerHTML = '';
		document.getElementById('userOutputEmail').innerHTML = '';
		document.getElementById('userOutputDate').innerHTML = '';
		document.getElementById('userOutputID').innerHTML = '';
}

/*----------------------*/
/* GET ALL DATA FOR APP */
/*----------------------*/
window.onload = function(){
	var newUser = new Stamplay.User().Model;
	newUser.currentUser().then(function(){
	var photo = newUser.get('profileImg');
	var firstName = newUser.instance.identities.facebook._json.first_name;
	var lastName = newUser.instance.identities.facebook._json.last_name;
	var email = newUser.get('email');
	var gender = newUser.instance.identities.facebook._json.gender;
	var date = newUser.get('dt_create');
	var id = newUser.get('_id');

	document.getElementById('fbPhoto').src = photo;
	document.getElementById('fbName').innerHTML = firstName + " " + lastName;
	document.getElementById('fbEmail').innerHTML = email;
	document.getElementById('fbGender').innerHTML = gender;
	document.getElementById('fbDate').innerHTML = date;
	document.getElementById('fbID').innerHTML = id;
	});

	var bookInstance = new Stamplay.Cobject('book').Model;
	bookInstance.fetch('562ec63677589e2e0f86c23c').then(function() {
	var title = bookInstance.get('title');
	var author = bookInstance.get('author');
	var date = bookInstance.get('dt_update');
	var id = bookInstance.get('_id');
	
	document.getElementById('updateOutputName').innerHTML = title;
	document.getElementById('updateOutputAuthor').innerHTML = author;
	document.getElementById('updateOutputDate').innerHTML = date;
	document.getElementById('updateOutputID').innerHTML = id;
	});

	var resturauntInstance = new Stamplay.Cobject('resturaunt').Model;
	resturauntInstance.fetch('562ec2ff77589e2e0f86c222').then(function(){
		var resturaunt = resturauntInstance.instance.resturaunt;
		var review = resturauntInstance.instance.review;
		var ratings = resturauntInstance.instance.actions.ratings.avg;
		var downvotes = resturauntInstance.instance.actions.votes.users_downvote;

		for(var i = 0; i<downvotes.length; i++){
    			downvotes = downvotes.length;
		}
		var upvotes = resturauntInstance.instance.actions.votes.users_upvote;
		for(var j = 0; j<upvotes.length; j++){
    			upvotes = upvotes.length;
		}
		var totalLikes = upvotes - downvotes;
		document.getElementById('rateOutputName').innerHTML = resturaunt;
		document.getElementById('rateOutputReview').innerHTML = review;
		document.getElementById('rateOutputRatings').innerHTML = ratings;
		document.getElementById('rateOutputLikes').innerHTML = totalLikes;
	});
};

