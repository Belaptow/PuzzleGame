import * as ReactDOM from 'react-dom';
import * as React from 'react';
require("./datastruct.css")

var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}


function BinarySearchTree() {
    this.root = null;
    // change code below this line
    this.add = (val) => {
        //console.log(typeof(val.props.num))
        if (this.root) {
            let currentNode = this.root;
            while (currentNode.left !== null || currentNode.right !== null) {
                if (currentNode.value.props.num > val.props.num && currentNode.left !== null) {
                    //console.log('left');
                    currentNode = currentNode.left;
                } else if (currentNode.value.props.num < val.props.num && currentNode.right !== null) {
                    //console.log('right');
                    currentNode = currentNode.right;
                } else {
                    break;
                }

            }
            //console.log(currentNode);
            if (currentNode.value.props.num > val.props.num) {
                //console.log('poke2');
                //console.log(currentNode);
                let node = new Node(val);
                let temp = currentNode.left;
                currentNode.left = node;
                if (temp !== null) {
                    if (node.value.props.num > temp.value.props.num) {
                        currentNode.left.left = temp;
                        return (undefined);
                    } else {
                        currentNode.left.right = temp;
                        return (undefined);
                    }
                } else {
                    return (undefined);
                }
            } else if (currentNode.value.props.num < val.props.num) {
                //console.log('poke1');
                //console.log(currentNode);
                let node = new Node(val);
                let temp = currentNode.right;
                currentNode.right = node;
                if (temp !== null) {
                    if (node.value.props.num > temp.value.props.num) {
                        currentNode.right.left = temp;
                        return (undefined);
                    } else {
                        currentNode.right.right = temp;
                        return (undefined);
                    }
                } else {
                    return (undefined);
                }
            }
        } else if (typeof (val.props.num) == 'number') {
            let node = new Node(val);
            this.root = node;
            return (undefined);
        }
        return (null);
    }
    this.findMin = () => {
        if (this.root) {
            let currentNode = this.root;
            while (currentNode.left !== null) {
                currentNode = currentNode.left;
            }
            return (currentNode.value.props.num);
        } else {
            return (null);
        }
    }
    this.findMax = () => {
        if (this.root) {
            let currentNode = this.root;
            while (currentNode.right !== null) {
                currentNode = currentNode.right;
            }
            return (currentNode.value.props.num);
        } else {
            return (null);
        }
    }
    this.isPresent = (val) => {
        if (!this.root || !val) {
            return (false)
        }
        let currentNode = this.root;
        while (currentNode !== null) {
            if (val > currentNode.value.props.num) {
                currentNode = currentNode.right;
            } else if (val < currentNode.value.props.num) {
                currentNode = currentNode.left;
            } else {
                break;
            }
        }
        if (currentNode) {
            return (true);
        } else {
            return (false);
        }
    }
    this.findMaxHeight = () => {
        if (!this.root) {
            return (-1);
        } else {
            let height = 0;
            function checkTree(node, h) {
                let curHeight = h;
                if (node.left !== null) {
                    let left = node.left;
                    curHeight++;
                    //console.log('curHeight: ' + curHeight);
                    checkTree(left, curHeight);
                } else {
                    if (height < curHeight) {
                        height = curHeight;
                    }
                }
                curHeight = h;
                if (node.right !== null) {
                    let right = node.right;
                    curHeight++;
                    checkTree(right, curHeight);
                } else {
                    if (height < curHeight) {
                        height = curHeight;
                    }
                }
            }
            checkTree(this.root, 0);
            return (height);
        }
    }
    this.findMinHeight = () => {
        if (!this.root) {
            return (-1);
        } else {
            let height = 10000;
            function checkTree(node, h) {
                let curHeight = h;
                if (node.left !== null) {
                    let left = node.left;
                    curHeight++;
                    //console.log('curHeight: ' + curHeight);
                    checkTree(left, curHeight);
                } else {
                    if (height > curHeight && node.right === null) {
                        height = curHeight;
                    }
                }
                curHeight = h;
                if (node.right !== null) {
                    let right = node.right;
                    curHeight++;
                    checkTree(right, curHeight);
                } else {
                    if (height > curHeight && node.left === null) {
                        height = curHeight;
                    }
                }
            }
            checkTree(this.root, 0);
            return (height);
        }
    }

    this.isBalanced = () => {
        if (!this.root) {
            return (null);
        }
        if (this.findMaxHeight() - this.findMinHeight() <= 1) {
            return (true);
        } else {
            return (false);
        }
    }

    this.preorder = () => {
        if (!this.root) {
            return (null);
        } else {
            function Set() {
                this.collection = [];
                this.add = (val) => {
                    if (this.collection.indexOf(val) == -1) {
                        this.collection.push(val);
                    }
                }
            }
            let arr = new Set();
            function checkTree(node) {
                if (node.left !== null) {
                    let left = node.left;
                    arr.add(node.value);
                    checkTree(left);
                } else {
                    arr.add(node.value);
                }
                if (node.right !== null) {
                    let right = node.right;
                    arr.add(node.value);
                    checkTree(right);
                } else {
                    arr.add(node.value);
                }
            }
            let tempRoot = this.root;
            checkTree(this.root);
            return (arr.collection);
        }
    }
    this.inorder = () => {
        if (!this.root) {
            return (null);
        } else {
            let arr = [];
            function inOrderHelper(root) {
                if (root !== null) {
                    inOrderHelper(root.left);
                    arr.push(root.value);
                    inOrderHelper(root.right);
                }
            }
            inOrderHelper(this.root);
            return (arr);
        }
    }

    this.postorder = () => {
        if (!this.root) {
            return (null);
        } else {
            let arr = [];
            function inOrderHelper(root) {
                if (root !== null) {
                    inOrderHelper(root.left);
                    inOrderHelper(root.right);
                    arr.push(root.value);
                }
            }
            inOrderHelper(this.root);
            return (arr);
        }
    }
    this.levelOrder = () => {
        if (!this.root) {
            return (null);
        } else {
            let tempRoot = this.root;
            let queue = [this.root];
            let arr = [];
            let findDistance = this.findDistance;
            function inOrderHelper() {
                let cur = queue.shift();
                if (cur) {
                    //console.log(cur.value);
                    arr.push([cur.value.props.num, findDistance(tempRoot, cur.value.props.num)]);
                    if (cur.left !== null) {
                        queue.push(cur.left);
                    }
                    if (cur.right !== null) {
                        queue.push(cur.right);
                    }
                    //curLevel++;
                    inOrderHelper();
                }
            }
            inOrderHelper(this.root);
            return (arr);
        }
    }

    this.reverseLevelOrder = () => {
        if (!this.root) {
            return (null);
        } else {
            let queue = [this.root];
            let arr = [];
            function inOrderHelper() {
                let cur = queue.shift();
                if (cur) {
                    //console.log(cur.value);
                    arr.push(cur.value);
                    if (cur.right !== null) {
                        queue.push(cur.right);
                    }
                    if (cur.left !== null) {
                        queue.push(cur.left);
                    }
                    inOrderHelper();
                }
            }
            inOrderHelper(this.root);
            return (arr);
        }
    }

    this.findDistance = (node, x) => {
        if (!node || !this.isPresent(x)) {
            //console.log('nonexistant')
            return -1;
        } else {
            let dist = -1;
            if ((node.value.props.num == x) || (dist = this.findDistance(node.left, x)) >= 0 || (dist = this.findDistance(node.right, x)) >= 0) {
                dist++;
            }
            return (dist);
        }
    }
    this.reset = () => {
        this.root = null;
    }
    // change code above this line
}

