Stamplay.init('sdktool');
Stripe.setPublishableKey('pk_test_468fZQrmwpdHK7cQfx2lHXVI');

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

 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

function zipDownloadUser(){
	document.getElementById('userSignUp').className = "animated pulse";
}

function zipDownloadSocial(){
	document.getElementById('socialLogin').className = "animated pulse";
}

function zipDownloadCreateUpdate(){
	document.getElementById('createUpdate').className = "animated pulse";
}

function zipDownloadQuery(){
	document.getElementById('queryObject').className = "animated pulse";
}

function zipDownloadRate(){
	document.getElementById('rateObject').className = "animated pulse";
}

function zipDownloadVote(){
	document.getElementById('voteObject').className = "animated pulse";
}

function zipDownloadComment(){
	document.getElementById('objectComment').className = "animated pulse";
}

function zipDownloadActions(){
	document.getElementById('objectActions').className = "animated pulse";
}
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
 	var selectCuisine = document.getElementById("cuisineDropdown");
 	var cuisine = selectCuisine.options[selectCuisine.selectedIndex].value;

 	var selectCity = document.getElementById("cityDropdown");
 	var city = selectCity.options[selectCity.selectedIndex].value;

	var objectCollection = new Stamplay.Cobject('resturaunt').Collection;
	objectCollection.equalTo("cuisine", cuisine).equalTo("city", city).fetch().then(function() {
		var img = objectCollection.instance[0].get('restaurantImage');
		var resturaunt = objectCollection.instance[0].get('resturaunt');
		var phone = objectCollection.instance[0].get('phone');
		var city = objectCollection.instance[0].get('city');
		var address = objectCollection.instance[0].get('address');

		document.getElementById('restaurantImage').src = img; 
		document.getElementById('queryOutputName').innerHTML = resturaunt; 
		document.getElementById('queryOutputPhone').innerHTML = phone; 
		document.getElementById('queryOutputCity').innerHTML = city; 
		document.getElementById('queryOutputAddress').innerHTML = address;

		document.getElementById('queryConsoleCursor').className = "hidden";
		document.getElementById('queryConsoleStatus').className = "";
		document.getElementById('queryHideBody').className = "";
		document.getElementById('queryConsoleBody').innerHTML = 
		"{" + "city:" + " " + "'"+city+"'" + ", " + 
			"cuisine:" + " " + "'"+cuisine+"'" + 
		"}";
		console.log(objectCollection.instance[0].instance);
		document.getElementById('queryHideConsoleRes').className = "";
		document.getElementById('queryConsoleRes').innerHTML = 
		"{" + "__v:" + " " + "'"+objectCollection.instance[0].instance.__v+"'" + ", " + 
			"_id:" + " " + "'"+objectCollection.instance[0].instance._id+"'" + ", " + 
			"comments:" + " " + "'"+objectCollection.instance[0].instance.actions.comments[0].text+"'" + ", " +
			"ratings:" + " " + "'"+objectCollection.instance[0].instance.actions.ratings.avg+"'" + ", " + 
			"votes:" + " " + "'"+objectCollection.instance[0].instance.actions.votes.users+"'" + ", " + 
			"appId:" + " " + "'"+objectCollection.instance[0].instance.appId+"'" + ", " +
			"cobjectId:" + " " + "'"+objectCollection.instance[0].instance.cobjectId+"'" + ", " + 
			"dt_create:" + " " + "'"+objectCollection.instance[0].instance.dt_create+"'" + ", " + 
			"dt_update:" + " " + "'"+objectCollection.instance[0].instance.dt_update+"'" + 
		"}";
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
			document.getElementById('rateConsoleCursor').className = "hidden";
			document.getElementById('rateConsoleStatus').className = "";
			document.getElementById('rateHideBody').className = "";
			document.getElementById('rateConsoleBody').innerHTML = {rate: 5};
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
    				console.log(newReview);
    				document.getElementById('rateOutputReview').innerHTML = newReview;
					document.getElementById('rateConsoleCursor').className = "hidden";
					document.getElementById('rateConsoleStatus').className = "";
					document.getElementById('rateHideBody').className = "";
					document.getElementById('rateConsoleBody').innerHTML = "{comment:" + "'"+userReview + "'" + "}";
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
/* STRIPE - ADD CUSTOMER*/
/*----------------------*/
function addCustomer(){
	var id = document.getElementById('newCustomerIdInput').value;
	var customer = new Stamplay.Stripe();
	customer.createCustomer(id)
	.then(function (res) {
		console.log(res.billingHistory);
		document.getElementById('addCustomerConsoleCursor').className = 'hidden';
		document.getElementById('addCustomerConsoleStatus').className = "";
		document.getElementById('addCustomerConsoleBody').className = "";
		document.getElementById('addCustomerConsoleResponse').className = "";
		document.getElementById('addCustomerInnerBody').innerHTML =  
		"{" + "userId:" + " " + "'"+id+"'" + 
		"}";
		document.getElementById('addCustomerInnerResponse').innerHTML =  
		"{" + "__v:" + " " + "'"+res.__v+"'" + ", " + 
			  "_id:" + " " + "'"+res._id+"'" + ", " + 
			  "appId:" + " " + "'"+res.appId+"'" + ", " + 
			  "billingHistory:" + " " + "'"+res.billingHistory+"'" + ", " + 
			  "customer_id:" + " " + "'"+res.customer_id+"'" + ", " +
			  "dt_create:" + " " + "'"+res.dt_create+"'" + ", " + 
			  "appId:" + " " + "'"+res.appId+"'" + ", " + 
			  "livemode:" + " " + "'"+res.livemode+"'" + ", " + 
			  "subscriptions:" + " " + "'"+res.subscriptions+"'" + ", " +
			  "userId:" + " " + "'"+res.userId+"'" + 
		"}"; 
  		document.getElementById('newCustomerIdOutput').innerHTML = res.customer_id;
  		document.getElementById('newCustomerDtCreateOutput').innerHTML = res.dt_create;
		document.getElementById('newCustomerIdInput').value = "";

	}, function( err ){
  		console.log(err);
	});
}

/*----------------------*/
/* STRIPE - ADD CARD    */
/*----------------------*/
function addCard(){
	var userId = document.getElementById('addCardUserId').value;
	var cardNumber = document.getElementById('cardNumber').value;
	var CVC = document.getElementById('cardCvc').value;
	var expMonth = document.getElementById('cardExp_month').value;
	var expYear = document.getElementById('cardExp_year').value;
	var cardInfo = {
		number: cardNumber,
		cvc: CVC,
		exp_month: expMonth,
		exp_year: expYear
	};

	Stripe.card.createToken(cardInfo, function(status, response){
        if (response.error) {
            console.log('error', response.error);
        } else {
            var token = response.id;
			var customer = new Stamplay.Stripe();
			customer.createCreditCard(userId, token)
			.then(function (res) {
				document.getElementById('addCardConsoleCursor').className = 'hidden';
				document.getElementById('addCardConsoleStatus').className = "";
				document.getElementById('addCardConsoleBody').className = "";
				document.getElementById('addCardConsoleResponse').className = "";
				document.getElementById('addCardInnerBody').innerHTML =
				"{" + "userId:" + " " + "'"+userId+"'" + ", " + 
			  		"token:" + " " + "'"+token+"'" + 
				"}";
				document.getElementById('addCardInnerResponse').innerHTML =  
				"{" + "brand:" + " " + "'"+res.brand+"'" + ", " + 
			  		"card_id:" + " " + "'"+res.card_id+"'" + ", " + 
			  		"country:" + " " + "'"+res.country+"'" + ", " + 
			  		"cvc_check:" + " " + "'"+res.cvc_check+"'" + ", " + 
			  		"exp_month:" + " " + "'"+res.exp_month+"'" + ", " +
			  		"exp_year:" + " " + "'"+res.exp_year+"'" + ", " + 
			  		"fingerprint:" + " " + "'"+res.fingerprint+"'" + ", " + 
			  		"last4:" + " " + "'"+res.last4+"'" + 
				"}";
				document.getElementById('cardBrandOutput').innerHTML = res.brand;
				document.getElementById('cardIdOutput').innerHTML = res.card_id;
				document.getElementById('cardCountryOutput').innerHTML = res.country;
				document.getElementById('cardLast4Output').innerHTML = res.last4;
				document.getElementById('addCardUserId').value = "";
				document.getElementById('cardNumber').value = "";
				document.getElementById('cardCvc').value = "";
				document.getElementById('cardExp_month').value = "";
				document.getElementById('cardExp_year').value = "";
			}, function( err ){
				console.log(err);
			});
		}
	});
}

/*----------------------*/
/* STRIPE - CHARGE CARD */
/*----------------------*/
function chargeCard(){
	var userId = document.getElementById('chargeCardUserId').value;
	var cardNumber = document.getElementById('chargeCardNumber').value;
	var CVC = document.getElementById('chargeCardCvc').value;
	var expMonth = document.getElementById('chargeCardExp_month').value;
	var expYear = document.getElementById('chargeCardExp_year').value;
	var chargeCardInfo = {
		number: cardNumber,
		cvc: CVC,
		exp_month: expMonth,
		exp_year: expYear
	};
	var amount = document.getElementById('chargeCardAmount').value;
	var total = parseInt(amount);
	var currency = document.getElementById('chargeCardCurrency').value;
	Stripe.card.createToken(chargeCardInfo, function(status, response){
        if (response.error) {
            console.log('error', response.error);
        } else {
            var token = response.id;
			var customer = new Stamplay.Stripe();
			customer.charge(userId, token, total, currency)
			.then(function (res) {
				document.getElementById('chargeCardConsoleCursor').className = 'hidden';
				document.getElementById('chargeCardConsoleStatus').className = "";
				document.getElementById('chargeCardConsoleBody').className = "";
				document.getElementById('chargeCardConsoleResponse').className = "";
				document.getElementById('chargeCardInnerBody').innerHTML =
				"{" + "userId:" + " " + "'"+userId+"'" + ", " + 
				      "token:" + " " + "'"+token+"'" + ", " + 
				      "amount:" + " " + "'"+total+"'" + ", " + 
			  		  "currency:" + " " + "'"+currency+"'" + 
				"}"; 
				document.getElementById('chargeCardInnerResponse').innerHTML =  
				"{" + "amount:" + " " + "'"+res.amount+"'" + ", " + 
			  		"amount_refunded:" + " " + "'"+res.amount_refunded+"'" + ", " + 
			  		"application_fee:" + " " + "'"+res.application_fee+"'" + ", " + 
			  		"balance_transaction:" + " " + "'"+res.balance_transaction+"'" + ", " + 
			  		"captured:" + " " + "'"+res.captured+"'" + ", " +
			  		"created:" + " " + "'"+res.created+"'" + ", " + 
			  		"currency:" + " " + "'"+res.currency+"'" + ", " + 
			  		"customer:" + " " + "'"+res.customer+"'" + ", " + 
			  		"currency:" + " " + "'"+res.currency+"'" + ", " + 
			  		"id:" + " " + "'"+res.id+"'" + ", " + 
			  		"livemode:" + " " + "'"+res.livemode+"'" + ", " + 
			  		"object:" + " " + "'"+res.object+"'" + ", " + 
			  		"paid:" + " " + "'"+res.paid+"'" + ", " + 
			  		"reciept_email:" + " " + "'"+res.reciept_email+"'" + ", " + 
			  		"paid:" + " " + "'"+res.paid+"'" + ", " + 
			  		"refunded:" + " " + "'"+res.refunded+"'" + ", " + 
			  		"status:" + " " + "'"+res.status+"'" + 
				"}";
  				document.getElementById('chargeAmount').innerHTML = res.amount;
				document.getElementById('transactionNumber').innerHTML = res.id;
				document.getElementById('transactionTime').innerHTML = res.created;
				document.getElementById('chargeCardUserId').value = "";
				document.getElementById('chargeCardNumber').value = "";
				document.getElementById('chargeCardCvc').value = "";
				document.getElementById('chargeCardExp_month').value = "";
				document.getElementById('chargeCardExp_year').value = "";
				document.getElementById('chargeCardAmount').value = "";
				document.getElementById('chargeCardCurrency').value = "";
			}, function( err ){
  				console.log(err);
			});
		}
	});
}
/*----------------------*/
/* STRIPE - SUBSCRIBE   */
/*----------------------*/
function newSubscription(){
	var userId = document.getElementById('newSubscriptionUserId').value;
	var planId = document.getElementById('newSubscriptionPlanId').value;
	var stamplayStripe = new Stamplay.Stripe();
	stamplayStripe.createSubscription(userId, planId)
	.then(function (res) {
		document.getElementById('newSubscriptionConsoleCursor').className = 'hidden';
		document.getElementById('newSubscriptionConsoleStatus').className = "";
  		document.getElementById('newSubscriptionId').innerHTML = res.id;
		document.getElementById('newSubscriptionPlanStarts').innerHTML = res.current_period_start;
		document.getElementById('newSubscriptionPlanEnds').innerHTML = res.current_period_end;
		document.getElementById('newSubscriptionUserId').value = "";
		document.getElementById('newSubscriptionPlanId').value = "";
	}, function( err ){
  		console.log(err);
	});
}
/*--------------------------------*/
/* STRIPE - UPDATE SUBSCRIPTION   */
/*--------------------------------*/
function updateSubscription(){
	var userId = document.getElementById('updateSubscriptionUserId').value;
	var subscriptionId = document.getElementById('updateSubscriptionId').value;
	var planId = document.getElementById('updatePlanId').value;

	var stamplayStripe = new Stamplay.Stripe();
	stamplayStripe.updateSubscription(userId,subscriptionId,{plan: planId})
	.then(function (res) {
		document.getElementById('updateSubscriptionConsoleCursor').className = 'hidden';
		document.getElementById('updateSubscriptionConsoleStatus').className = "";
		document.getElementById('updateSubscriptionIdOutput').innerHTML = res.id;
		document.getElementById('updateSubscriptionPlanStarts').innerHTML = res.current_period_start;
		document.getElementById('updateSubscriptionPlanEnds').innerHTML = res.current_period_end;
		document.getElementById('updateSubscriptionUserId').value = "";
		document.getElementById('updateSubscriptionId').value = "";
		document.getElementById('updatePlanId').value = "";
	}, function( err ){
  		console.log(err);
	});
}
/*------------------------*/
/* STRIPE - UNSUBSCRIBE   */
/*------------------------*/
function unsubscribe(){
	var userId = document.getElementById('unsubscribeUserId').value;
	var subscriptionId = document.getElementById('unsubscribeSubscriptionId').value;
	console.log(subscriptionId);
	var stamplayStripe = new Stamplay.Stripe();
	stamplayStripe.deleteSubscription(userId, subscriptionId)
	.then(function (res) {
		document.getElementById('unsubscribeConsoleCursor').className = 'hidden';
		document.getElementById('unsubscribeConsoleStatus').className = "";
		document.getElementById('unsubscribeId').innerHTML = res.id;
		document.getElementById('unsubscribeStatus').innerHTML = res.status;
		document.getElementById('unsubscribeCancelDate').innerHTML = res.canceled_at;
		document.getElementById('unsubscribeUserId').value = "";
		document.getElementById('unsubscribeSubscriptionId').value = "";
	}, function( err ){
  		console.log(err);
	});
}

/*----------------------*/
/* GET ALL DATA FOR APP */
/*----------------------*/
window.onload = function(){
	var newUser = new Stamplay.User().Model;
	newUser.currentUser().then(function(){
		if(newUser.isLogged() === true){
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
		var review = resturauntInstance.instance.actions.comments[0].text;
		var ratings = resturauntInstance.instance.actions.ratings.avg;
		var downvotes = resturauntInstance.instance.actions.votes.users_downvote; 
		var img = resturauntInstance.instance.restaurantImage;

		for(var i = 0; i<downvotes.length; i++){
    			downvotes = downvotes.length;
		}
		var upvotes = resturauntInstance.instance.actions.votes.users_upvote;
		for(var j = 0; j<upvotes.length; j++){
    			upvotes = upvotes.length;
		}
		var totalLikes = upvotes - downvotes;
		document.getElementById('rateRestaurant').src = img;
		document.getElementById('rateOutputName').innerHTML = resturaunt;
		document.getElementById('rateOutputReview').innerHTML = review;
		document.getElementById('rateOutputRatings').innerHTML = ratings;
		document.getElementById('rateOutputLikes').innerHTML = totalLikes;
	});
};