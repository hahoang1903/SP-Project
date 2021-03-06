# Smart Room Simulator

# Table of Content

- [Abstract](#abstract)
- [Requirements](#requirements)
- [Demo](#demo)
- [Contribution](#contribution)

# Abstract

Frontend for Smart Room Simulator. Smart Room Simulator simulates a real smart room which can be controlled using voices. We first record voices from frontend. The recorded audio is then processed and sent to backend. Backend will use the trained model to predict the command and send it back to frontend. The room will change according to the predicted command. Graphical interface is rendered using **ThreeJS**, a JavaScript 3D Library.

You can take a look at our other repos for more details:

- Backend: https://github.com/chnk58hoang/SpeechRecognittionBackend/
- Model: https://github.com/thanhtvt/SmartRoomSimulator/

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

:warning: You have to run both backend and frontend. Backend requirements and running tutorial can be found in [backend repo](https://github.com/chnk58hoang/SpeechRecognittionBackend/)  
:warning: If browser used to run the app is Chrome, then the flag `#unsafely-treat-insecure-origin-as-secure` should be enabled via `chrome://flags/#unsafely-treat-insecure-origin-as-secure`. Then you should add your IP address as below.  
![add ip](/demo/addIP.png)  
Then relaunch Chrome and you are good to go.

## Demo

Link demo: https://www.youtube.com/watch?v=dVbQXKV1t90

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

## Contribution

Apart from recording and cleaning data (which everyone have to do), the contribution from each of us is below:

1. **Trần Văn Trọng Thành - 19021367**:

   - Designed flow of application (from frontend to backend and back).

   - Continued developing base on the [baseline](https://github.com/thanhtvt/SmartRoomSimulator/blob/main/notebooks/baseline.ipynb), including:

     - Adopted byte pair encoding as subwording algorithm.
     - Applied different augmentation techniques to increase number of samples.
     - Tuned baseline model configuration to find best hyper-parameters (so far).
     - Converted baseline notebook into a clean, easy-to-use repository.

   - Documented model repository, link is [here](https://github.com/thanhtvt/SmartRoomSimulator).

2. **Trần Khánh Hùng - 19021289**:

   - Contribute problem ideas.
   - Build [baseline](https://github.com/thanhtvt/SmartRoomSimulator/blob/main/notebooks/baseline.ipynb) in kaggle.
   - Contribute data organization, clean and transform data
   - Documented model repository, link is [here](https://github.com/thanhtvt/SmartRoomSimulator).

3. **Hoàng Đức Hà - 19021261**:

   - Build frontend.
     - Build GUI
     - Convert audio into Tensor array and send to backend
   - Connect frontend with backend
   - Create demo video.

4. **Trần Minh Hoàng - 19021285**:

   - Record and clean audio data
   - Design backend API with Django-Rest-Framework