const TreeNode = (props) => {
    return (<div className="treeNode"><h4 id={props.num}>{props.num}</h4></div>);
}

const TreeRender = (props) => {
    //console.log(props.tree.value.props.num);
    //condition ? true : false
    let tempSize = props.size;
    let tempSize2 = props.size - 5
    let tdStyle = {
        fontSize: tempSize + 'px'
    }
    let tdStyle2 = {
        fontSize: tempSize2 + 'px'
    }
    if (props.tree) {
        return (
            <div className="subtree">
                <tr><td style={tdStyle}>{props.tree.value}</td></tr>
                <tr>
                    <td style={tdStyle2}>{props.tree.left !== null ? <TreeRender tree={props.tree.left} size={tempSize2} /> : ''}</td>
                    <td style={tdStyle2}>{props.tree.right !== null ? <TreeRender tree={props.tree.right} size={tempSize2} /> : ''}</td>
                </tr>
            </div>
        );
    }
    else {
        return (<h4>start a tree</h4>)
    }
}


var tree = new BinarySearchTree();
/*
tree.add(<TreeNode num={8}/>)
tree.add(<TreeNode num={3}/>)
tree.add(<TreeNode num={1}/>)
tree.add(<TreeNode num={6}/>)
tree.add(<TreeNode num={4}/>)
tree.add(<TreeNode num={7}/>)
tree.add(<TreeNode num={10}/>)
tree.add(<TreeNode num={14}/>)
tree.add(<TreeNode num={13}/>)
*/
//console.log(tree.levelOrder());
//displayTree(tree);
//console.log(tree.findDistance(tree.root, 7));
//console.log(tree.root);

