import React, { useEffect, useRef, useState } from "react";
import { line } from "../services";
import style from "./Canvas.module.css";

export default function Canvas() {
  const canvasRef = useRef();
  const [context, setcontext] = useState();
  const correction = canvasRef?.current?.getBoundingClientRect();
  const parent = canvasRef?.current?.parentNode?.parentNode;
  const canvasWidth = parent?.clientWidth - (parent?.clientWidth * 20) / 100;
  const canvasHeight = parent?.clientHeight - (parent?.clientHeight * 20) / 100;
  const keysPressed = {};
  let Xini = canvasWidth / 2;
  let Yini = canvasHeight / 2;
  let isTouch;
  let color;

  useEffect(() => {
    const canvas = canvasRef?.current;
    setcontext(canvas?.getContext("2d"));
  }, []);

  function touch(e) {
    e.preventDefault();
    isTouch = true;
    context?.beginPath();
    Xini = e?.touches[0].pageX - correction.x;
    Yini = e?.touches[0].pageY - correction.y;
    if (color) {
      context.strokeStyle = color;
    }

    context?.moveTo(Xini, Yini);
  }
  function untouch(e) {
    e.preventDefault();
    isTouch = false;
  }
  function touchdraw(e) {
    e.preventDefault();
    if (isTouch === true) {
      context?.lineTo(Xini, Yini);
      Xini = e?.touches[0].pageX - correction.x;
      Yini = e?.touches[0].pageY - correction.y;
      context?.stroke();
    }
  }
  const keyPress = (e) => {
    if (keysPressed[38]) {
      // ^
      line(color, Xini, Yini, Xini, Yini - 1, context);
      if (Yini <= 0) {
        Yini = 1;
      } else {
        Yini = Yini - 1;
      }
    }
    if (keysPressed[40]) {
      //abajo
      line(color, Xini, Yini, Xini, Yini + 1, context);
      if (Yini >= canvasHeight) {
        Yini = canvasHeight - 1;
      } else {
        Yini = Yini + 1;
      }
    }
    if (keysPressed[39]) {
      //-->
      line(color, Xini, Yini, Xini + 1, Yini, context);
      if (Xini >= canvasWidth) {
        Xini = canvasWidth - 1;
      } else {
        Xini = Xini + 1;
      }
    }
    if (keysPressed[37]) {
      //<--
      line(color, Xini, Yini, Xini - 1, Yini, context);
      if (Xini <= 0) {
        Xini = 1;
      } else {
        Xini = Xini - 1;
      }
    }
  };
  const downloadCanvas = () => {
    let link = document.createElement("a");
    link.download = "draw.png";
    link.href = canvasRef?.current?.toDataURL("image/png");
    link.click();
  };
  const clearCanvas = () => {
    canvasRef?.current?.parentNode.classList.add(style.shake)
    context?.clearRect(0, 0, canvasWidth, canvasHeight);
    Xini = canvasWidth / 2;
    Yini = canvasHeight / 2;
    context?.beginPath();
    context?.rect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "white";
    context?.fill();
  };
  if (canvasRef.current) {
    canvasRef.current.ontouchstart = touch;
    canvasRef.current.ontouchmove = touchdraw;
    canvasRef.current.ontouchend = untouch;
  }
  document.addEventListener("keydown", keyPress);
  document.addEventListener("keydown", (event) => {
    keysPressed[event.keyCode] = true;
  });
  document.addEventListener("keyup", (event) => {
    keysPressed[event.keyCode] = false;
  });
  canvasRef?.current?.parentNode.addEventListener("animationend", function() {
  canvasRef?.current?.parentNode.classList.remove(style.shake);
})
  
  return (
    <div className={style.container}>
      <canvas
        style={{
          backgroundColor: "white",
          boxShadow: "0px 1px 11px 11px #a40000",
        }}
        ref={canvasRef}
        width={canvasWidth || 500}
        height={canvasHeight || 500}
        id="lienzo"
      ></canvas>
      <div className={style.controls}>
        <div>
          <div className={style.well}></div>
        </div>
        <div className={style.colors}>
          <button
            className={style.color}
            style={{ backgroundColor: "black" }}
            onClick={(e) => {
              color = "black";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "red" }}
            onClick={(e) => {
              color = "red";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "blue" }}
            onClick={(e) => {
              color = "blue";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "yellow" }}
            onClick={(e) => {
              color = "yellow";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "green" }}
            onClick={(e) => {
              color = "green";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "purple" }}
            onClick={(e) => {
              color = "purple";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "aquamarine" }}
            onClick={(e) => {
              color = "aquamarine";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "pink" }}
            onClick={(e) => {
              color = "pink";
            }}
          ></button>
          <button
            className={style.color}
            style={{ backgroundColor: "white", color: "red" }}
            onClick={clearCanvas}
          >
            X
          </button>
          <button
            className={style.color}
            style={{ backgroundColor: "white", color: "red" }}
            onClick={downloadCanvas}
          >
            💾
          </button>
        </div>
        <div>
          <div className={style.well}></div>
        </div>
      </div>
    </div>
  );
}
