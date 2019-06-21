# PartyQueue

PartyQueue that gives the power to every listener to add songs to the queue without having to ask nobody. 

## Idea

The idea is, when you go to a party, you open this app in your phone. After this, the app will show you a queue of songs and a button to add songs to the queue by doing a search using Spotify API. 

Future: Also you will have the possibility to like or dislike songs on the queue. If there is enough dislikes the song will be removed from the song queue and wont be played.

## To do
- Autocomplete search bar that shows a list of music to add to the queue (playlist).
- Create a partyqueue playlist and use it as a queue. (Spotify API doesn't have endpoints for adding music to queue, in fact Queue are store locally on each device)
- Create permissions based login. This will allow a superuser to control volume and shutdown PartyQueue remotely.
- Restore accessToken automatically using refreshToken if a request to Spotify API fails.
- Create a push notification server to let users knows if music changes, etc. (Socket can be another choice to do this)

## Requirements
- NodeJS.
- Spotify client open. (if you dont,it won't play no song and the queue will be static).
- Spotify Premium (Spotify Player API required a premium account)
- Wireless network.

## How to install it?
```
npm install
npm start
```

## How to use it?
1) Run PartyQueue in the device running Spotify. This will open your browser and will ask you to authorize PartyQueue app to control Spotify. This will redirect to a device page which will ask you in which device to play music.
2) Open your phone browser and access the url PartyQueue gives you.
3) After its finish loading, it will show you a list with all the songs on the queue, the one its running, and a bar showing the current track progress.
4) You can add a song click on the + (plus) button. It will show you an input and you will have to search the song you want to add. When you find it, click on Continue and the song will be added to the end of the queue.
5) When the song added reach the first place on the queue it will be played automatically by the device running PartyQueue.

## Configuration
For security reasons I removed config.js from src/server. This file contains spotify app secret information.
If you want to try that on your own you can create a file there and enter this information in it:
```
export default {
    appAuth: "<here there must be a base64 encoded string containing client_id:secret_key>"
    host: "localhost",
    port: "3000"
}
```
