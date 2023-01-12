//////////////////////////////////////////////////
////          SETUP DATABSE                   ////
//////////////////////////////////////////////////
//CONSTS/VARS
let database;


$.getJSON(getDatabaseUri(), function(response){
    database = response;
    runWhenJsonIsAvailable();
});


//RUN EVERYTHING ELSE WHEN DATABSE IS READY
function runWhenJsonIsAvailable() {
//////////////////////////////////////////////////
////                SIDEBAR                   ////
//////////////////////////////////////////////////
//CONSTS/VARS
const $sidebar = $('.devices-sidebar');
let $sidebarItems;


//RUN ON LOAD
populateSidebar();


//EVENTS
// $accordionItemsTop.click(function(){
//     handleItemClick($(this))
// });
$sidebarItems.click(function(){
    console.log('hy you clicked me');
});

//FUNCTIONS
function populateSidebar() {
    database.devices.forEach(device => {
        $sidebar.append('<div class="devices-sidebar__item">' + device.name + '</div>');      
    });

    $sidebarItems = $('.devices-sidebar__item');
}

}


