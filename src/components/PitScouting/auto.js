import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import field from '../imgs/2024Field.png'

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem"
};

const Canvas = class extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <div>
        <ReactSketchCanvas
            ref={this.canvas}
            backgroundImage={field}
            preserveBackgroundImageAspectRatio="true"
            width="100%"
            style={styles}
            
            strokeWidth={4}
            strokeColor="red"
        />
        <button
            onClick={() => {
            this.canvas.current
                .exportImage("png")
                .then(data => {
                    console.log(data);
                })
                .catch(e => {
                    console.log(e);
                });
            }}
        >
          Get Image
        </button>
      </div>
    );
  }
};

const auto = () => {
    return (
        <div>
          <ReactSketchCanvas
              ref={this.canvas}
              backgroundImage={field}
              preserveBackgroundImageAspectRatio="true"
              width="100%"
              style={styles}
              
              strokeWidth={4}
              strokeColor="red"
          />
          <button
              onClick={() => {
              this.canvas.current
                  .exportImage("png")
                  .then(data => {
                      console.log(data);
                  })
                  .catch(e => {
                      console.log(e);
                  });
              }}
          >
            Get Image
          </button>
        </div>
    );
}

export default auto;