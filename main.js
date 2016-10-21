// Initialize the game

var alpha_initial_price = 50;
var alpha_initial_cps = .1;
var clicker_upgrade_a_price = 30; //+1 30 clicks
var clicker_upgrade_b_price = 100; //+1 50 clicks
var clicker_upgrade_c_price = 500; //+1 167 clicks
var clicker_upgrade_d_price = 1000; //+1 250 clicks
var clicker_upgrade_e_price = 2000; //*2 400 clicks

var initial_details = JSON.parse(localStorage.getItem("progress"));

if (initial_details == null){
	var currency = 0;
	var alpha_num = 0;
	var currency_per_click = 1;
	var total_earned_currency = 0;
	var alpha_displayed = 0;
	var total_clicks = 0;
	var clicker_upgrade_a = 0;
}
else{
	var currency = initial_details.currency;
	var alpha_num = initial_details.alpha_num;
	var currency_per_click = initial_details.currency_per_click;
	var total_earned_currency = initial_details.total_earned_currency;
	var total_clicks = initial_details.total_clicks;
	var clicker_upgrade_a = initial_details.clicker_upgrade_a;
	var clicker_upgrade_b = initial_details.clicker_upgrade_b;
	var clicker_upgrade_c = initial_details.clicker_upgrade_c;
	var clicker_upgrade_d = initial_details.clicker_upgrade_d;
	var clicker_upgrade_e = initial_details.clicker_upgrade_e;	

	if(total_clicks >= 15 && !clicker_upgrade_a) show_upgrade("clicker_upgrade_a");
	if(total_clicks >= 40 && !clicker_upgrade_b) show_upgrade("clicker_upgrade_b");
	if(total_clicks >= 125 && !clicker_upgrade_c) show_upgrade("clicker_upgrade_c");
	if(total_clicks >= 250 && !clicker_upgrade_d) show_upgrade("clicker_upgrade_d");
	if(total_clicks >= 500 && !clicker_upgrade_e) show_upgrade("clicker_upgrade_e");

	if(total_earned_currency >= 20) show_building("alpha");
	else var alpha_displayed = 0;
}

// Clicker Values
update_value('clicker_upgrade_a_price');
update_value('clicker_upgrade_b_price');
update_value('clicker_upgrade_c_price');
update_value('clicker_upgrade_d_price');
update_value('clicker_upgrade_e_price');

// Alpha Values
update_price('alpha');
update_cps('alpha');


// Update Displayed Values
update_value('currency');
update_value('alpha_num');

// Switch from Loadin Screen
switch_display(1); // Set variable to 1 for debug mode


// Update Currency every Second
window.setInterval(function(){
	add_currency(cps_total);
},1000);


// Add Currency functions
function add_currency(number){
	currency += number;
	if(number > 0) total_earned_currency += number;
	update_value("currency");

	if(total_earned_currency >= 20 && alpha_displayed !== 1) show_building("alpha");
}


// Click functions
function clicker(){
	add_currency(currency_per_click);
	total_clicks++;
	if(total_clicks == 15) show_upgrade("clicker_upgrade_a");
	if(total_clicks == 40) show_upgrade("clicker_upgrade_b");
	if(total_clicks == 125) show_upgrade("clicker_upgrade_c");
	if(total_clicks == 250) show_upgrade("clicker_upgrade_d");
	if(total_clicks == 500) show_upgrade("clicker_upgrade_e");
}

function clicker_upgrade(upgrade){
	if(upgrade == "a" && clicker_upgrade_a_price <= currency){
		currency_per_click += 1;
		add_currency(-clicker_upgrade_a_price);
		hide_upgrade("clicker_upgrade_a");
		clicker_upgrade_a = 1;
	}
	else if(upgrade == "b" && clicker_upgrade_b_price <= currency){
		currency_per_click += 1;
		add_currency(-clicker_upgrade_b_price);
		hide_upgrade("clicker_upgrade_b");
		clicker_upgrade_b = 1;
	}
	else if(upgrade == "c" && clicker_upgrade_c_price <= currency){
		currency_per_click += 1;
		add_currency(-clicker_upgrade_c_price);
		hide_upgrade("clicker_upgrade_c");
		clicker_upgrade_c = 1;
	}
	else if(upgrade == "d" && clicker_upgrade_d_price <= currency){
		currency_per_click += 1;
		add_currency(-clicker_upgrade_d_price);
		hide_upgrade("clicker_upgrade_d");
		clicker_upgrade_d = 1;
	}
	else if(upgrade == "e" && clicker_upgrade_e_price <= currency){
		currency_per_click *= 2;
		add_currency(-clicker_upgrade_e_price);
		hide_upgrade("clicker_upgrade_e");
		clicker_upgrade_e = 1;
	}
}

