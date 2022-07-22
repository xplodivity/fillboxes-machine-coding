import React, { useEffect, useState } from "react";
import "./App.css";

let order = 0;
let isAllClicked = false;

const App = () => {
  const [boxState, setBoxState] = useState(getBoxes("initial"));

  useEffect(() => {
    if (boxState.some((box) => !box.isClicked)) {
      isAllClicked = false;
    } else {
      isAllClicked = true;
    }

    if (isAllClicked) {
      boxState.forEach((item, index) => {
        return setTimeout(() => {
          let tempBox = [...boxState];
          tempBox[index].isClicked = false;
          setBoxState(tempBox);
        }, 1000 * (index + 1));
      });
    }
  }, [boxState]);

  function getBoxes(type) {
    let boxesData = [];
    const boxes = [0, 1, 2].map((i) => {
      return [0, 1, 2].map((j) => {
        if (!(i === 1 && j > 0)) {
          if (type === "initial") {
            return boxesData.push({ i, j, isClicked: false, order: null });
          }

          return (
            <div
              onClick={() => changeColor(i, j)}
              style={{
                backgroundColor: boxState?.find(
                  (item) => item.i === i && item.j === j
                )?.isClicked
                  ? "green"
                  : "",
              }}
              className="box"
            ></div>
          );
        }
        return <div></div>;
      });
    });

    if (type === "initial") {
      return boxesData;
    }

    return boxes;
  }

  const changeColor = (i, j) => {
    let temp = [...boxState];
    const selectedBox = temp.find((item) => item.i === i && item.j === j);
    selectedBox.isClicked = true;
    selectedBox.order = ++order;
    temp.sort((a, b) => (a.order > b.order ? 1 : -1));
    setBoxState(temp);
  };

  return (
    <div className="App">
      <div className="box-container">{getBoxes()}</div>
    </div>
  );
};

export default App;
