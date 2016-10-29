// Currency Variables
var currency = 0;
var total_earned_currency = 0;

// Clicker Variables
var currency_per_click = 1;
var total_clicks = 0;

// Clicker Upgrade Prices
var clicker_upgrade_price = new Object();
clicker_upgrade_price.a = 30;
clicker_upgrade_price.b = 100;
clicker_upgrade_price.c = 500;
clicker_upgrade_price.d = 1000;
clicker_upgrade_price.e = 2000;

// Clicker Upgrades Owned
var clicker_upgrades = new Object();
clicker_upgrades.a = 0;
clicker_upgrades.b = 0;
clicker_upgrades.c = 0;
clicker_upgrades.d = 0;
clicker_upgrades.e = 0; 

// Displayed Buildings
var buildings_displayed = new Object();
buildings_displayed.alpha = 0;

// Alpha Variables
var alpha_initial_cps = .5

var alpha_num = 0;
var alpha_current_cps = alpha_initial_cps;
var cps_alpha = 0;

// Alpha Prices
var alpha_initial_price = 25;

var alpha_prices = [];
alpha_prices[1] = alpha_initial_price;
alpha_prices[10] = alpha_prices[1] * (1- Math.pow(1.15,10)) / (1 - 1.15);
alpha_prices[100] = alpha_prices[1] * (1- Math.pow(1.15,100)) / (1 - 1.15);

// Alpha Upgrade Prices
var alpha_upgrade_price = new Object();
alpha_upgrade_price.a = 50;
alpha_upgrade_price.b = 250;
alpha_upgrade_price.c = 750;
alpha_upgrade_price.d = 1500;
alpha_upgrade_price.e = 3000;

// ALpha Upgrades Owned
var alpha_upgrades = new Object();
alpha_upgrades.a = 0;
alpha_upgrades.b = 0;
alpha_upgrades.c = 0;
alpha_upgrades.d = 0;
alpha_upgrades.e = 0;

// Currency Per Second
var cps_total = 0;