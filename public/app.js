Stamplay.init('sdktool');

/*-----------*/
/* DROPDOWN  */
/*-----------*/
jQuery('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

/*-----------*/
/*   DATE    */
/*-----------*/
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
	var objectImg = document.getElementById('objectImg').value;
	var published = new Date(objectDate);
	var price = parseFloat(objectPrice);


	var objectInstance = new Stamplay.Cobject('book').Model;
	objectInstance.set('title', objectName);
	objectInstance.set('author', objectAuthor);
	objectInstance.set('price', price);
	objectInstance.set('datePublished', published);
	objectInstance.set('bookImage', objectImg);
	objectInstance.save().then(function(){

		var title = objectInstance.get('title');
		var author = objectInstance.instance.author;
		var price = objectInstance.instance.price;
		var datePublished = objectInstance.instance.datePublished;
		var img = objectInstance.get('bookImage');
		
		document.getElementById("objectOutputName").innerHTML = title;
		document.getElementById("objectOutputAuthor").innerHTML = author;
		document.getElementById("objectOutputPrice").innerHTML = price;
		document.getElementById("objectOutputPublished").innerHTML = datePublished;
		document.getElementById("bookImage").src = img;

		document.getElementById('createConsoleCursor').className = "hidden";
		document.getElementById('createConsoleStatus').className = "";
		document.getElementById('createHideBody').className = "";
		document.getElementById('createConsoleBody').innerHTML = 
		"{" + "title:" + " " + "'"+title+"'" + ", " + 
			  "author:" + " " + "'"+author+"'" + ", " + 
			  "price:" + " " + "'"+price+"'" + ", " +
			  "datePublished:" + " " + "'"+datePublished+"'" + ", " + 
			  "author:" + " " + "'"+author+"'" + ", " + 
			  "bookImage:" + " " + "'"+img+"'" +
		"}";
		document.getElementById('createHideConsoleRes').className = "";
		document.getElementById('createConsoleRes').innerHTML = 
		"{" + "__v:" + " " + "'"+objectInstance.instance.__v+"'" + ", " + 
			  "_id:" + " " + "'"+objectInstance.instance._id+"'" + ", " + 
			  "comments:" + " " + "'"+objectInstance.instance.actions.comments+"'" + ", " +
			  "ratings:" + " " + "'"+objectInstance.instance.actions.ratings.avg+"'" + ", " + 
			  "votes:" + " " + "'"+objectInstance.instance.actions.votes.users+"'" + ", " + 
			  "appId:" + " " + "'"+objectInstance.instance.appId+"'" + ", " +
			  "cobjectId:" + " " + "'"+objectInstance.instance.cobjectId+"'" + ", " + 
			  "dt_create:" + " " + "'"+objectInstance.instance.dt_create+"'" + ", " + 
			  "dt_update:" + " " + "'"+objectInstance.instance.dt_update+"'" + 
		"}";

		document.getElementById("objectName").value = "";
		document.getElementById("objectAuthor").value = "";
		document.getElementById("objectPrice").value = "";
		document.getElementById("objectDate").value = "";
		document.getElementById("objectImg").value = "";
	});
}
/*----------------------*/
/* UPDATE OBJECT SCRIPT */
/*----------------------*/
function updateObject(){
	var newTitle = document.getElementById('title').value;
	var newAuthor = document.getElementById('author').value;
	var newImage = document.getElementById('image').value;

	var objectInstance = new Stamplay.Cobject('book').Model;
	objectInstance.fetch('562ec63677589e2e0f86c23c').then(function(){
    objectInstance.set('title', newTitle);
    objectInstance.set('author', newAuthor);
    objectInstance.set('bookImage', newImage);
    objectInstance.save().then(function(){
    	
		document.getElementById('updateOutputName').innerHTML = objectInstance.instance.title;
		document.getElementById('updateOutputAuthor').innerHTML = objectInstance.instance.author;
		document.getElementById('updateOutputDate').innerHTML = objectInstance.instance.dt_update;
		document.getElementById('updateImage').src = objectInstance.instance.bookImage;

		document.getElementById('updateConsoleCursor').className = "hidden";
		document.getElementById('updateConsoleStatus').className = "";
		document.getElementById('updateHideBody').className = "";
		document.getElementById('updateConsoleBody').innerHTML = 
		"{" + "title:" + " " + "'"+newTitle+"'" + ", " + 
			"author:" + " " + "'"+newAuthor+"'" + ", " + 
			"price:" + " " + "'"+newImage+"'" + 
		"}";
		document.getElementById('updateHideConsoleRes').className = "";
		document.getElementById('updateConsoleRes').innerHTML = 
		"{" + "__v:" + " " + "'"+objectInstance.instance.__v+"'" + ", " + 
			"_id:" + " " + "'"+objectInstance.instance._id+"'" + ", " + 
			"comments:" + " " + "'"+objectInstance.instance.actions.comments+"'" + ", " +
			"ratings:" + " " + "'"+objectInstance.instance.actions.ratings.avg+"'" + ", " + 
			"votes:" + " " + "'"+objectInstance.instance.actions.votes.users+"'" + ", " + 
			"appId:" + " " + "'"+objectInstance.instance.appId+"'" + ", " +
			"cobjectId:" + " " + "'"+objectInstance.instance.cobjectId+"'" + ", " + 
			"dt_create:" + " " + "'"+objectInstance.instance.dt_create+"'" + ", " + 
			"dt_update:" + " " + "'"+objectInstance.instance.dt_update+"'" + 
		"}";

		document.getElementById('title').value = "";
		document.getElementById('author').value = "";
		document.getElementById('image').value = "";
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
/*----------------------------*/
/* RATE/VOTE/REVIEW SCRIPT    */
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
		displayName: name,
  		email : email,
  		password: password
	};
	var newUser = new Stamplay.User().Model;
	newUser.signup(registrationData).then(function(){
		var displayname = newUser.get('displayName');
		var email = newUser.get('email');
		var date = newUser.get('dt_create');
		var id = newUser.get('_id');

		document.getElementById('userOutputName').innerHTML = displayname;
		document.getElementById('userOutputEmail').innerHTML = email;
		document.getElementById('userOutputDate').innerHTML = date;
		document.getElementById('userOutputID').innerHTML = id;
		document.getElementById('consoleCursor').className = "hidden";
		document.getElementById('consoleStatus').className = "";
		document.getElementById('consoleBody').className = "";
		document.getElementById('hideBody').className = "";
		document.getElementById('consoleRes').className = "";
		document.getElementById('hideRes').className = "";
		document.getElementById('consoleBody').innerHTML = 
		"{" + "displayname:" + " " + "'"+displayname+"'" + ", " + 
			  "email:" + " " + "'"+email+"'" + ", " + 
			  "password:" + " " + "'"+password+"'" + 
		"}";
		document.getElementById('consoleRes').innerHTML = 
		"{" + "__v:" + " " + "'"+newUser.instance.__v+"'" + ", " + 
			  "displayname:" + " " + "'"+newUser.instance.displayname+"'" + ", " + 
			  "email:" + " " + "'"+newUser.instance.email+"'" + ", " + 
			  "password:" + " " + "'"+newUser.instance.password+"'" + ", " + 
			  "givenRole:" + " " + "'"+newUser.instance.givenRole+"'" + ", " +
			  "_id:" + " " + "'"+newUser.instance._id+"'" + ", " + 
			  "appId:" + " " + "'"+newUser.instance.appId+"'" + ", " + 
			  "dt_create:" + " " + "'"+newUser.instance.dt_create+"'" + ", " + 
			  "dt_update:" + " " + "'"+newUser.instance.dt_update+"'" + ", " +
			  "emailVerified:" + " " + "'"+newUser.instance.emailVerified+"'" + ", " + 
			  "profileImg:" + " " + "'"+newUser.instance.profileImg+"'" + ", " + 
			  "salt:" + " " + "'"+newUser.instance.salt+"'" + ", " + 
			  "verificationCode:" + " " + "'"+newUser.instance.verificationCode+"'" + 
		"}";

		document.getElementById('name').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";
		document.getElementById('signupBtn').className = "hidden";
		document.getElementById('logoutBtn').className = "";
	});
}

/*-----------*/
/*  LOGOUT   */
/*-----------*/
function logout(){
	var user = new Stamplay.User().Model;
	user.logout();
}

/*-----------*/
/* FB LOGIN  */
/*-----------*/
function facebook(){
	var newUser = new Stamplay.User().Model;
	newUser.login('facebook');
}

/*----------------------*/
/* GET ALL DATA FOR APP */
/*----------------------*/
window.onload = function(){
	var newUser = new Stamplay.User().Model;
	newUser.currentUser().then(function(){
		if(newUser.isLogged() === true){
			console.log(newUser.instance);
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
			document.getElementById('consoleCursorFB').className = "hidden";
			document.getElementById('consoleStatusFB').className = "";
			document.getElementById('consoleBodyFB').className = "";
			document.getElementById('hideBodyFB').className = "";
			document.getElementById('consoleResFB').className = "";
			document.getElementById('hideResFB').className = "";
			document.getElementById('consoleBodyFB').innerHTML = " { } ";
			document.getElementById('consoleResFB').innerHTML = 
			"{" + "__v:" + " " + "'"+newUser.instance.__v+"'" + ", " + 
			  	"displayName:" + " " + "'"+newUser.instance.displayName+"'" + ", " + 
			  	"email:" + " " + "'"+newUser.instance.email+"'" + ", " + 
			  	"password:" + " " + "'"+newUser.instance.password+"'" + ", " + 
			  	"givenRole:" + " " + "'"+newUser.instance.givenRole+"'" + ", " +
			  	"_id:" + " " + "'"+newUser.instance._id+"'" + ", " + 
			  	"appId:" + " " + "'"+newUser.instance.appId+"'" + ", " + 
			  	"dt_create:" + " " + "'"+newUser.instance.dt_create+"'" + ", " + 
			  	"dt_update:" + " " + "'"+newUser.instance.dt_update+"'" + ", " +
			  	"emailVerified:" + " " + "'"+newUser.instance.emailVerified+"'" + ", " + 
			  	"profileImg:" + " " + "'"+newUser.instance.profileImg+"'" + ", " + 
			  	"salt:" + " " + "'"+newUser.instance.salt+"'" + ", " + 
			  	"verificationCode:" + " " + "'"+newUser.instance.verificationCode+"'" + 
			"}";
		}	
		else{
			console.log('You must login to see user info');
		}
	});

	var bookInstance = new Stamplay.Cobject('book').Model;
	bookInstance.fetch('562ec63677589e2e0f86c23c').then(function() {
	var title = bookInstance.get('title');
	var author = bookInstance.get('author');
	var date = bookInstance.get('dt_update');
	var id = bookInstance.get('_id');
	var img = bookInstance.get('bookImage');
	
	document.getElementById('updateOutputName').innerHTML = title;
	document.getElementById('updateOutputAuthor').innerHTML = author;
	document.getElementById('updateOutputDate').innerHTML = date;
	document.getElementById('updateOutputID').innerHTML = id;
	document.getElementById('updateImage').src = img;
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

