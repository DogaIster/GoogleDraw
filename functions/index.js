'use strict';

var firebase = require("@firebase/app").default;
require('@firebase/storage');

var config = {
    apiKey: 'AIzaSyBOuRnP1AIWN0GFQY3C_rIC3OBf_JSafSw',
    authDomain: 'draw-90fef.firebaseapp.com',
    databaseURL: "https://draw-90fef.firebaseio.com",
    storageBucket: 'draw-90fef.appspot.com'
};

firebase.initializeApp(config);

const functions =require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp =require('actions-on-google').DialogflowApp; // Google Assistant helper library

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    console.log('Dialogflow Request headers: '+JSON.stringify(request.headers));
    console.log('Dialogflow Request body: '+JSON.stringify(request.body));
    const app = new DialogflowApp({request,response});
    const actionMap = new Map();
    actionMap.set('draw.line', setCanvas);
    actionMap.set('open.new', newCanvas);
    app.handleRequest(actionMap);

var PImage = require('pureimage');
var fs = require("fs")

var img = PImage.make(1210,1210);
var ctx = img.getContext('2d');

function newCanvas(app){
  //app.userStorage.imageLineCount=1;
  // app.ask("Okay, we'll start fresh!");
  app.userStorage.imageLineCount = 1;


var pathReference = "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image0.png?alt=media&token=c2c99276-ce86-4d25-a01a-260e1cafac73";
  app.ask(app.buildRichResponse()
    .addSimpleResponse("Okay, we'll start fresh! What would you like to do next?")
    .addBasicCard(app.buildBasicCard('')
      .setImage(pathReference, 'Image alternate text')
  ));
}

function setCanvas(app){

  var arr_url = [
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image0.png?alt=media&token=c2c99276-ce86-4d25-a01a-260e1cafac73",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image1.png?alt=media&token=655b6db5-80ac-42e0-b1e5-75becf11566b",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image2.png?alt=media&token=7da58caf-ab16-4de3-8c0b-2194575c25e4",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image3.png?alt=media&token=9ec5dddb-f115-4aea-ad1b-64ad78a575b6",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image4.png?alt=media&token=7cddd78e-43f2-4fca-8d69-a4ce63d1c9e8",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image5.png?alt=media&token=12499cc2-286f-40ac-84be-99590c90d64c",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image6.png?alt=media&token=239563b3-6020-492e-abb2-13e89b00d096",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image7.png?alt=media&token=4ab626f5-a6b5-4d6f-9a0d-eaf2ab7396cb",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image8.png?alt=media&token=c1dd326a-b357-41a0-9d3a-d9a153147786",
    "https://firebasestorage.googleapis.com/v0/b/draw-4c80f.appspot.com/o/image9.png?alt=media&token=30c5ca0e-adf3-427c-a74a-7b648a39b39d"  
    ];
   
   var messages = [
      "Nice! What's next?",
      "I like that! Keep it up",
      "I'm digging the style! What is the next connection you would like me to make?",
      "Hmm, Alright!",
      "I love it! Show me more.",
      "OK here you go.",
      "Sure Thing"
   ] 

   function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }


var pathReference = arr_url[app.userStorage.imageLineCount++];
console.log(arr_url[app.userStorage.imageLineCount]);
  app.ask(app.buildRichResponse()
    .addSimpleResponse(messages[getRandomInt(7)])
    .addBasicCard(app.buildBasicCard('')
      .setImage(pathReference, 'Image alternate text')    
  ));

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,1210,1210);

    ctx.beginPath();

    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(500,500);
    ctx.closePath();
    ctx.fill();

    PImage.encodePNGToStream(img, fs.createWriteStream('out.png')).then(()=> {    
    console.log("wrote out the png file to out.png");
    fs.readFile('out.png', function(err, data) {
        if (err) throw err;

          // Encode to base64
          var encodedImage = new Buffer(data, 'binary').toString('base64');
        console.log(encodedImage);
        storageRef.putString(encodedImage, 'data_url').then(function(snapshot) {
          console.log('Uploaded a base64 string!');
        });


    });
}).catch((e)=>{
    console.log("there was an error writing");
});
}

newCanvas();
});

