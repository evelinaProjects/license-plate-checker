# license-plate-checker

plate-checker is a service which gets an image of an Israeli license plate and returns a decision whether the vehicle may enter the parking lot or not.

Vehicles which are not allowed to enter the parking lot can be identified by the following rules:

a. Public transportation vehicles (their license plates will always end with 25 or 26).

b. Military and law enforcement vehicles (those can be identified by an inclusion of an English alphabet letter within the plate number).

c. Seven digits license plate numbers for which the last two digits are 85/86/87/88/89/00.

d. Gasoline powered vehicles (seven or eight digits license plate numbers with a corresponding digits sum divisible by 7).


* A valid license plate number will be composed of a combination of the following characters: a-z ,  A-Z, 1-9, '-', '\r', '\n', ' '.
  Vehicles with non conforming license plate numbers will not be allowed to enter the parking lot.

### Dependencies

The service makes use of OCR API in order to retrieve an image text.
In addition, the service makes use of MongoDB in order to store it's decisions history.

###  Records history
In order to allow for queries and inspection of past decisions, all the decisions made by the server are saved in MongoDb.
In addition, to ease debugging we also log to a local log file upon various steps of the processing and abnormalities.
Each received image is matched with a locally generated unique id, allowing for easier tracking.

The DB record will include the following fields:
* image name
* plate text
* unique id
* vehicle type
* decision (permitted or not)
* creation timestamp

## Installation

The plate-checker service can be installed through the use of [npm](https://www.npmjs.com/) package manager .

```bash
npm install
```
.env file should be filled with the following fields:

PORT - on which the server is going to listen for incoming requests

MONGODB_URL - database url used by the sever to save it's decisions history

API_KEY - key for OCR API

## Usage

```bash
npm run dev
```

## Example
[postman](https://www.postman.com/) can be used as a client for sending http post requests for the service.

url : http://localhost:PORT/

body : 
* select tab : form-data   
* params :  key - plate (type file) , value - image
* click send
* response : allowed or prohibited

![postman](https://github.com/evelinaProjects/license-plate-checker/blob/master/postman.png?raw=true)



## Tests
* tests folder contains unit tests for the service covering various vehicle type and text validations.
Currently it has a single test file (checker.test.js).
```bash
npm run test
```
* In addition, a list of example plate numbers is supplied in "example of an Israeli license plate" folder, covering both positive and negative cases.
