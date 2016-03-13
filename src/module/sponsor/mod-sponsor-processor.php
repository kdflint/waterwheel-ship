<?php

require_once("../core/domain/Util.php");

$sponsor;
$testMode = FALSE;

// POST to database

if (isset($_POST['stripeToken']) && strlen($_POST['stripeToken'] > 0)) {
	require_once('../../../vendor/autoload.php');	
	// Set your secret key: remember to change this to your live secret key in production
	// See your keys here https://dashboard.stripe.com/account
	\Stripe\Stripe::setApiKey("sk_test_ePru1B8y6aLF5EzQw9NiKDUE");
		
	// Get the credit card details submitted by the form
	$token = $_POST['stripeToken'];
	
	// Create the charge on Stripe's servers - this will charge the user's card
	try {
		$charge = Charge::create(array(
	  	"amount" => 1000, // amount in cents, again
	  	"currency" => "usd",
	  	"source" => $token,
	  	"description" => "payinguser@example.com"
	  	)
		);
	} catch(Card $e) {
	  // The card has been declined
	}
} else if (true) {
	//paypal condition
}

var_dump($_POST);

?>