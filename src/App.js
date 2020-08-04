import React from "react";
import "./App.css";
import Draggable from "react-draggable";
import calculateFrequentWords from "./FrequentWords";
import getText from "./ReadFile";
const colorComponents = ["red", "blue", "green", "yellow", "white"];
let x = "";
let y = "";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      freqWords: [],
      elem1: true,
      elem1Index: 0,
      elem1Style: {},
      elem2: true,
      elem2Index: 0,
      elem2Style: {},
      elem3: true,
      elem3Index: 0,
      elem3Style: {},
      elem4: true,
      elem4Index: 0,
      elem4Style: {},
      elem5: true,
      elem5Index: 0,
      elem5Style: {},
      displayCoordinatestopLeft: false,
      displayCoordinatestopRight: false,
      displayCoordinatesbottomLeft: false,
      displayCoordinatesbottomRight: false,
      displayCoordinatescenter: false,
    };
    this.dragging = false;
    this.prevPos = { x: 0, y: 0 };
  }

  /**
   * Toggle Display as on and off
   * @param type
   */
  toggleTextDisplay = (type) => {
    if (type === "e1") {
      let e = this.state.elem1;
      this.setState({
        elem1: !e,
      });
    } else if (type === "e2") {
      let e = this.state.elem2;
      this.setState({
        elem2: !e,
      });
    } else if (type === "e3") {
      let e = this.state.elem3;
      this.setState({
        elem3: !e,
      });
    } else if (type === "e4") {
      let e = this.state.elem4;
      this.setState({
        elem4: !e,
      });
    } else if (type === "e5") {
      let e = this.state.elem5;
      this.setState({
        elem5: !e,
      });
    }
  };

  /**
   * Function to change color of text
   * @param type
   */
  toggleColor = (type) => {
    if (!this.dragging) {
      if (type === "e1") {
        let index = this.state.elem1Index;
        index = (index + 1) % 5;
        this.setState({
          elem1Style: { color: colorComponents[index] },
          elem1Index: index,
        });
      } else if (type === "e2") {
        let index = this.state.elem2Index;
        index = (index + 1) % 5;
        this.setState({
          elem2Style: { color: colorComponents[index] },
          elem2Index: index,
        });
      } else if (type === "e3") {
        let index = this.state.elem3Index;
        index = (index + 1) % 5;
        this.setState({
          elem3Style: { color: colorComponents[index] },
          elem3Index: index,
        });
      }
      if (type === "e4") {
        let index = this.state.elem4Index;
        index = (index + 1) % 5;
        this.setState({
          elem4Style: { color: colorComponents[index] },
          elem4Index: index,
        });
      }
      if (type === "e5") {
        let index = this.state.elem5Index;
        index = (index + 1) % 5;
        this.setState({
          elem5Style: { color: colorComponents[index] },
          elem5Index: index,
        });
      }
    }
  };

  mouseOver = (e, type) => {
    x = e.screenX;
    y = e.screenY;
    this.handle = setTimeout(
      () => {
        if (type === "topLeft") {
          this.setState({ displayCoordinatestopLeft: true });
        } else if (type === "topRight") {
          this.setState({ displayCoordinatestopRight: true });
        } else if (type === "bottomLeft") {
          this.setState({ displayCoordinatesbottomLeft: true });
        } else if (type === "bottomRight") {
          this.setState({ displayCoordinatesbottomRight: true });
        } else if (type === "centered") {
          this.setState({ displayCoordinatescenter: true });
        }
      },
      2000,
      e
    );
  };

  mouseLeave = (type) => {
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = undefined;
      if (type === "topLeft") {
        this.setState({ displayCoordinatestopLeft: false });
      } else if (type === "topRight") {
        this.setState({ displayCoordinatestopRight: false });
      } else if (type === "bottomLeft") {
        this.setState({ displayCoordinatesbottomLeft: false });
      } else if (type === "bottomRight") {
        this.setState({ displayCoordinatesbottomRight: false });
      } else if (type === "centered") {
        this.setState({ displayCoordinatescenter: false });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <video
            className="video"
            autoPlay
            loop
            muted
            controls
            src="https://frontend-coding-challenge.s3.amazonaws.com/moonwalker.mp4"
            type="video/mp4"
          />
          <Draggable
            bounds="parent"
            onDrag={(e, data) => {
              this.prevPos = {
                x: data.x,
                y: data.y,
              };
              this.dragging = true;
            }}
            onStop={(e, data) => {
              if (data.x === this.prevPos.x && data.y === this.prevPos.y) {
                this.dragging = true;
                this.prevPos = { x: -1000, y: -1000 };
              } else {
                this.dragging = false;
              }
            }}
          >
            {this.state.elem1 ? (
              <div
                className="bottom-left"
                onClick={() => {
                  this.toggleColor("e1");
                }}
                style={this.state.elem1Style}
                onMouseOver={(e) => this.mouseOver(e, "bottomLeft")}
                onMouseLeave={() => this.mouseLeave("bottomLeft")}
              >
                {this.state.freqWords[0]}
                {this.state.displayCoordinatesbottomLeft ? (
                  <div>
                    <p>
                      X: {x} Y:{y}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </Draggable>
          <Draggable
            bounds="parent"
            onDrag={(e, data) => {
              this.prevPos = {
                x: data.x,
                y: data.y,
              };
              this.dragging = true;
            }}
            onStop={(e, data) => {
              if (data.x === this.prevPos.x && data.y === this.prevPos.y) {
                this.dragging = true;
                this.prevPos = { x: -1000, y: -1000 };
              } else {
                this.dragging = false;
              }
            }}
          >
            {this.state.elem2 ? (
              <div
                className="top-left"
                onClick={() => this.toggleColor("e2")}
                style={this.state.elem2Style}
                onMouseOver={(e) => this.mouseOver(e, "topLeft")}
                onMouseLeave={() => this.mouseLeave("topLeft")}
              >
                {this.state.freqWords[1]}
                {this.state.displayCoordinatestopLeft ? (
                  <div>
                    <p>
                      X: {x} Y:{y}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </Draggable>
          <Draggable
            bounds="parent"
            onDrag={(e, data) => {
              this.prevPos = {
                x: data.x,
                y: data.y,
              };
              this.dragging = true;
            }}
            onStop={(e, data) => {
              if (data.x === this.prevPos.x && data.y === this.prevPos.y) {
                this.dragging = true;
                this.prevPos = { x: -1000, y: -1000 };
              } else {
                this.dragging = false;
              }
            }}
          >
            {this.state.elem3 ? (
              <div
                className="top-right"
                onClick={() => this.toggleColor("e3")}
                style={this.state.elem3Style}
                onMouseOver={(e) => this.mouseOver(e, "topRight")}
                onMouseLeave={() => this.mouseLeave("topRight")}
                onDrag={(e) => e.preventDefault()}
              >
                {this.state.freqWords[2]}
                {this.state.displayCoordinatestopRight ? (
                  <div>
                    <p>
                      X: {x} Y:{y}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </Draggable>
          <Draggable
            bounds="parent"
            onDrag={(e, data) => {
              this.prevPos = {
                x: data.x,
                y: data.y,
              };
              this.dragging = true;
            }}
            onStop={(e, data) => {
              if (data.x === this.prevPos.x && data.y === this.prevPos.y) {
                this.dragging = true;
                this.prevPos = { x: -1000, y: -1000 };
              } else {
                this.dragging = false;
              }
            }}
          >
            {this.state.elem4 ? (
              <div
                className="bottom-right"
                onClick={() => this.toggleColor("e4")}
                style={this.state.elem4Style}
                onMouseOver={(e) => this.mouseOver(e, "bottomRight")}
                onMouseLeave={() => this.mouseLeave("bottomRight")}
              >
                {this.state.freqWords[3]}
                {this.state.displayCoordinatesbottomRight ? (
                  <div>
                    <p>
                      X: {x} Y:{y}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </Draggable>
          <Draggable
            bounds="parent"
            onDrag={(e, data) => {
              this.prevPos = {
                x: data.x,
                y: data.y,
              };
              this.dragging = true;
            }}
            onStop={(e, data) => {
              if (data.x === this.prevPos.x && data.y === this.prevPos.y) {
                this.dragging = true;
                this.prevPos = { x: -1000, y: -1000 };
              } else {
                this.dragging = false;
              }
            }}
          >
            {this.state.elem5 ? (
              <div
                className="centered"
                onClick={() => this.toggleColor("e5")}
                style={this.state.elem5Style}
                onMouseOver={(e) => this.mouseOver(e, "centered")}
                onMouseLeave={() => this.mouseLeave("centered")}
              >
                {this.state.freqWords[4]}
                {this.state.displayCoordinatescenter ? (
                  <div>
                    <p>
                      X: {x} Y:{y}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </Draggable>
        </div>
        <br />
        <button name="elem1" onClick={() => this.toggleTextDisplay("e1")}>
          {this.state.freqWords[0]}
        </button>
        <button name="elem2" onClick={() => this.toggleTextDisplay("e2")}>
          {this.state.freqWords[1]}
        </button>
        <button name="elem3" onClick={() => this.toggleTextDisplay("e3")}>
          {this.state.freqWords[2]}
        </button>
        <button name="elem4" onClick={() => this.toggleTextDisplay("e4")}>
          {this.state.freqWords[3]}
        </button>
        <button name="elem5" onClick={() => this.toggleTextDisplay("e5")}>
          {this.state.freqWords[4]}
        </button>
      </div>
    );
  }

  componentDidMount() {
    /**  Assuming that the proxy is allowed for this assignment. 
     Using proxy URL as the access is blocked.
     TODO: enable access to localhost:3000 permissions from S3 bucket */
    let proxy = "https://cors-anywhere.herokuapp.com/";
    var url1 =
      proxy + "https://frontend-coding-challenge.s3.amazonaws.com/1.txt";
    let url2 =
      proxy + "https://frontend-coding-challenge.s3.amazonaws.com/2.txt";
    let url3 =
      proxy + "https://frontend-coding-challenge.s3.amazonaws.com/3.txt";
    let allText = "";
    getText(url1, allText)
      .then((text1) => getText(url2, text1))
      .then((text2) => getText(url3, text2))
      .then((text3) => {
        allText = text3;
        calculateFrequentWords(allText).then((words) => {
          this.setState({
            freqWords: words,
          });
        });
      })
      .catch((err) => console.log(err));
  }
}

export default App;
