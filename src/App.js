import React, { Component } from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f8c35d4bba2a47e3ae26bac44fb11cab'
 });
 
const particlesOptions = {
  particles : {
    number : {
      value : 100,
      density : {
        enable : true,
        value_area : 700,
      }
    },
    color: {
      value: '#fff'
    },
    opacity: {
      value: 0.5,
      anim: {
          enable: true
      }
    },
    size: {
      value: 7,
      random: true,
      anim: {
          enable: true,
          speed: 8
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      speed: 0.5
    }
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input : '',
      imageUrl : '',
      //This box will contain the values that we receive {leftCol, rightCol, topRow, bottomRow}
      box : {},
    }
  }

  //With onButtonSubmit, we calculateFaceLocation with the response and return an object by using below function
  //The response is received as data here..
  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
        leftCol: clarifaiFace.left_col * width,
     };
  };

  //This will receive the calculated face-location-values of the image.
  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl : this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  render() {
    const { imageUrl, box } = this.state;
      return (
        <div className="App">
            <Particles canvasClassName='particles'
            params={particlesOptions} 
            />
            <Logo />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
      );
  }  
}

export default App;
