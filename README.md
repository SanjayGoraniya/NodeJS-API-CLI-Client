# NodeJS API CLI Client

## Introduction

This is a Node.js command-line interface (CLI) program that can be executed with specific commands and arguments. The program interacts with a local API endpoint to perform various tasks related to device and room management.

## Requirements

### To run this program, you will need the following:

-   Node.js can be installed on your machine from the official website: [https://nodejs.org](https://nodejs.org/).
-   There are multiple API endpoints available to interact with. For documentation and source code, please refer to their respective [GitHub repository](https://github.com/Urban-Data-Collective/udc-challenge-backend).
-   Please run the API backend and ensure that you are using a valid authorisation token to access the API.

## Getting Started

### To use this program, follow these steps:

1.  Clone this repository to your local machine.
2.  Install the required dependencies by running `npm install` in your terminal or command prompt.
3.  Replace the `apiUrl` and `apiToken` variables in the code with your own API endpoint and authorization token.
4.  Execute the program by running `node index.js` followed by one of the available commands and their arguments.

## Available Commands

### The program supports the following commands:

-   `version`: Prints the name and version of the application.

    Usage: `node index.js version`

-   `device-count`: Retrieves all devices from the API and prints the count of devices to the console.
    
    Usage: `node index.js device-count`

-   `timeout-devices <threshold>`: Retrieves all devices from the API and filters them based on their response time. Prints the UUIDs of timed out devices to the console if any.

    Usage: `node index.js timeout-devices <threshold>`

    Example: `node index.js timeout-devices 500`

-   `register-device <device-uuid> <room-uuid>`: Registers a device with the given UUID in the specified room by sending a POST request to the API.

    Usage: `node index.js register-device <device-uuid> <room-uuid>`

    Example: `node index.js register-device 0a44aecf-95e7-4182-8f70-83592c8c7ecd b84bdc5f-551e-4e2d-a382-2c0f743b6c78`

## Common Issues

1.  If you encounter an error that says `Error fetching device count` or `Error fetching devices`, make sure that the API endpoint specified in the program is running and accessible.
2.  If you encounter an error that says `Invalid device UUID` or `Invalid room UUID`, make sure that the UUIDs specified in the `register-device` command are valid and follow the correct format.
3.  If you encounter an error that says `Please provide a valid threshold`, make sure that the `threshold` argument specified in the `timeout-devices` command is a positive number.

## Conclusion

This Node.js CLI program provides a simple way to interact with an API through a command-line interface. By following the steps outlined in this document, you can easily get started with using this program and executing the available commands.