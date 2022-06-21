# Smart Room Simulator

Frontend for Smart Room Simulator. Smart Room Simulator simulates a real smart room which can be controlled using voices. We first record voices from frontend. The recorded audio is then processed and sent to backend ([github here](https://github.com/chnk58hoang/SpeechRecognittionBackend)). Backend will use the trained model to predict the command and send it back to frontend. The room will change according to the predicted command. Graphical interface is rendered using **ThreeJS**, a JavaScript 3D Library.

## Requirements

You must have **NodeJS** installed on your computer. Then you can run the following commands.

- Install all needed packages (only for the first time)
  `npm i`

- Run the app at http://localhost:8080
  `npm run dev`

## Demo

#### Main GUI

![](/demo/main.png)

#### Light

Turn on/off light
![light on](/demo/lightOn.jpg)

![light off](/demo/lightOff.jpg)

#### PC & TV

Turn PC/TV Screen on/off

![PC Screen](/demo/pc.jpg)

![TV](/demo/tv.jpg)

#### Chair

Rotate chair left or right

![Rotate chair](/demo/chair.jpg)
