var canvasWidth = 800;
var canvasHeight = canvasWidth*0.8;
var isMouseDown=false;
var Lastloc={x:0,y:0};
var LastTimestamp=0;
var LastLineWidth=-1;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

drawgrid();
 
 
canvas.onmousedown=function(e){
	e.preventDefault();
	isMouseDown=true;
	Lastloc=windowToCanvas(e.clientX,e.clientY);
	LastTimestamp=new Date().getTime(); 
}
canvas.onmouseup=function(e){
	e.preventDefault();
	isMouseDown=false;
	 
}
canvas.onmouseout=function(e){
	e.preventDefault();
	isMouseDown=false;
	 
}
canvas.onmousemove=function(e){
	e.preventDefault();
	if (isMouseDown ) {
		 var curLoc=windowToCanvas(e.clientX,e.clientY);
		 var curTimestamp=new Date().getTime();
		 var s=calcDiatance(curLoc,Lastloc);
		 var t=curTimestamp-LastTimestamp;
		
		 var linewidth=calcLineWidth(t,s);
		 
		 
		 
		 context.beginPath();
		 context.moveTo(Lastloc.x,Lastloc.y);
		 context.lineTo(curLoc.x,curLoc.y);
		  
		 context.strokeStyle="black";
		 context.lineWidth=linewidth;
		 context.lineCap="round";//线条的帽子
		 context.lineJoin="round";//线条转角的样式
		 context.stroke();
		
		 Lastloc=curLoc;
		 LastTimestamp=curTimestamp;
		 LastLineWidth=linewidth;
 	};
}
function calcLineWidth(t,s){
	var v=s/t;
	
	var resultLineWidth;
	if (v<=0.1)  
		resultLineWidth=30;
	else if(v>=10)
		resultLineWidth=1;
	else
		resultLineWidth=30-(v-0.1)/(10-0.1)*(30-1);
	if(LastLineWidth==-1)
		return resultLineWidth;
		
	return LastLineWidth*3/5+resultLineWidth*2/5;
	
}
//测距
function calcDiatance(loc1,loc2){
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y)); //求两点之间的距离
}

function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	return{x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)} //Math.round四舍五入
}

function drawgrid() {
	context.save();
	context.strokeStyle = "red";

	context.beginPath();
	context.moveTo(3, 3);
	context.lineTo(canvasWidth - 3, 3);
	context.lineTo(canvasWidth - 3, canvasHeight - 3);
	context.lineTo(3, canvasHeight - 3);
	context.closePath();
	context.lineWidth = 6;
	context.stroke();
	
	 
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(canvasWidth, canvasHeight);

	context.moveTo(canvasWidth, 0);
	context.lineTo(0, canvasHeight);

	context.moveTo(canvasWidth / 2, 0);
	context.lineTo(canvasWidth / 2, canvasHeight);

	context.moveTo(0, canvasHeight / 2);
	context.lineTo(canvasWidth, canvasHeight / 2);

	context.lineWidth = 1;
	context.stroke();
	context.restore();
}
function clearCanvas()
{
	window.location.reload();
}
