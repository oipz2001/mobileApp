
const Graph = require('digraphe')

var graph = new Graph();


const twoBitOpposite = (number) => {
    if(number==0) return 2
    else if(number==1)  return 3
    else if(number==2)  return 0
    else return 1
}

const addMapSeat = (studentRef,studentPointed,direction,graph) =>{
    graph.addEdge(studentRef, studentPointed,{ weight: direction} );
    graph.addEdge(studentPointed,studentRef,{ weight: twoBitOpposite(direction)} );
}

addMapSeat('A', 'D',0,graph)
addMapSeat('B', 'D',1,graph)
addMapSeat('B', 'C',0,graph)
addMapSeat('F', 'B',0,graph)
addMapSeat('G', 'F',1,graph)
addMapSeat('L', 'M',0,graph)
addMapSeat('M', 'N',0,graph)
addMapSeat('O', 'J',1,graph)
addMapSeat('P', 'O',1,graph)
addMapSeat('AF', 'I',0,graph)
addMapSeat('Q', 'R',0,graph)

addMapSeat('Z', 'Y',1,graph)
addMapSeat('AC', 'AB',1,graph)
addMapSeat('V', 'T',1,graph)
addMapSeat('T', 'X',0,graph)

addMapSeat('C', 'AF',1,graph)
addMapSeat('H', 'C',1,graph)
addMapSeat('N', 'H',1,graph)
addMapSeat('Q', 'R',0,graph)

addMapSeat('K', 'I',1,graph)
addMapSeat('J', 'K',1,graph)
addMapSeat('R', 'S',0,graph)
addMapSeat('W', 'T',0,graph)

addMapSeat('X', 'AA',0,graph)
addMapSeat('Y', 'AB',1,graph)
addMapSeat('AB', 'AA',0,graph)

// Graph.Visitor.DFS(graph, 'A', function (node) {
    
//     console.log(node.edges);
    

// });
// var myNodeList = ['A','F','D','B','G','L','N','M','P','O','S']
var seatMapGroup = []
var myNodeList = ['A','D','B','F','G','C','H','L','M','N','AF','I','K','J','O','P','AE','Q','R','S','W','T','V','X','AA','AB','Y','Z','AC','AD',]
var countGroup = 0
// myNodeList.forEach(studentNode => {
while(myNodeList.length != 0){
    studentNode = myNodeList[0]
    // console.log(studentNode);
    // console.log(myNodeList);
    




var myVisitedNodeList = []
var seatMap = new Map()
if(graph.hasNode(studentNode)){
Graph.Visitor.BFS(graph, studentNode, function (array_of_nodes, depth) {
    
    array_of_nodes.forEach(myNode => {
        // console.log(myNode.id);
        var index = myNodeList.indexOf(myNode.id)
        myNodeList.splice(index,1)
        
        var adjList = [] 
        seatMap.set(myNode.id,adjList)
        
        myNode.edges.forEach(myEdge => {
            
            if(myEdge.source.id == myNode.id && !myVisitedNodeList.includes(myEdge.target.id)){
                var adjPair = []
                var direction = 'none'
                if(myEdge.weight == 0){
                    direction = "Right"
                }else if(myEdge.weight == 1){
                    direction = "Front"
                }else if(myEdge.weight == 2){
                    direction = "Left"
                }else{
                    direction = "Back"
                }
                adjPair = [myEdge.target.id,direction]

                adjList.push(adjPair)

                // console.log(myNode.id+ ' >> '+ myEdge.target.id+ '( '+ direction +')');
                
                // console.log(adjList);
            }
            
            
            
            
        });
        // console.log('--------------------------------------------------------');
        
        myVisitedNodeList.push(myNode.id)
        // console.log(myNode);
    });

    
});
    seatMapGroup.push(seatMap)

}else{
    seatMap.set(studentNode,null)
    seatMapGroup.push(seatMap)
    myNodeList.splice(0,1)
    
}

// console.log(myNodeList);
// console.log(seatMap);


countGroup+=1

}


// console.log(seatMapGroup);
// console.log(countGroup);

seatMapGroup.forEach(seatmap => {
    // seatmap.forEach((val,key)=>{
    //     console.log(key,val);
    // })
    console.log(seatmap);
})


