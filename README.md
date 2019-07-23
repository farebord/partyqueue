# PartyQueue

PartyQueue that gives the power to every listener to add songs to the queue without having to ask nobody. 

## Idea

The idea is, when you go to a party, you open this app in your phone. After this, the app will show you a queue of songs and a button to add songs to the queue by doing a search using Spotify API. 

Future: Also you will have the possibility to like or dislike songs on the queue. If there is enough dislikes the song will be removed from the song queue and wont be played.

## Concepts
This section is just for clarification of changes.
- There was an implementantion of a responsive image album when the device is lower than 1024px. There was a rule for doing that:
    - If device width is lower than 319px, the album image displayed will be the one served by Spotify with medium size, with responsive width.
    - If device width is in between 319px and 650px, the album image displayed will be the big one, with responsive width.
    - If device width is greater 650, then it will render the big album image with fixed size.
The point of doing that if to show different types of rendering. When you need to save bandwidth, you could use the smaller one with responsive width, or maybe if you are on device with minimal width just displayed the smaller album image to increase loading speed.

## To do
- Websockets implementation. (Right now it's using API requests for fetching current playback information)
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

## Tests and coverage
You can start test watch running the next line:
```
npm run test
```
And you can see coverage by running the next:
```
npm run coverage
```

## Configuration
For security reasons I removed config.js from src/server. This file contains spotify app secret information.
If you want to try that on your own you can create a file there and enter this information in it:
```
export default {
    clientKey: "",
    secretKey: "",
    host: "localhost",
    port: "3000"
}
```

## Troubleshooting
- If you get stuck in a white screen, please delete the accessData.json file and restart the application.