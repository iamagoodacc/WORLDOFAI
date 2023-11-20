function GetRandomInt(min, max) { // random integer for pixels
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function FindDistance(Node1, Node2) { // pythagoras to find distance between two points
    X = Number(Node1.getAttribute("cx")) - Number(Node2.getAttribute("cx"));
    Y = Number(Node1.getAttribute("cy")) - Number(Node2.getAttribute("cy"));
    Distance = Math.sqrt((X**2)+(Y**2));

    return Distance;
}

function CheckValidNode(Nodes, Node, MinDistance) { // checking if the pythag distance between the checking node and the rest is valid
    var Valid = true;

    for (var Point of Nodes) { // looping through every node
        if (Point != Node) {
            // if (Math.abs((Number(Node.getAttribute("cx")) - Number(Point.getAttribute("cx"))) + (Number(Node.getAttribute("cy")) - Number(Point.getAttribute("cy")))) < MinDistance) {
            //     Valid = false
            // } // manhatten distance calculator
            if (FindDistance(Node, Point) < MinDistance) {
                Valid = false;
            }
        }
    }

    return Valid;
}

function ShuffleArray(Array) {
    return Array.sort(() => Math.random() - 0.5);
  }

function ConnectNodes(Nodes, TEMPLATE) { // connect lines from each node to some amount of other nodes
    for (var Node of Nodes) {
        var LineNumber = GetRandomInt(Math.round(Nodes.length/7), Math.round(Nodes.length/6)); // calculate some random number of lines for each node
        var ConnectedNodes = [];

        var RemainingNodes = Nodes.filter((otherNode) => otherNode != Node && !ConnectedNodes.includes(otherNode)); // create a new array with a filter applied in which it does not include itself and the ones it has already connected to

        for (var i = 0; i < LineNumber; i++) { // iterate over then number of connections you want for each node
            const RandomIndex = Math.floor(Math.random() * RemainingNodes.length);
            const SecondNode = RemainingNodes[RandomIndex];
            RemainingNodes.splice(RandomIndex, 1); // remove it from the original cloned array of nodes with filter so it cant be chosen again

            var NewLine = document.createElementNS("http://www.w3.org/2000/svg", "line"); // begin creating line

            ConnectedNodes.push(SecondNode)
            NewLine.setAttribute("x1", Node.getAttribute("cx")); // x-cord of node we draw from
            NewLine.setAttribute("y1", Node.getAttribute("cy")); // y-cord of node we draw from
            NewLine.setAttribute("x2", SecondNode.getAttribute("cx")); // x-cord of node we draw to
            NewLine.setAttribute("y2", SecondNode.getAttribute("cy")); // y-cord of the node we draw to
            NewLine.setAttribute("stroke", "#0074C1"); // line color
            NewLine.setAttribute("stroke-width", 2); // line width in pixels

            TEMPLATE.appendChild(NewLine); // add it to the svg 'frame'
        }

        //OLD TRIAL
        // for (var SecondNode of Nodes) { // nested loop to iterate through remaining nodes which you will be connecting to
        //     if ((SecondNode != Node) && (LineNumber > 0)) { // make sure we didnt pick the same node, you cant connect a node to itself
        //         var NewLine = document.createElementNS("http://www.w3.org/2000/svg", "line"); // begin creating line
        //         var RemainingNodes = Nodes.filter((otherNode) => otherNode != Node && !ConnectNodes.includes(otherNode));

        //         ConnectNodes.push(SecondNode)
        //         NewLine.setAttribute("x1", Node.getAttribute("cx")); // x-cord of node we draw from
        //         NewLine.setAttribute("y1", Node.getAttribute("cy")); // y-cord of node we draw from
        //         NewLine.setAttribute("x2", SecondNode.getAttribute("cx")); // x-cord of node we draw to
        //         NewLine.setAttribute("y2", SecondNode.getAttribute("cy")); // y-cord of the node we draw to
        //         NewLine.setAttribute("stroke", "#0074C1"); // line color
        //         NewLine.setAttribute("stroke-width", 2); // line width in pixels

        //         TEMPLATE.appendChild(NewLine); // add it to the svg 'frame'
        //     }
        //     LineNumber--
        // }
    }
}

function GenerateNodes(){ // generate all the nodes at the start
    var TEMPLATE = document.getElementById('NODE-Template');

    var Current_Nodes = []; // current nodes created
    var NodeBoundsX = [50, 1098]; // x bounds in pixels for random
    var NodeBoundsY = [50, 622]; // y bounds in pixels for random
    var NodeAmnt = 10; // number of nodes
    var MinDistance = 200; // minimum distance to allow the points to be apart each other so it isnt clumped

    while (Current_Nodes.length < NodeAmnt) {
        var NewNode = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        NewNode.setAttribute("cx", GetRandomInt(NodeBoundsX[0], NodeBoundsX[1]));
        NewNode.setAttribute("cy", GetRandomInt(NodeBoundsY[0], NodeBoundsY[1])); // just offsetting by 50 so that it isnt at the edge
        NewNode.setAttribute("r", "7"); // radius as 7
        NewNode.setAttribute("stroke", "#0074C1"); // colour
        NewNode.setAttribute("stroke-width", "2"); // width
        NewNode.setAttribute("fill", "#0074C1"); // fill colour

        if ((Current_Nodes.length <= 1) || (CheckValidNode(Current_Nodes, NewNode, MinDistance) == true)) {
            Current_Nodes.push(NewNode);
            TEMPLATE.appendChild(NewNode);
        }

    }   

    ConnectNodes(Current_Nodes, TEMPLATE); // connect each node parsing the node list and the svg 'frame'
}

GenerateNodes();


{/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="7.21955" cy="7.21955" r="6.41096" fill="#0074C1"/>
</svg> */}

{/* <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_65_78)">
<circle cx="17.2192" cy="13.2192" r="12.2192" stroke="#0074C1" stroke-width="2" shape-rendering="crispEdges"/>
</g>
<defs>
<filter id="filter0_d_65_78" x="0" y="0" width="34.4375" height="34.4385" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_65_78"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_65_78" result="shape"/>
</filter>
</defs>
</svg> */}


//SVG LINE DRAWING

// var SVG = document.createElement('svg');
// SVG.style.width = "800";
// SVG.style.height = "400";
// SVG.style.border = "1px solid #000";

// INNER CIRCLE

// position: absolute;
// width: 12.82px;
// height: 12.82px;
// left: 1226.93px;
// top: 372.13px;

// background: #0074C1;

// OUTER CIRCLE

// position: absolute;
// width: 22.44px;
// height: 22.44px;
// left: calc(50% - 22.44px/2 + 513.34px);
// top: 368.92px;

// border: 2px solid #0074C1;
// filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
