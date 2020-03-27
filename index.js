/**
 * When user books meeting room or event space -> send notification to managers
 * When user changes i.e. cancel or complete room or space -> send notification to managers
 * When user post comment on complaint -> send notification to managers
 * 
 * When admin changes status of booking -> send notification to user
 * When admin post comment on complaint -> send notificatin to user
 */



var admin = require("firebase-admin")
//fcm token of device on which we want to send notification
var registrationToken = 'c-j4fyMGTvySTTALXwuqIC:APA91bFqvnDQVq-MMPWJfaOL4TRuftIV7goZE0zjfY2n9kgNwioZI3xyQe0W0d4v5fSc8lXqtNb5HfSYq50uBeIki0m4rBhCXevxPq7HqjVX0u2mC7dvBmfL9O0oDUrXTwaIlBttBwxg';

//this file needs to be download from firebase console > project setting

var serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mns-hrm.firebaseio.com"
});

/**
 * We get data from db or something 
 */
var message = {
  notification: {
    title: 'Booking Confirmed',
    body: 'Room booking MR1 has been approved',
    imageUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FIvF6fBMyZfI%2Fhqdefault.jpg&f=1&nofb=1' // If we need to display image, Note: Image needs to be small
  },
  data: {
    screen: 'complain',
    // screen: 'complain',  
    /**
     * can be room or complain : Clicking on notification will redirect user to the coresponding screen
     * if notificatin is regarding complain then we need to redirect user to comment section 
     * for this we need some extra info, which is given below,
     */
    id: '10045',
    ticketNumber: '#1234',
    firstName: 'Anup',
    lastName: 'Kunwar',
    profilePicture: '',
    title: 'My Title',
    description:'There is problem with the heater.',
    complaintDate:'2020-03-26 12:06:26.520',
    priority: 'HIGH',
    status: 'Pending',
    statusColor:'#584fff'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });


