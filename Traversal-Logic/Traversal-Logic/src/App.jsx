import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = () => {
  const [add, setAdd] = useState(1);
  const [times, setTimes] = useState(2);
  const [divide, setDivide] = useState(null);
  const [subtract, setSubtract] = useState(100);
  const [variable, setVariable] = useState(0);
  const newObj = <App />;
  const [nodeBoxArray, setNodeBoxArray] = useState([]);
  const [lineArray, setLineArray] = useState([]);
  const [version, setVersion] = useState('Simple');

  //full version algo
  useEffect(() => {
    //Qualifier to only run if the correct version is clicked
    if (version === 'Full') {
      //NOT IMPORTANT for DEV TOOL
      if (variable > 1) {
        //set current to the root fiber node
        const head = newObj._owner;
        //Sets the orignial fiber node, so we can know we hit the end of the while loop

        //create a class instance with four keys
        class NodeMaker {
          constructor(key, x, y, debug) {
            this.key = key;
            this.x = x;
            this.y = y;
            this.debug = debug;
          }
        }

        //temporary variable to hold the NodeMaker objects constructed
        let nodeMade = null;
        //
        //an array to keep track of all the nodes (the ones being rendered to the screen)
        let nodeTracker = [];

        //keeps track of the traversed nodes, to set as a condition for the while loop and to check to see if we created that node already.
        let arr = [head];

        //create an array to keep track of the LINES being rendered to the screen
        //insert the first line into the array. It always comes from the root node so it will always be the same
        let lineList = [
          <div
            style={{
              gridColumn: `1 / span 1`,
              gridRow: `2 / span 2`,
              animation: `example2 1s linear 1`,
            }}
            className="lineVertical"
          ></div>,
        ];
        //create a list of nodes 
        //insert the first node into the array of nodes. Which will be the head node. 
        //the grid elements can be set values since the first node awlways is in the same spot
        let nodeList = [
          <button
            key={current.key}
            className="nodes"
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 'span 1',
              gridRowStart: 2,
              gridRowEnd: 'span 1',
              justifySelf: 'center',
              // marginTop: '30px',
              animation: `blinker ${(2 + 1) / 3}s linear 1`,
            }}
          >
            <b style={{ fontSize: '12px' }}>APP</b>
            {current.type}
          </button>,
        ];
        //set current node to the root's  child.
        let current = newObj._owner.child;

        //set variables to keep track of our position in the array relative to the grid

        //start on the third row.
        let yDepth = 3;
        //start on the first column.
        let xDepth = 1;

        //keeps track of return distance, so we can properly create the lines
        let initX = 1;
        //only compare

        //as long as we're not at the top keep going
        while (current !== head) {
          //if the current node does not exist in the grid do the following
          if (arr.indexOf(current) === -1) {

            //call on our node class. Create an object that tracks the fibernodes traits.
            nodeMade = new NodeMaker(
              current.key,
              xDepth,
              yDepth,
              current._debugID
            );
            //push the object into the nodeTracker to keep track of what has been made
            nodeTracker.push(nodeMade);
            //push the whole fiberNode into the arr array. This will need to be changed to just debug/user Id.
            arr.push(current);

            //push a button into the node list. Set the buttons x and y coordinates to the x and y depth
            //Make the animation last as long as how deep in the tree this current node exist.
            //assign it's relative position in the grid to the x and y depth variables.
            nodeList.push(
              <button
                key={current.key}
                className="nodes"
                style={{
                  // opacity: 1,
                  animation: `blinker ${(xDepth + yDepth) / 3}s linear 1`,
                  gridColumnStart: xDepth,
                  gridColumnEnd: 'span 1',
                  gridRowStart: yDepth,
                  gridRowEnd: 'span 1',
                  justifySelf: 'center ',
                  zIndex: '0',
                }}
              >
                {current.type != null ? current.type : ''}{' '}
                {current.key != null ? current.key : 'Text'}{' '}
              </button>
            );
            //if the current node has a child
            if (current.child) {
              //set initial x to current xdepth
              initX = xDepth;
              //iterate to the child
              current = current.child;

              //if it has a child, we will also add a line to the line array.
              lineList.push(
                <div
                  style={{
                    gridColumn: `${xDepth} / span 1`,
                    gridRow: `${yDepth} / span 2`,
                    animation: `example2 ${(xDepth + yDepth) / 3}s linear 1`,
                  }}
                  className="lineVertical"
                ></div>
              );
              //increment y depth, since we went down one layer in the grid.
              yDepth++;
              //go back to the top of the while loop
              continue;
            }

            //if there was no child, but there is a sibling
            if (current.sibling) {
              //iterate to the sibling fiber node.
              current = current.sibling;
              //add a horizontal line to the line list.
              lineList.push(
                <div
                  style={{
                    gridColumn: `${xDepth} / ${xDepth + 2}`,
                    gridRow: `${yDepth} / span 1`,
                    animation: `example ${(xDepth + yDepth) / 3}s linear 1 `,
                  }}
                  className="lineHorizontal"
                ></div>
              );

              //itereate xDepth
              xDepth++;
              //restart the loop
              continue;
            }

            //current does not have a child or sibling
            if (!current.sibling && !current.child) {
              //iterate current to it's return key value (parent)
              current = current.return;
              //set the initX variable to the xDepth of the new current
              initX = nodeTracker.filter(
                (el) => el.debug === current._debugID
              )[0].x;
              //decrement y because we're always only returning up one later
              yDepth--;
              //reenter the loop
              continue;
            }
          }

          //if the node is already created
          if (arr.indexOf(current) !== -1) {
            //check to see if it has a sibling
            if (current.sibling) {
          //create a horizontal line stretching from the initX to the xDepth+2
              lineList.push(
                <div
                  style={{
                    animation: `example ${(xDepth + yDepth) / 3}s linear 1`,
                    gridColumnStart: `${initX}`,
                    gridColumnEnd: `${xDepth + 2}`,
                    gridRow: `${yDepth} / span ${1}`,
                  }}
                  className="lineHorizontal"
                ></div>
              );
              //itereate to the sibling
              current = current.sibling;
                  //increment the xDepth
              xDepth++;
//reenter the loop
              continue;
            }
            //if there is no sibling, iterate back to the return key.
            current = current.return;
            continue;
          }
        }
//set the NodeBoxArray state the nodeList array
        setNodeBoxArray(nodeList);
        //set the LineArray state to the lineList array
        setLineArray(lineList);
      }
    }
    //run everytime add is updated
  }, [add]);


  //simple tree algo
  useEffect(() => {
    if (version === 'Simple')
      if (variable > 1) {
        let current = newObj._owner;
        const head = current;
        let arr = [head];
        let lineList = [
          <div
            style={{
              gridColumn: `${1} / span 1`,
              gridRow: `${2} / span 2`,
              animation: `example2 1s linear 1`,
            }}
            className="lineVertical"
          ></div>,
        ];
        let nodeList = [
          <button
            key={current.key}
            className="nodes"
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 'span 1',
              gridRowStart: 2,
              gridRowEnd: 'span 1',
              justifySelf: 'center',
              // marginTop: '30px',
              animation: `blinker ${(2 + 1) / 3}s linear 1`,
            }}
          >
            <b style={{ fontSize: '10px' }}>APP</b>
            {current.type}
          </button>,
        ];

        class NodeMaker {
          constructor(key, x, y, debug) {
            this.key = key;
            this.x = x;
            this.y = y;
            this.debug = debug;
          }
        }

        let nodeMade = null;

        let nodeTracker = [];
        current = current.child;

        let yDepth = 3;
        let xDepth = 1;
        let previousX = 0;
        let initX = 1;
        //only compare
        //as long as we're not at the top keep going
        while (current !== head) {
          if (current.tag == 6 || current.tag == 7) {
            yDepth--;
            previousX = xDepth;

            current = current.return;
            continue;
          }

          // if (current.memoizedProps !== current.alternate.memoizedProps) {
          // }
          //optional conditional

          if (arr.indexOf(current) === -1) {
            arr.push(current);
            nodeMade = new NodeMaker(
              current.key,
              xDepth,
              yDepth,
              current._debugID
            );
            nodeTracker.push(nodeMade);
            nodeList.push(
              <button
                key={current.key}
                className="nodes"
                style={{
                  // opacity: 1,
                  animation: `blinker ${(xDepth + yDepth) / 3}s linear 1`,
                  gridColumnStart: xDepth,
                  gridColumnEnd: 'span 1',
                  gridRowStart: yDepth,
                  gridRowEnd: 'span 1',
                  justifySelf: 'center ',
                  zIndex: '0',
                }}
              >
                {current.type != null ? current.type : ''}
                <b style={{ fontSize: '10px' }}>
                  {' '}
                  {current.key != null ? current.key : 'Text'}{' '}
                </b>{' '}
              </button>
            );

            if (current.child) {
              //REALLY important for some reason
              initX = xDepth;
              if (current.child.tag != 6 && current.child.tag != 7) {
                lineList.push(
                  <div
                    style={{
                      gridColumn: `${xDepth} / span 1`,
                      gridRow: `${yDepth} / span 2`,
                      animation: `example2 ${(xDepth + yDepth) / 3}s linear 1`,
                    }}
                    className="lineVertical"
                  ></div>
                );
              }
              current = current.child;

              yDepth++;

              continue;
            }
            if (current.sibling) {
              current = current.sibling;

              lineList.push(
                <div
                  style={{
                    gridColumn: `${xDepth} / ${xDepth + 2}`,
                    gridRow: `${yDepth} / span 1`,
                    animation: `example ${(Depth + yDepth) / 3}s linear 1`,
                  }}
                  className="lineHorizontal"
                ></div>
              );
              xDepth++;
              // nodeList.push(<div className="lineHorizontal"></div>);

              continue;
            }
            if (!current.sibling && !current.child) {
              previousX = xDepth;
              current = current.return;
              initX = nodeTracker.filter(
                (el) => el.debug === current._debugID
              )[0].x;
              console.log(nodeTracker[0]);
              yDepth--;
              continue;
            }
          }
          if (arr.indexOf(current) !== -1) {
            if (current.sibling) {
              lineList.push(
                <div
                  style={{
                    gridColumnStart: `${initX}`,
                    gridColumnEnd: `${previousX + 2}`,
                    gridRow: `${yDepth} / span ${1}`,
                    animation: `example ${(xDepth + yDepth) / 3}s linear 1`,
                  }}
                  className="lineHorizontal"
                ></div>
              );
              current = current.sibling;
              xDepth++;
              // nodeList.push(<div className="lineHorizontal"></div>);
              continue;
            }
            current = current.return;
            continue;
          }
        }
        setNodeBoxArray(nodeList);
        setLineArray(lineList);
      }
  }, [add]);

  useEffect(() => {
    setVariable((x) => x + 1);
  }, [add]);

  return (
    <div key="Original" className="body">
      <div key="TopOf">
        <div key="Second" className="App">
          <button
            onClick={() => {
              version === 'Full' ? setVersion('Simple') : setVersion('Full');
            }}
            key="Nodes"
          >
            {version}
          </button>
        </div>

        <div key="Tempo">
          <button key="Divide">
            {' '}
            {divide} {add}
          </button>
          <button key="Subtract">Subtract</button>
        </div>
        <button
          onClick={() => {
            setAdd((x) => x + 1);
          }}
          key="Add"
        >
          ADD {add}
          {subtract}
        </button>

        <div key="Contain" className="container">
          {nodeBoxArray}
          {lineArray}
        </div>
        <button key="Last"></button>
      </div>
      <div key="poop">HI</div>
    </div>
  );
};

export default App;

