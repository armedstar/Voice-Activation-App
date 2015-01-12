function includeJS(url) 
{
  if (false == isJSIncluded(url))
  {
    var Script = document.createElement("script");
    Script.type = "text/javascript";
    Script.src = url;
    document.getElementsByTagName("head")[0].appendChild(Script); 
  }  
}

function isJSIncluded(url)
{
  var headNodes = document.getElementsByTagName("head")[0].childNodes;
  var idx = 0;
  var ret = false;
  for(idx = 0; idx < headNodes.length; idx++)
  {
    var node = headNodes.item(idx);
    if (node.nodeName == "SCRIPT" && 
        node.nodeType == 1 && /* element type */
        node.getAttribute("src") == url)
    {
      ret = true;
      break;
    }
  }
  return ret;
}

var logTime = 
{
  last : 0,
  list : null
};

logTime.Init = function()
{
  this.list = new Array();
  this.last = 0;
}

logTime.Reset = function()
{
  while(this.list.length > 0)
  {
    this.list.pop();
  }
  this.last = (new Date()).getTime();
}

logTime.Log = function(text)
{
  var current = (new Date()).getTime();
  var diff = current - this.last;
  this.last = current;
  this.list.push({name:text, value:diff});
}

logTime.Print = function()
{
  var text = "";
  for(var i = 0; i < this.list.length; i++)
  {
    text += this.list[i].name + "=" + this.list[i].value + "\r\n";
  }
  console.log(text);
}
