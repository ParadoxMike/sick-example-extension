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
$sidebarItems.click(function(){
    populateDeviceView(this.dataset.partnumber);
});

//FUNCTIONS
function populateSidebar() {
    database.devices.forEach(device => {
        $sidebar.append('<div class="devices-sidebar__item" data-partnumber="' + device.partNumber + '"><p>' + device.name + '</p></div>');      
    });

    $sidebarItems = $('.devices-sidebar__item');
}


//////////////////////////////////////////////////
////              DEVICE VIEW                 ////
//////////////////////////////////////////////////
//CONSTS/VARS
const $deviceViewHead = $('.device-view__head');
const $deviceViewCompatibeFirmware = $('.device-view__compatible-firmware');



//FUNCTIONS
function populateDeviceView(partNumber) {
    populateDeviceViewHead(partNumber);

    clearCompatibleFirmwareList();
    populateCompatibleFirmwareList(partNumber);
}

function populateDeviceViewHead(partNumber) {
    const device = getDevice(partNumber);
    const imgBaseUri = getImgBaseUri();

    $deviceViewHead.html(`
        <div class="device-view__head-info">
            <p>${device.name}</p>
            <p>Part number: ${device.partNumber}</p>
            <p>Communication interface: ${device.communicationInterface}</p>
            <p>Weight: ${device.weight}</p>
        </div>
        <div class="device-view__head-img-container">
            <img class="device-view__head-img" src="${imgBaseUri}/${device.id}.png" alt="picture of the sensor">
        </div>
    `);
}

function getDevice(partNumber) {
    let foundDevice;

    database.devices.forEach(device => {
        if (device.partNumber == partNumber) {
            foundDevice = device;
        }
    });

    return foundDevice;
}

function populateCompatibleFirmwareList(partNumber) {
    const allCompatibleFirmware = getCompatibleFirmeware(partNumber);

    allCompatibleFirmware.forEach(compatibleFirmware => {
        $deviceViewCompatibeFirmware.append(`
        <div class="divice-view__compatible-firmware-entry">
            <div class="divice-view__compatible-firmware-entry_version">
                <p>${compatibleFirmware.version}</p>
            </div>
            <div class="divice-view__compatible-firmware-entry_date">
                <p>-</p>
            </div>
            <div class="divice-view__compatible-firmware-entry_url">
                <a href="${compatibleFirmware.downloadUrl}">DOWNLOAD</a>
            </div>
        </div>
        `);
    });
}

function clearCompatibleFirmwareList() {
    $deviceViewCompatibeFirmware.children('.divice-view__compatible-firmware-entry').remove();
}

function getCompatibleFirmeware(partNumber) {
    let compatibleFirmware = [];

    database.firmware.forEach(firmware => {
        let compatible = false;

        firmware.compatiblePartNumbers.forEach(currentPartNumber => {
            if (currentPartNumber == partNumber) {
                compatible = true;
            }
        });

        if (compatible) {
            compatibleFirmware.push(firmware);
        }
    });

    return compatibleFirmware;
}

}