const Cell = props => {
    return (
        <div className="stack-cell">
            <h3>{props.val}</h3>
        </div>
    );
};

const CircCell = props => {
    return (
        <div className="stack-cell">
            <h3>{props.val}</h3>
        </div>
    );
};

function PriorityQueue() {
    this.collection = [];
    this.printCollection = function () {
        console.log(this.collection);
    };
    this.add = item => {
        let tempArr = this.collection;
        if (tempArr.length == 0) {
            tempArr.unshift(item);
        } else {
            for (let i = tempArr.length - 1; i >= 0; i--) {
                if (item[1] >= tempArr[i][1]) {
                    tempArr.splice(i + 1, 0, item);
                    break;
                } else if (i == 0) {
                    tempArr.unshift(item);
                }
            }
        }

        this.collection = tempArr;
    };
    this.dequeue = () => {
        return this.collection.shift();
    };
    this.size = () => {
        return this.collection.length;
    };
}

class CircularQueue {
    constructor(size) {
        this.queue = [];
        this.read = 0;
        this.write = 0;
        this.max = size - 1;

        while (size > 0) {
            this.queue.push(<CircCell val={"null"} />);
            size--;
        }
    }

    print() {
        return this.queue;
    }

    enqueue(item) {
        if (this.queue[this.write].props.val === "null") {
            this.queue[this.write++] = item;

            if (this.write > this.max) this.write = 0;
            return item;
        }
        return null;
    }

    dequeue() {
        if (this.queue[this.read].props.val != "null") {
            let item = this.queue[this.read];
            this.queue.splice(this.read++, 1);
            this.queue.splice(this.read - 1, 0, <CircCell val={"null"} />);
            if (this.read > this.max) this.read = 0;
            return item;
        }
        return null;
    }

    clear() {
        for (let i = 0; i <= this.max; i++) {
            this.queue[i] = <CircCell val={"null"} />;
        }
        this.read = 0;
        this.write = 0;
    }
}

var testCircularQueue = new CircularQueue(10);
var testPriorQueue = new PriorityQueue();
//root ReactComponent
class RootComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: true
        };
    }

    render() {
        var queue = new PriorityQueue();
        return (
            <div className="bodyWrap">

                <div className="rootWrap" id="rootWrap">
                    <div className="header">
                        <h1>Data structures</h1>
                    </div>

                    <div className="info-wrap">
                        <h3>Stack</h3>
                        <p>
                            Stack is basically an array of information with restrictions to how
                            it can be accessed
          </p>
                        <p>
                            Last added element will always be removed first and you can access
                            only it at any given time
          </p>
                        <StackComponent />
                    </div>
                    <h3>Applications of stack</h3>
                    <ul>
                        <li>Redo-undo features at many places like editors, photoshop.</li>
                        <li>Forward and backward feature in web browsers</li>
                        <li>Infix to Postfix /Prefix conversion</li>
                        <li>
                            In Graph Algorithms like Topological Sorting and Strongly Connected
                            Components
          </li>
                    </ul>
                    <div className="info-wrap">
                        <h3>Queue</h3>
                        <p>Queue is similar to stack in terms of access restrictions:</p>
                        <p>
                            The only difference is that here "last in - last out" rule applies,
                            so elements are always drawn from the beggining and added to the end
          </p>
                        <QueueComponent />
                    </div>
                    <h3>Applications of queue</h3>
                    <ul>
                        <li>
                            Serving requests on a single shared resource, like a printer, CPU
                            task scheduling etc
          </li>
                        <li>Handling asynchronous requests from users on web-service</li>
                        <li>
                            Handling of interrupts in real-time systems. The interrupts are
                            handled in the same order as they arrive i.e First come first
                            served.
          </li>
                    </ul>
                    <div className="info-wrap">
                        <h3>Priority queue</h3>
                        <p>Subclass of queue, in which enqueuing depends on added priority</p>
                        <PriorityQueueComponent coll={queue} />
                    </div>
                    <h3>Applications of priority queue</h3>
                    <ul>
                        <li>Dijkstra’s Shortest Path Algorithm using priority queue</li>
                        <li>Prim’s algorithm</li>
                        <li>
                            Data compression : It is used in Huffman codes which is used to
                            compresses data.
          </li>
                        <li>
                            Operating systems: It is also use in Operating System for load
                            balancing (load balancing on server), interrupt handling.
          </li>
                    </ul>
                    <div className="info-wrap">
                        <h3>Circular queue</h3>
                        <p>
                            Subclass of queue, in which length of queue is restricted, but
                            overwriting of previous elements is possible
          </p>
                        <CircularQueueComponent />
                    </div>
                    <h3>Applications of circular queue</h3>
                    <ul>
                        <li>Memory Management: The unused memory locations in the case of ordinary queues can be utilized in circular queues.</li>
                        <li>Traffic system: In computer controlled traffic system, circular queues are used to switch on the traffic lights one by one repeatedly as per the time set.</li>
                        <li>CPU Scheduling: Operating systems often maintain a queue of processes that are ready to execute or that are waiting for a particular event to occur.</li>
                    </ul>
                    <div className="info-wrap">
                        <BinaryTreeComponent />
                    </div>
                </div>
            </div>
        );
    }
}

const ChildComponent = () => {
    return <h4>I am a child</h4>;
};

const PriorityCell = props => {
    return (
        <div className="stack-cell">
            <h3>{props.item}</h3>
            <h4>{props.pr}</h4>
        </div>
    );
};

class QueueComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curLength: 0,
            curVal: 1,
            collection: [],
            restriction: 10
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset() {
        this.setState({
            curLength: 0,
            curVal: 1,
            collection: [],
            restriction: 10
        });
    }
    handleAdd() {
        if (this.state.curLength < this.state.restriction) {
            //console.log('Add');
            let tempArr = this.state.collection;
            tempArr.push(<Cell val={this.state.curVal} />);
            //console.log(tempArr);
            this.setState({
                curLength: this.state.curLength + 1,
                curVal: this.state.curVal + 1,
                collection: tempArr
            });
        }
    }
    handleRemove() {
        if (this.state.curLength > 0) {
            //console.log('remove');
            let tempArr = this.state.collection;
            tempArr.shift();
            this.setState({
                curLength: this.state.curLength - 1,
                collection: tempArr
            });
        }
    }
    render() {
        return (
            <div className="stack-component">
                <button onClick={this.handleAdd} className="buttons">
                    Add
        </button>
                <button onClick={this.handleRemove} className="buttons">
                    Remove
        </button>
                <button onClick={this.handleReset} className="buttons">
                    Reset
        </button>
                <div className="queue-wrapper">{this.state.collection}</div>
            </div>
        );
    }
}

class StackComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curLength: 0,
            curVal: 1,
            collection: [],
            restriction: 10
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleAdd() {
        if (this.state.curLength < this.state.restriction) {
            //console.log('Add');
            let tempArr = this.state.collection;
            tempArr.push(<Cell val={this.state.curVal} />);
            //console.log(tempArr);
            this.setState({
                curLength: this.state.curLength + 1,
                curVal: this.state.curVal + 1,
                collection: tempArr
            });
        }
    }
    handleRemove() {
        if (this.state.curLength > 0) {
            //console.log('remove');
            let tempArr = this.state.collection;
            tempArr.pop();
            this.setState({
                curLength: this.state.curLength - 1,
                curVal: this.state.curVal - 1,
                collection: tempArr
            });
        }
    }
    render() {
        return (
            <div className="stack-component">
                <button onClick={this.handleAdd} className="buttons">
                    Add
        </button>
                <button onClick={this.handleRemove} className="buttons">
                    Remove
        </button>
                <div className="stack-wrapper">{this.state.collection}</div>
            </div>
        );
    }
}


class PriorityQueueComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curLength: 0,
            curVal: 1,
            collection: testPriorQueue,
            restriction: 5
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset() {
        //console.log('reset');
        let tempQueue = new PriorityQueue();
        this.setState({
            curLength: 0,
            curVal: 1,
            collection: tempQueue,
            restriction: 5
        });
    }
    handleAdd() {
        if (this.state.curLength < this.state.restriction) {
            let tempQueue = this.state.collection;
            let list = document.getElementById("priority-select");
            let listItems = document.getElementById("item-select");
            let priority = list.options[list.selectedIndex].value;
            let item = listItems.options[listItems.selectedIndex].innerHTML;
            //console.log('poke2');
            //console.log(tempQueue)
            tempQueue.add([
                <PriorityCell pr={priority} item={item} />,
                Number(priority)
            ]);
            //console.log(tempQueue)
            this.setState({
                curLength: this.state.curLength + 1,
                curVal: this.state.curVal + 1,
                collection: tempQueue
            });
        }
    }
    handleRemove() {
        if (this.state.curLength > 0) {
            //console.log('remove');
            let tempQueue = this.state.collection;
            tempQueue.dequeue();
            this.setState({
                curLength: this.state.curLength - 1,
                collection: tempQueue
            });
        }
    }
    render() {
        //console.log(this.state.collection);
        return (
            <div className="stack-component">
                <button onClick={this.handleAdd} className="buttons">
                    Add
        </button>
                <button onClick={this.handleRemove} className="buttons">
                    Remove
        </button>
                <button onClick={this.handleReset} className="buttons">
                    Reset
        </button>
                <select size="1" id="priority-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                <select size="1" id="item-select">
                    <option>pen</option>
                    <option>nap</option>
                    <option>kyu</option>
                    <option>fly</option>
                    <option>oak</option>
                </select>
                <div className="queue-wrapper">{this.state.collection.collection}</div>
            </div>
        );
    }
}

const CircQueueIndex = props => {
    let tempArr = [];
    for (let i = 0; i < 10; i++) {
        if (props.read == i && props.write == i) {
            tempArr.push(
                <div className="circ-queue-ind-cell">
                    <span>^R^W</span>
                </div>
            );
        } else if (props.read == i) {
            tempArr.push(
                <div className="circ-queue-ind-cell">
                    <span>^R</span>
                </div>
            );
        } else if (props.write == i) {
            tempArr.push(
                <div className="circ-queue-ind-cell">
                    <span>^W</span>
                </div>
            );
        } else {
            tempArr.push(
                <div className="circ-queue-ind-cell">
                    <span />
                </div>
            );
        }
    }
    return tempArr;
};

class CircularQueueComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curLength: 0,
            curVal: 1,
            restriction: 10,
            display: 0
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset() {
        testCircularQueue.clear();
        this.setState({
            curLength: 0,
            curVal: 1,
            restriction: 10,
            display: 0
        });
    }
    handleAdd() {
        testCircularQueue.enqueue(<CircCell val={this.state.curVal} />);
        this.setState({
            curVal: this.state.curVal + 1,
            curLength: this.state.curLength + 1
        });
    }
    handleRemove() {
        let temp = testCircularQueue.dequeue().props.val;
        this.setState({
            display: temp
        });
    }
    render() {
        return (
            <div className="stack-component">
                <button onClick={this.handleAdd} className="buttons">
                    Add
        </button>
                <button onClick={this.handleRemove} className="buttons">
                    Read
        </button>
                <button onClick={this.handleReset} className="buttons">
                    Reset
        </button>

                <span className="display-span">last element read {this.state.display}</span>
                <div className="queue-wrapper">{testCircularQueue.queue}</div>
                <div className="circ-queue-indicator">
                    <CircQueueIndex
                        read={testCircularQueue.read}
                        write={testCircularQueue.write}
                    />
                </div>
            </div>
        );
    }
}


class BinaryTreeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curLength: 0
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleMin = this.handleMin.bind(this);
        this.handleMax = this.handleMax.bind(this);
        this.handleMinH = this.handleMinH.bind(this);
        this.handleMaxH = this.handleMaxH.bind(this);
        this.handleIsPresent = this.handleIsPresent.bind(this);
        this.handleIsBalanced = this.handleIsBalanced.bind(this);
        this.handleDefault = this.handleDefault.bind(this);
    }
    componentDidMount() {
        //console.log('mounted')

        //linesRender(tree.root);
    }
    componentDidUpdate() {
        //console.log('updated')


        //testRender();
    }
    shouldComponentUpdate() {
        //console.log('shouldUpdate')
        //renderCanvas();
        return (true);
    }
    handleAdd() {
        let tempVal = parseInt(document.getElementById('treeInput').value);

        if (!isNaN(tempVal)) {
            tree.add(<TreeNode num={tempVal} />);
        }

        document.getElementById('treeInput').value = '';
        document.getElementById('treeInput').focus();
        this.setState({
            curLength: this.state.curLength + 1
        });
    }
    handleReset() {
        //console.log('reset');
        tree.reset();
        //console.log(tree.root);
        this.setState({
            curLength: 0
        });
    }
    handleMin() {
        //console.log('findMin')
        if (tree.findMin()) {
            //console.log('exec')
            let minVal = tree.findMin();
            //console.log(minVal)
            document.getElementById('treeOut').value = minVal;
            this.render();
        }
    }
    handleMax() {
        //console.log('findMin')
        if (tree.findMax()) {
            //console.log('exec')
            let maxVal = tree.findMax();
            //console.log(minVal)
            document.getElementById('treeOut').value = maxVal;
            this.render();
        }
    }
    handleMinH() {
        let tempH = tree.findMinHeight();
        document.getElementById('treeOut').value = tempH;
        this.render();
    }
    handleMaxH() {
        let tempH = tree.findMaxHeight();
        document.getElementById('treeOut').value = tempH;
        this.render();
    }
    handleIsPresent() {
        //console.log('isPresent')
        let tempVal = parseInt(document.getElementById('treeInput').value);
        let flag = tree.isPresent(tempVal);
        //console.log(tempVal, flag)
        document.getElementById('treeOut').value = flag + '';
        this.render();
    }
    handleIsBalanced() {
        let flag = tree.isBalanced();
        document.getElementById('treeOut').value = flag + '';
        this.render();
    }
    handleDefault() {
        tree.reset();
        tree.add(<TreeNode num={8} />)
        tree.add(<TreeNode num={3} />)
        tree.add(<TreeNode num={1} />)
        tree.add(<TreeNode num={6} />)
        tree.add(<TreeNode num={4} />)
        tree.add(<TreeNode num={7} />)
        tree.add(<TreeNode num={10} />)
        tree.add(<TreeNode num={14} />)
        tree.add(<TreeNode num={13} />)
        this.setState({
            curLength: 0
        });
    }
    render() {
        return (
            <div className="stack-component" id="stack">
                <div className="tree-controls" id="tree-controls">
                    <p>Controls</p>
                    <span>value input =></span>
                    <input className="treeInput" id="treeInput" type="text" />
                    <button onClick={this.handleAdd} className="buttons">
                        Add
        </button>
                    <button onClick={this.handleReset} className="buttons">
                        Reset
        </button>
                    <button onClick={this.handleDefault} className="buttons">Build default</button><br />
                    <div className="output-controls">
                        <td>
                            <span className="tree-out-header">value output =></span>
                            <input className="treeOut" type="text" id='treeOut' />
                        </td>
                        <td>
                            <div className="treeOutButtons">
                                <button className="buttons treeButtons" onClick={this.handleMin}>Min</button>
                                <button className="buttons treeButtons" onClick={this.handleMax}>Max</button>
                                <button className="buttons treeButtons" onClick={this.handleMinH}>MinH</button>
                                <button className="buttons treeButtons" onClick={this.handleMaxH}>MaxH</button>
                                <button className="buttons treeButtons isPresentTree" onClick={this.handleIsPresent}>IsPresent</button>
                                <button className="buttons treeButtons isBalanced" onClick={this.handleIsBalanced}>IsBalanced</button>
                            </div>
                        </td>
                    </div>
                </div>

                <div className="treeWrap" id='treeWrap'><TreeRender tree={tree.root} size={35} /></div>
            </div>
        )

    }
}

ReactDOM.render(<RootComponent />, document.getElementsByTagName("BODY")[0]);