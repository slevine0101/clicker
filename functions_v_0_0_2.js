// Add Currency functions
function add_currency(number){
	currency += number;
	if(number > 0){
		total_earned_currency += number;
	}

	update_value('currency', 'number');

	if(total_earned_currency >= 20 && !buildings_displayed['alpha']){
		show_building('alpha');
	}
}


// Click functions
function clicker(){
	add_currency(currency_per_click);
	total_clicks++;

	switch(total_clicks){
		case 15: 
			show_upgrade('clicker_a');
			break;
		case 40:
			show_upgrade('clicker_b');
			break;
		case 125:
			show_upgrade('clicker_c');
			break;
		case 250:
			show_upgrade('clicker_d');
			break;
		case 500:
			show_upgrade('clicker_e');
			break;
	}
}

function clicker_upgrade(upgrade){
	cost = clicker_upgrade_price[upgrade];

	if(cost <= currency){
		clicker_upgrades[upgrade] = 1;
		add_currency(-cost);
		hide_upgrade('clicker_' + upgrade);

		update_currency_per_click();
		update_value('currency_per_click');
	}
}

function update_currency_per_click(){
	base_click = 1 + clicker_upgrades.a + clicker_upgrades.b + clicker_upgrades.c + clicker_upgrades.d;
	click_multiplier = clicker_upgrades.e;
	currency_per_click = base_click * Math.pow(2,click_multiplier);
}

// Alpha functions
function add_alpha(number){
	var cost = alpha_prices[number];

	if(cost <= currency){
		alpha_num += number;
		add_currency(-cost);

		update_price('alpha');
		update_value('alpha_num','number');
		update_cps('alpha');

		if(alpha_num >= 5 && !alpha_upgrades.a){
			show_upgrade("alpha_a");
		}
		if(alpha_num >= 10 && !alpha_upgrades.b){
			show_upgrade("alpha_b");
		}
		if(alpha_num >= 25 && !alpha_upgrades.c){
			show_upgrade("alpha_c");
		}
		if(alpha_num >= 50 && !alpha_upgrades.d){
			show_upgrade("alpha_d");
		}
		if(alpha_num >= 100 && !alpha_upgrades.e){
			show_upgrade("alpha_e");
		}
	}


}

function alpha_upgrade(upgrade){
	cost = alpha_upgrade_price[upgrade];

	if(cost <= currency){
		alpha_upgrades[upgrade] = 1;
		add_currency(-cost);
		hide_upgrade('alpha_' + upgrade);
		update_cps('alpha');
	}
}

// Number functions
function display_number(number,type){
	var output = 0;
	
	if(number < 1000 && type != 'price'){
		output = Math.round(number*10)/10;
	} 
	else if(number < 1000000){
		output = Math.round(number);
	}
	else if(number < 1000000000){
		output = Math.round(number/10000)/100 + ' Million'
	}
	else if(number < 1000000000000){
		output = Math.round(number/10000000)/100 + ' Billion';
	}
	else if(number < 1000000000000000){
		output = Math.round(number/10000000000)/100 + ' Trillion';
	}
	else{
		output = '>= 1 Quadrillion';
	}

	return output.toLocaleString();
}

// Functions to update variables
function update_price(price_to_update){
	switch(price_to_update){
		case 'alpha':
			alpha_prices[1] = alpha_initial_price * Math.pow(1.15, alpha_num);
			alpha_prices[10] = alpha_prices[1] * (1 - Math.pow(1.15, 10)) / (1 - 1.15);
			alpha_prices[100] = alpha_prices[1] * (1 - Math.pow(1.15, 100)) / (1 - 1.15);

			update_value('price_alpha_1','price');
			update_value('price_alpha_10','price')
			update_value('price_alpha_100', 'price');
	}
}

function update_cps(cps_to_update){
	switch(cps_to_update){
		case 'alpha':
			total_alpha_upgrades = alpha_upgrades.a + alpha_upgrades.b + alpha_upgrades.c + alpha_upgrades.d + alpha_upgrades.e;
			alpha_current_cps = alpha_initial_cps * Math.pow(2,total_alpha_upgrades);
			cps_alpha = alpha_current_cps * alpha_num;
			update_value('cps_alpha', 'number');
			break;
	}
	
	cps_total = cps_alpha;
	update_value('cps_total', 'number');
}

function update_all_cps(){
	update_cps('alpha');
}

