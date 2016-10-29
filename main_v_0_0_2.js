//localStorage.removeItem('progress');

// Initialize the game
var initial_details = JSON.parse(localStorage.getItem("progress"));

if(initial_details !== null){
	switch(initial_details.version){
		case undefined:
			switch(initial_details.clicker_upgrade_a){
				case 1:
					clicker_upgrades.a = 1;
					break;
				default:
					clicker_upgrades.a = 0;
					break
			}
			switch(initial_details.clicker_upgrade_b){
				case 1:
					clicker_upgrades.b = 1;
					break;
				default:
					clicker_upgrades.b = 0;
					break
			}	
			switch(initial_details.clicker_upgrade_c){
				case 1:
					clicker_upgrades.c = 1;
					break;
				default:
					clicker_upgrades.c = 0;
					break
			}	
			switch(initial_details.clicker_upgrade_d){
				case 1:
					clicker_upgrades.d = 1;
					break;
				default:
					clicker_upgrades.d = 0;
					break
			}	
			switch(initial_details.clicker_upgrade_e){
				case 1:
					clicker_upgrades.e = 1;
					break;
				default:
					clicker_upgrades.e = 0;
					break
			}		
			break;

		case "0.0.2":
			clicker_upgrades = initial_details.clicker_upgrades;
			alpha_upgrades = initial_details.alpha_upgrades;
			break;
	}

	currency = initial_details.currency;
	total_earned_currency = initial_details.total_earned_currency;
	total_clicks = initial_details.total_clicks;
	alpha_num = initial_details.alpha_num;
}

update_currency_per_click();

update_value('currency','number');
update_value('currency_per_click','number');
update_value('clicker_upgrade_price_a','price');
update_value('clicker_upgrade_price_b','price');
update_value('clicker_upgrade_price_c','price');
update_value('clicker_upgrade_price_d','price');
update_value('clicker_upgrade_price_e','price');
update_value('alpha_upgrade_price_a','price');
update_value('alpha_upgrade_price_b','price');
update_value('alpha_upgrade_price_c','price');
update_value('alpha_upgrade_price_d','price');
update_value('alpha_upgrade_price_e','price');

if(total_clicks >= 15 && !clicker_upgrades.a){
	show_upgrade("clicker_a");
}
if(total_clicks >= 40 && !clicker_upgrades.b){
	show_upgrade("clicker_b");
}
if(total_clicks >= 125 && !clicker_upgrades.c){
	show_upgrade("clicker_c");
}
if(total_clicks >= 250 && !clicker_upgrades.d){
	show_upgrade("clicker_d");
}
if(total_clicks >= 500 && !clicker_upgrades.e){
	show_upgrade("clicker_e");
}

if(total_earned_currency >= 20){
	show_building("alpha");
}

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

// Alpha Values
update_value('alpha_num','number');
update_cps('alpha');
update_price('alpha');

// Switch from Loadin Screen
switch_display(1); // Set variable to 1 for debug mode

// Update Currency every Second
window.setInterval(function(){
	add_currency(cps_total);
},1000);

//Save every minute
window.setInterval(function(){
	save();
	console.log("Auto-Saved");
},60000)


