import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import CubeJS from "cubejs";
import "./App.css";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

var defaultStr = new CubeJS().asString();
const colorsFromCubeStr = (cubeStr) => {
  //console.log(`cfcstr: ${cubeStr}`);
  if (!cubeStr) return [];

  const colorMap = {
    U: "gold",
    F: "firebrick",
    D: "azure",
    L: "blue",
    R: "green",
    B: "orangered"
  };

  // 26 boxes.
  // 6 centers
  // 12 edges
  // 8 corners
  let c = cubeStr.split("").map((face) => colorMap[face]);
  let [U, R, F, D, L, B] = chunk(c, 9);

  let b = "black";
  let ret = [
    [b, L[6], b, D[6], b, B[8]], // BACK-LEFT-DOWN
    [b, L[7], b, D[3], b, b], // LEFT-DOWN
    [b, L[8], b, D[0], F[6], b], // FRONT-LEFT-DOWN
    [b, L[3], b, b, b, B[5]], // BACK-LEFT
    [b, L[4], b, b, b, b], // LEFT CENTER
    [b, L[5], b, b, F[3], b], // LEFT-FRONT
    [b, L[0], U[0], b, b, B[2]],
    [b, L[1], U[3], b, b, b],
    [b, L[2], U[6], b, F[0], b],
    [b, b, b, D[7], b, B[7]],
    [b, b, b, D[4], b, b],
    [b, b, b, D[1], F[7], b],
    [b, b, b, b, b, B[4]],
    [b, b, b, b, F[4], b],
    [b, b, U[1], b, b, B[1]],
    [b, b, U[4], b, b, b],
    [b, b, U[7], b, F[1], b],
    [R[8], b, b, D[8], b, B[6]],
    [R[7], b, b, D[5], b, b],
    [R[6], b, b, D[2], F[8], b],
    [R[5], b, b, b, b, B[3]],
    [R[4], b, b, b, b, b],
    [R[3], b, b, b, F[5], b],
    [R[2], b, U[2], b, b, B[0]],
    [R[1], b, U[5], b, b, b],
    [R[0], b, U[8], b, F[2], b]
  ];

  console.log(ret);
  return ret;
};

const Box = React.forwardRef((props, ref) => {
  return (
    <mesh {...props} ref={ref} scale={0.9}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      {props.colors.map((color, id) => (
        <meshBasicMaterial color={color} attachArray="material" key={id} />
      ))}
    </mesh>
  );
});