// Alpha functions
function add_alpha(number){
	var cost = 0;

	if(number === 1) cost = price_alpha_1;
	else if(number === 10) cost = price_alpha_10;
	else if(number === 100) cost = price_alpha_100;

	if(cost <= currency){
		alpha_num += number;
		add_currency(-cost);

		update_price("alpha");
		update_value("alpha_num");
		update_cps("alpha");
	}
}

// Number functions
function display_number(number){
	var output = 0;
	
	if(number < 1000) output = Math.round(number*10)/10;
	else if(number < 1000000) output = Math.round(number);
	else if(number < 1000000000) output = Math.round(number/10000)/100 + " Million"
	else if(number < 1000000000000) output = Math.round(number/10000000)/100 + " Billion";
	else output = '>= 1 Trillion';

	return output.toLocaleString();
}

function display_price(number){
	if(number < 1000000) output = Math.round(number);
	else if(number <1000000000) output = Math.round(number/10000)/100 + " Million";
	else if(number <1000000000000) output = Math.round(number/10000000)/100 + " Billion";
	else output = '>= 1 Trillion';

	return output.toLocaleString();
}

// Save Functions
function manual_save(){
	var progress = {
		currency: currency,
		alpha_num: alpha_num,
		currency_per_click: currency_per_click,
		total_earned_currency: total_earned_currency,
		total_clicks: total_clicks,
		clicker_upgrade_a: clicker_upgrade_a,
		clicker_upgrade_b: clicker_upgrade_b,
		clicker_upgrade_c: clicker_upgrade_c,
		clicker_upgrade_d: clicker_upgrade_d,
		clicker_upgrade_e: clicker_upgrade_e
	}

	localStorage.setItem("progress",JSON.stringify(progress));
}

function load_save(){
	var saved_progress = JSON.parse(localStorage.getItem("progress"));
}

function delete_save(){
	localStorage.removeItem("progress");
	currency = 0;
	alpha_num = 0;	
	currency_per_click = 1;
	total_earned_currency = 0;
	alpha_displayed = 0;
	total_clicks = 0;
	clicker_upgrade_a = 0;
	clicker_upgrade_b = 0;
	clicker_upgrade_c = 0;
	clicker_upgrade_d = 0;
	clicker_upgrade_e = 0;

	update_price("alpha");
	update_value("currency");
	update_value("alpha_num");
	update_cps("alpha");
	hide_building("alpha");
	hide_upgrade("clicker_upgrade_a");
	hide_upgrade("clicker_upgrade_b");
	hide_upgrade("clicker_upgrade_c");
	hide_upgrade("clicker_upgrade_d");
	hide_upgrade("clicker_upgrade_e");
}

// Functions to update variables
function update_price(price_to_update){
	if(price_to_update == 'alpha'){
		price_alpha_1 = alpha_initial_price * Math.pow(1.15, alpha_num);
		price_alpha_10 = price_alpha_1 * (1 - Math.pow(1.15, 10)) / (1 - 1.15);
		price_alpha_100 = price_alpha_1 * (1 - Math.pow(1.15, 100)) / (1 - 1.15);

		update_value('price_alpha_1');
		update_value('price_alpha_10');
		update_value('price_alpha_100');
	}
}

function update_cps(cps_to_update){
	if(cps_to_update == 'alpha'){
		alpha_current_cps = alpha_initial_cps; // change for upgrades
		cps_alpha = alpha_current_cps * alpha_num;
		update_value('cps_alpha');
	} 
	
	cps_total = cps_alpha;
	update_value('cps_total');
}