function update_value(value_to_update,value_type){
	var value = 0;

	switch(value_to_update){
		case 'currency':
			value = currency;
			break;
		case 'currency_per_click':
			value = currency_per_click;
			break;
		case 'clicker_upgrade_price_a':
			value = clicker_upgrade_price.a
			break;
		case 'clicker_upgrade_price_b':
			value = clicker_upgrade_price.b
			break;
		case 'clicker_upgrade_price_c':
			value = clicker_upgrade_price.c
			break;
		case 'clicker_upgrade_price_d':
			value = clicker_upgrade_price.d
			break;
		case 'clicker_upgrade_price_e':
			value = clicker_upgrade_price.e
			break;
		case 'price_alpha_1':
			value = alpha_prices[1];
			break;
		case 'price_alpha_10':
			value = alpha_prices[10];
			break;
		case 'price_alpha_100':
			value = alpha_prices[100];
			break;
		case 'alpha_num':
			value = alpha_num;
			break;
		case 'alpha_upgrade_price_a':
			value = alpha_upgrade_price.a
			break;
		case 'alpha_upgrade_price_b':
			value = alpha_upgrade_price.b
			break;
		case 'alpha_upgrade_price_c':
			value = alpha_upgrade_price.c
			break;
		case 'alpha_upgrade_price_d':
			value = alpha_upgrade_price.d
			break;
		case 'alpha_upgrade_price_e':
			value = alpha_upgrade_price.e
			break;
		case 'alpha_current_cps':
			value = alpha_current_cps;
			break;
		case 'cps_alpha':
			value = cps_alpha;
			break;
		case 'cps_total':
			value = cps_total;
			break;
	}

	document.getElementById(value_to_update).innerHTML = display_number(value,value_type);
}

// Function to show and hide upgrades
function show_upgrade(upgrade){
	document.getElementById(upgrade).style.display='inline';
}

function hide_upgrade(upgrade){
	document.getElementById(upgrade).style.display='none';
}

function hide_all_upgrades(){
	hide_upgrade('clicker_a');
	hide_upgrade('clicker_b');
	hide_upgrade('clicker_c');
	hide_upgrade('clicker_d');
	hide_upgrade('clicker_e');
	hide_upgrade('alpha_a');
	hide_upgrade('alpha_b');
	hide_upgrade('alpha_c');
	hide_upgrade('alpha_d');
	hide_upgrade('alpha_e');	
}

// Function to show aand hide building divs
function show_building(building){
	document.getElementById(building+'_tab').style.display='inline-block';
	buildings_displayed[building] = 1;
}

function hide_building(building){
	document.getElementById(building+'_tab').style.display='none';
	buildings_displayed[building] = 0;
}

function hide_all_buildings(){
	hide_building('alpha');
}



// Initializing Function
function switch_display(debug){
	document.getElementById('loader').style.display='none';
	document.getElementById('game').style.display='inline-block';

	if(debug){
		document.getElementById('debug_menu').style.display = 'block';
	}
}

// Save Functions
function save(){
	var progress = {
		version: '0.0.2',
		currency: currency,
		total_earned_currency: total_earned_currency,
		total_clicks: total_clicks,
		clicker_upgrades: clicker_upgrades,
		alpha_num: alpha_num,
		alpha_upgrades: alpha_upgrades,
	}

	localStorage.setItem('progress',JSON.stringify(progress));
}

function delete_save(){
	localStorage.removeItem('progress');
	currency = 0;
	total_earned_currency = 0;
	total_clicks = 0;
	clicker_upgrades.a = 0;
	clicker_upgrades.b = 0;
	clicker_upgrades.c = 0;
	clicker_upgrades.d = 0;
	clicker_upgrades.e = 0;
	alpha_num = 0;
	alpha_upgrades.a = 0;
	alpha_upgrades.b = 0;
	alpha_upgrades.c = 0;
	alpha_upgrades.d = 0;
	alpha_upgrades.e = 0;

	update_value('currency', 'number');
	update_price('alpha');
	update_value('alpha_num', 'number');
	update_all_cps();
	hide_all_upgrades()
	hide_all_buildings();
}

// Debug Functions
function add_alpha_debug(number){
	alpha_num += number;

	update_price('alpha');
	update_value('alpha_num', 'number');
	update_cps('alpha');

	if(alpha_num >= 5 && !alpha_upgrades.a){
		show_upgrade("alpha_a");
	}
	if(alpha_num >= 10 && !alpha_upgrades.b){
		show_upgrade("alpha_b");
	}
	if(alpha_num >= 25 && !alpha_upgrades.c){
		show_upgrade("alpha_c");
	}
	if(alpha_num >= 50 && !alpha_upgrades.d){
		show_upgrade("alpha_d");
	}
	if(alpha_num >= 100 && !alpha_upgrades.e){
		show_upgrade("alpha_e");
	}
}

function add_clicks(number){
	total_clicks += number;

	if(total_clicks >= 15){
		show_upgrade('clicker_a');
	}
	if(total_clicks >= 40){
		show_upgrade('clicker_b');
	}
	if(total_clicks >= 125){
		show_upgrade('clicker_c');
	}
	if(total_clicks >= 250){
		show_upgrade('clicker_d');
	}
	if(total_clicks >= 500){
		show_upgrade('clicker_e');
	}
}
