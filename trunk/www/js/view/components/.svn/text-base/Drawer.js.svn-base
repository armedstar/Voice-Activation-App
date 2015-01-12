Drawer.prototype = new UIComponent;
Drawer.prototype.constructor = Drawer;

Drawer.prototype.isExpanded = false;

function Drawer(divElem, wrapper, notficationDivElem)
{
    this.divElem = divElem;
    this.wrapper = wrapper;
    this.notficationDivElem = notficationDivElem;
    
    if (this.divElem != null)
    {
        this.divElem.onclick = Relegate.create(this, this.onDrawerClick, this);
    }
    
    this.commands = new Object;
    this.newCommandCount = 0;
}

Drawer.prototype.onDrawerClick = function()
{
    if (!this.isExpanded)
        this.expand();
    else
        this.collapse();
}

Drawer.prototype.hideNewCommandNotification = function()
{
    this.newCommandCount = 0;
    this.notficationDivElem.style.display = 'none';
}

Drawer.prototype.showNewCommandNotification = function()
{
    this.notficationDivElem.style.display = 'block';
    this.notficationDivElem.innerHTML = '<p style="color:#000000;font-weight:bold;">' + this.newCommandCount + '</p>';
}

Drawer.prototype.expand = function()
{
    this.showCommands();
    this.hideNewCommandNotification();
    this.divElem.style.top = '550px';
    this.isExpanded = true;
}

Drawer.prototype.collapse = function()
{
    this.hideCommands();
    this.divElem.style.top = '700px';
    this.isExpanded = false;
}

Drawer.prototype.showCommands = function()
{
    var childNodes = this.wrapper.childNodes;
    for (var i = 0; i < childNodes.length; i++)
    {
        var curChild = childNodes[i];
        curChild.style.display = 'inline';
    }
}

Drawer.prototype.hideCommands = function()
{
    var childNodes = this.wrapper.childNodes;
    for (var i = 0; i < childNodes.length; i++)
    {
        var curChild = childNodes[i];
        curChild.style.display = 'none';
    }
}



Drawer.prototype.addCommand = function(command /*NMSPResponse*/)
{
    //TODO:  figure out what it means to be actionable vs. nonactionable?
    var commandDiv = document.createElement('div');
    commandDiv.id = command.uid;
    commandDiv.className = 'nonActionable';
    var content = '<p style="color:#ffffff;font-family:Museo, sans-serif;padding-left:20px;">' + command.recognizedText + '</p>';
    commandDiv.innerHTML = '<div style="width:190px;height:143px; margin-top:43px; padding:15px 5px; display:inline; float:left;background:url(images/notBox01.png) no-repeat;">' + content + '</div>';
    this.commands[command.uid] = command;
    this.wrapper.appendChild(commandDiv);
    if (this.isExpanded == false)
    {
        this.newCommandCount++;
        this.showNewCommandNotification();
    }
}

Drawer.prototype.clearCommands = function()
{
    this.commands = new Object;
    this.wrapper.innerHTML = '';
}