const Cube = ({ cubeStr, movement, setMovement, setCube }) => {
  let cubesRef = Array(26)
    .fill(0)
    .map((_) => React.createRef());
  let rotationRef = useRef();
  let wrapperRef = useRef();

  let colors = colorsFromCubeStr(cubeStr);

  let filters = {
    U: (x, y, z) => y === 1,
    D: (x, y, z) => y === -1,
    R: (x, y, z) => x === 1,
    L: (x, y, z) => x === -1,
    F: (x, y, z) => z === 1,
    B: (x, y, z) => z === -1,
    Ui: (x, y, z) => y === 1,
    Di: (x, y, z) => y === -1,
    Ri: (x, y, z) => x === 1,
    Li: (x, y, z) => x === -1,
    Fi: (x, y, z) => z === 1,
    Bi: (x, y, z) => z === -1,
    U2: (x, y, z) => y === 1,
    D2: (x, y, z) => y === -1,
    R2: (x, y, z) => x === 1,
    L2: (x, y, z) => x === -1,
    F2: (x, y, z) => z === 1,
    B2: (x, y, z) => z === -1
    // false: (x, y, z) => x===0 && y===0 && z===0
  };

  let boxes = [],
    c = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === y && y === z && z === 0) continue;
        boxes.push(
          <Box
            position={[x, y, z]}
            colors={colors[c]}
            ref={cubesRef[c]}
            key={c}
          />
        );
        c++;
      }
    }
  }

  let rotations = {
    U: [0, THREE.Math.degToRad(-90), 0],
    D: [0, THREE.Math.degToRad(90), 0],
    R: [THREE.Math.degToRad(-90), 0, 0],
    L: [THREE.Math.degToRad(90), 0, 0],
    F: [0, 0, THREE.Math.degToRad(-90)],
    B: [0, 0, THREE.Math.degToRad(90)],
    Ui: [0, THREE.Math.degToRad(90), 0],
    Di: [0, THREE.Math.degToRad(-90), 0],
    Ri: [THREE.Math.degToRad(90), 0, 0],
    Li: [THREE.Math.degToRad(-90), 0, 0],
    Fi: [0, 0, THREE.Math.degToRad(90)],
    Bi: [0, 0, THREE.Math.degToRad(-90)],
    U2: [
      0,
      THREE.Math.degToRad((-1) ** Math.floor(Math.random() * 2) * 180),
      0
    ],
    D2: [
      0,
      THREE.Math.degToRad((-1) ** Math.floor(Math.random() * 2) * 180),
      0
    ],
    R2: [
      THREE.Math.degToRad((-1) ** Math.floor(Math.random() * 2) * 180),
      0,
      0
    ],
    L2: [
      THREE.Math.degToRad((-1) ** Math.floor(Math.random() * 2) * 180),
      0,
      0
    ],
    F2: [
      0,
      0,
      THREE.Math.degToRad((-1) ** Math.floor(Math.random() * 2) * 180)
    ],
    B2: [0, 0, THREE.Math.degToRad((-1) ** Math.floor(Math.random() * 2) * 180)]
  };

  let spring = useSpring({
    rotation:
      typeof rotations[movement.motion] == "undefined"
        ? [0, 0, 0]
        : rotations[movement.motion],
    config: { duration: 300 }
  });

  useEffect(() => {
    //var Mutation = () => {
     if (!movement.motion) return;

    let wrapper = wrapperRef.current;
    let pivot = rotationRef.current;

    cubesRef.map((box, i) => {
      let [x, y, z] = Object.values(box.current.position);
      if (movement.motion && filters[movement.motion](x, y, z))
        pivot.add(box.current);
    });
    console.log(cubeStr, setCube, movement, setMovement, pivot, wrapper);
    Mutation(cubeStr, setCube, movement, setMovement, pivot, wrapper);
  }, [movement]);

  return (
    <group ref={wrapperRef}>
      {boxes}
      <a.group ref={rotationRef} {...spring}></a.group>
    </group>
  );
};

var Mutation = (cubeStr, setCube, movement, setMovement, pivot, wrapper) => {
  setTimeout(() => {
    // callback spring
    setCube((cubeStr) => {
      for (let box of [...pivot.children]) wrapper.add(box);
      return movement.motion
        ? CubeJS.fromString(cubeStr)
            .move(movement["motion"].replace("i", "'"))
            .asString()
        : cubeStr;
    });
    setMovement((prev) => ({ ...prev, motion: false, counter: prev.counter+1 }));
  }, 400);
};

