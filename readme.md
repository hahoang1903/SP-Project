# Smart Room Simulator

Frontend for Smart Room Simulator. Smart Room Simulator simulates a real smart room which can be controlled using voices. We first record voices from frontend. The recorded audio is then processed and sent to backend ([github here](https://github.com/chnk58hoang/SpeechRecognittionBackend)). Backend will use the trained model to predict the command and send it back to frontend. The room will change according to the predicted command. Graphical interface is rendered using **ThreeJS**, a JavaScript 3D Library.

## Requirements

You must have **NodeJS** installed on your computer. Then you can run the following commands.

- Install all needed packages (only for the first time)

```
npm i
```

- Run the app at http://localhost:8080

```
npm run dev
```

:warning: If browser used to run the app is Chrome, then the flag `#unsafely-treat-insecure-origin-as-secure` should be enabled via `chrome://flags/#unsafely-treat-insecure-origin-as-secure`. Then you should add your IP address as below.  
![add ip](/demo/addIP.png)  
Then relaunch Chrome and you are good to go.

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


## Demo

Link demo: https://www.youtube.com/watch?v=3qWIo9ydv8o

## Contribution  

Apart from recording and cleaning data (which everyone have to do), the contribution from each of us is below:

1. **Trần Văn Trọng Thành - 19021367**: 

    - Designed flow of application (from frontend to backend and back).

    - Continued developing base on the [baseline](https://github.com/thanhtvt/SmartRoomSimulator/blob/main/notebooks/baseline.ipynb), including:
        + Adopted byte pair encoding as subwording algorithm.
        + Applied different augmentation techniques to increase number of samples.
        + Tuned baseline model configuration to find best hyper-parameters (so far).
        + Converted baseline notebook into a clean, easy-to-use repository.

    - Documented model repository, link is [here](https://github.com/thanhtvt/SmartRoomSimulator).
    