function update_value(value_to_update){
	if(value_to_update == 'currency') document.getElementById("currency").innerHTML = display_number(currency); 
	else if(value_to_update == 'currency_per_click') document.getElementById("currency_per_click").innerHTML = display_number(currency_per_click);
	else if(value_to_update == 'alpha_num') document.getElementById("alpha_num").innerHTML = display_number(alpha_num);
	else if(value_to_update == 'price_alpha_1') document.getElementById("price_alpha_1").innerHTML = display_price(price_alpha_1);
	else if(value_to_update == 'price_alpha_10') document.getElementById("price_alpha_10").innerHTML = display_price(price_alpha_10);
	else if(value_to_update == 'price_alpha_100') document.getElementById("price_alpha_100").innerHTML = display_price(price_alpha_100);
	else if(value_to_update == 'currency_per_alpha') document.getElementById("currency_per_alpha").innerHTML = display_number(currency_per_alpha);
	else if(value_to_update == 'cps_alpha') document.getElementById("cps_alpha").innerHTML = display_number(cps_alpha);
	else if(value_to_update == 'cps_total') document.getElementById("cps_total").innerHTML = display_number(cps_total);
	else if(value_to_update == 'clicker_upgrade_a_price') document.getElementById("clicker_upgrade_a_price").innerHTML = display_number(clicker_upgrade_a_price);
	else if(value_to_update == 'clicker_upgrade_b_price') document.getElementById("clicker_upgrade_b_price").innerHTML = display_number(clicker_upgrade_b_price);
	else if(value_to_update == 'clicker_upgrade_c_price') document.getElementById("clicker_upgrade_c_price").innerHTML = display_number(clicker_upgrade_c_price);
	else if(value_to_update == 'clicker_upgrade_d_price') document.getElementById("clicker_upgrade_d_price").innerHTML = display_number(clicker_upgrade_d_price);
	else if(value_to_update == 'clicker_upgrade_e_price') document.getElementById("clicker_upgrade_e_price").innerHTML = display_number(clicker_upgrade_e_price);
}

// Function to show aand hide building divs
function show_building(building){
	if(building  == "alpha"){
		document.getElementById("alpha_total").style.display="block";
		document.getElementById("alpha_buy").style.display="block";
		var alpha_displayed = 1;
	}
}

function hide_building(building){
	if(building  == "alpha"){
		document.getElementById("alpha_total").style.display="none";
		document.getElementById("alpha_buy").style.display="none";
		var alpha_displayed = 0;
	}
}

// Function to show and hide upgrades
function show_upgrade(upgrade){
	if(upgrade == "clicker_upgrade_a") document.getElementById("clicker_upgrade_a").style.display="inline";
	if(upgrade == "clicker_upgrade_b") document.getElementById("clicker_upgrade_b").style.display="inline";
	if(upgrade == "clicker_upgrade_c") document.getElementById("clicker_upgrade_c").style.display="inline";
	if(upgrade == "clicker_upgrade_d") document.getElementById("clicker_upgrade_d").style.display="inline";
	if(upgrade == "clicker_upgrade_e") document.getElementById("clicker_upgrade_e").style.display="inline";
}

function hide_upgrade(upgrade){
	if(upgrade == "clicker_upgrade_a") document.getElementById("clicker_upgrade_a").style.display="none";
	if(upgrade == "clicker_upgrade_b") document.getElementById("clicker_upgrade_b").style.display="none";
	if(upgrade == "clicker_upgrade_c") document.getElementById("clicker_upgrade_c").style.display="none";
	if(upgrade == "clicker_upgrade_d") document.getElementById("clicker_upgrade_d").style.display="none";
	if(upgrade == "clicker_upgrade_e") document.getElementById("clicker_upgrade_e").style.display="none";
}

// Initializing Function
function switch_display(debug){
	document.getElementById("loader").style.display="none";
	document.getElementById("game").style.display="block";

	if(debug){
		document.getElementById("debug_menu").style.display = "block";
	}
}


// Debug Functions
function add_alpha_debug(number){
	alpha_num += number;

	update_price('alpha');
	update_value('alpha_num');
	update_cps('alpha');
}