const App = (props) => {
  let [movement, setMovement] = useState({ motion: false, counter: 0 });
  let [cubeStr, setCube] = useState(() => new CubeJS().asString());
  let moves = [
    "U",
    "D",
    "R",
    "L",
    "F",
    "B",
    "Ui",
    "Di",
    "Ri",
    "Li",
    "Fi",
    "Bi",
    "Solve",
    "Reset",
    "Shuffle"
  ];
  let cube_set = cubeStr.match(/.{1,9}/g).map((x) => x.split(""));
  var arr = [...Array(12)].map((x) => Array(9).fill(" "));

  const blasted_view = (r, c) => {
    let row =
      ([1, 2, 4].includes(r) ? 3 : Math.ceil(r / 2) * 3) + Math.floor(c / 3);
    let column = ([0, 2, 3, 5].includes(r) ? 3 : 8 - 2 * r) + (c % 3);
    return { row, column };
  };

  const rotate180_deg = (Mat, l, r, u, d) => {
    let temp = [...Array(d - u + 1)].map((x) => Array(r - l + 1).fill("_"));
    for (var i = d; i >= u; i--)
      for (var j = r; j >= l; j--) temp[d - i][r - j] = Mat[i][j];
    for (var i = u; i <= d; i++)
      for (var j = l; j <= r; j++) Mat[i][j] = temp[i - u][j - l];
    return Mat;
  };

  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 9; j++)
      arr[blasted_view(i, j).row][blasted_view(i, j).column] = cube_set[i][j];
  arr = rotate180_deg(arr, 3, 5, 9, 11);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  return (
    <table>
      <tr>
        <th
          style={{
            zIndex: "100",
            fontSize: "1.5em",
            margin: "10px",
            padding: "1vh 2vw",
            height: "50vh",
            width: "40vw"
          }}
        >
          <center>
            <table className="sizer">
              <tbody>
                {arr.map((item, index) => {
                  return (
                    <tr>
                      {item.map((subItem, subIndex) => {
                        return (
                          <td
                            style={{
                              backgroundColor:
                                subItem === "U"
                                  ? "gold"
                                  : subItem === "F"
                                  ? "firebrick"
                                  : subItem === "D"
                                  ? "lightgrey"
                                  : subItem === "L"
                                  ? "blue"
                                  : subItem === "R"
                                  ? "green"
                                  : subItem === "B"
                                  ? "orangered"
                                  : ""
                            }}
                          >
                            &nbsp;{subItem}&nbsp;
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
          
          {moves.slice(0, 6).map((moveStr) => (
            <button
              disabled={movement.motion}
              className="container1"
              onClick={() => {
                if (!movement.motion) {
                  setMovement({ motion: moveStr });
                }
              }}
            >
              {moveStr}&nbsp;
            </button>
          ))}

          <br />

          {moves.slice(6, 12).map((moveStr) => (
            <button
              disabled={movement.motion}
              className="container2"
              onClick={() => {
                if (!movement.motion) {
                  setMovement({ motion: moveStr });
                }
              }}
            >
              {moveStr}
            </button>
          ))}
          <br />

          {moves.slice(12, 15).map((moveStr) => (
            <button
              disabled={movement.motion}
              className="container3"
              onClick={() => {
                if (moveStr === "Shuffle")
                  if (!movement.motion) {
                    const face = ["U","D","L","R","F","B"],
                        directions = ["","i","2"];
                    var shuffle_string=""
                    for (let n = 1; n <=20; n++)
                     shuffle_string += face[Math.floor(Math.random() * 6)].concat(directions[Math.floor(Math.random() * 3)]) + " ";

                    async function Shuffler_Wait(){ //must be async func
                      for (let s of shuffle_string.slice(0,-1).split(" "))
                      {
                       setMovement((prev) => ({ ...prev, motion: s, counter: prev.counter+1 }));
                       await sleep(750)
                      }
                    }
                    Shuffler_Wait();
                  }

                if (moveStr === "Solve")
                  if (!movement.motion) {
                    var solve_string = new CubeJS.initSolver().fromString(cubeStr).solve().replaceAll("'","i")
                    console.log("Steps to solve 3x3 cube, from current cube state: ", solve_string)
                    
                    async function Solver_Wait(){ //must be async func
                      for (let sw of solve_string.split(" "))
                      {
                       setMovement((prev) => ({ ...prev, motion: sw, counter: prev.counter+1 }));
                       await sleep(750)
                      }
                    }
                  
                    cubeStr===defaultStr ? alert("🧊 The 3x3 Cube is already in solved state !!! 😀👌"):Solver_Wait();

                }


                if (moveStr === "Reset")
                  if (!movement.motion) {
                    alert("🧩Cube will be Reset to Solved state🧊");
                    setCube(defaultStr);
                  }

              }}
            >
              {moveStr}
            </button>
          ))}
        </th>
        <td>
          <Canvas
            style={{ height: "90vh", width: "60vw" }}
            className="rubiks_cube"
          >
            <ambientLight />
            <pointLight position={[5, 5, 5]} angle={0.5} />
            <Cube
              cubeStr={cubeStr}
              movement={movement}
              setMovement={setMovement}
              setCube={setCube}
            />
            <OrbitControls />
          </Canvas>
        </td>
      </tr>
    </table>
  );
};

export default App;
