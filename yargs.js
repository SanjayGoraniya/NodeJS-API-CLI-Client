#!/usr/bin/env node

const yargs = require("yargs");
const api = require("./src/api");
const { validateUuid } = require("./src/utils");
const { name, version } = require("./package.json");

// version command
function printVersion() {
  // Logs a message with the name and version of the application
  console.log(`${name} version ${version}`);
}

// device-count command
async function deviceCount() {
  try {
    // Send a GET request to retrieve all devices from the API
    const response = await api.get(`/devices`);

    // Log the count of devices retrieved from the API to the console
    console.log(`Device count: ${response.data.length}`);
  } catch (error) {
    // If an error occurs during the API call, log the error message to the console
    console.error(`Error fetching device count: ${error}`);
  }
}

// timeout-devices command
async function timeoutDevices(argv) {
  const { threshold } = argv;
  // Check if threshold is valid
  if (!threshold || isNaN(threshold) || threshold < 0) {
    console.log("Please provide a valid threshold (a positive number)");
    return;
  }

  try {
    // Fetch devices data from the API
    const response = await api.get(`/devices`);
    // Filter devices based on their response time
    const timedOutDevices = response.data.filter(
      device => device.responseTime > threshold
    );
    // Check if any devices have timed out
    if (timedOutDevices.length > 0) {
      // Print the UUIDs of timed out devices
      console.log(
        `Timed out devices: ${timedOutDevices
          .map(device => device.uuid)
          .join(", ")}`
      );
    } else {
      // Print a message if no devices have timed out
      console.log("No devices have timed out");
    }
  } catch (error) {
    // Print an error message if there's an error fetching devices data from the API
    console.error(`Error fetching devices: ${error}`);
  }
}

// register-device command
async function registerDevice({
  "device-uuid": deviceUuid,
  "room-uuid": roomUuid
}) {
  // Check if the device UUID is valid
  if (!validateUuid(deviceUuid)) {
    console.error("Error: Invalid device UUID");
    return;
  }

  // Check if the room UUID is valid
  if (!validateUuid(roomUuid)) {
    console.error("Error: Invalid room UUID");
    return;
  }

  try {
    // Fetch the device with the given UUID from the API
    const deviceResponse = await api.get(`/devices/${deviceUuid}`);
    const currentDevice = deviceResponse.data;

    // Check if the device is already registered in the given room
    if (
      currentDevice &&
      currentDevice.room &&
      currentDevice.room.uuid &&
      currentDevice.room.uuid === roomUuid
    ) {
      console.log(
        `Device ${deviceUuid} is already registered in room ${roomUuid}`
      );
      return;
    }

    // Register the device in the given room by sending a POST request to the API
    await api.post(`/rooms/${roomUuid}/devices`, {
      uuid: deviceUuid
    });

    // Log a success message if the device was registered successfully
    console.log(`Device ${deviceUuid} registered in room ${roomUuid}`);
  } catch (error) {
    // Log an error message if there was an error while registering the device
    console.error(`Error registering device: ${error.message}`);
  }
}

// Parse command line arguments
yargs
  .command({
    command: "version",
    describe: "Prints the version of the application",
    handler: printVersion
  })
  .command({
    command: "device-count",
    describe: "Prints the number of registered devices in the building",
    handler: deviceCount
  })
  .command({
    command: "timeout-devices",
    describe:
      "Prints list of the UUIDs of all the devices that have a response time above the given threshold",
    builder: {
      threshold: {
        describe: "Threshold value for response time (in ms)",
        demandOption: true,
        type: "number",
        float: true
      }
    },
    handler: timeoutDevices
  })
  .command({
    command: "register-device",
    describe: "Registers a device in a room",
    builder: {
      "device-uuid": {
        describe: "UUID of the device to register",
        demandOption: true,
        type: "string"
      },
      "room-uuid": {
        describe: "UUID of the room where the device should be registered",
        demandOption: true,
        type: "string"
      }
    },
    handler: registerDevice
  })
  .help()
  .version(false).argv;
