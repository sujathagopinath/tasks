dragElement(document.getElementById("drag"));

function dragElement(ele){
  var pos1=0, pos2=0, pos3=0, pos4=0;
  if(document.getElementById("drag-header")){
    document.getElementById("drag-header").onmousedown = dragMouseDown;
  }else{
    ele.onmousedown = dragMouseDown;

  }

  function dragMouseDown(e){
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e){
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 -e.clientX;
    pos2 = pos4-e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    ele.style.top = (ele.offsetTop - pos2)+ "px";
    ele.style.left = (ele.offsetLeft - pos1)+ "px";
  }
  function closeDragElement(){
    document.onmouseup = null;
    document.onmousemove =null;
  }
}