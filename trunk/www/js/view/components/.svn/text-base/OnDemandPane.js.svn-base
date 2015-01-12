OnDemandPane.prototype = new UIComponent;
OnDemandPane.prototype.constructor = OnDemandPane;

function OnDemandPane(divElem)
{
    UIComponent.apply(this, arguments);
}

OnDemandPane.prototype.update = function(dataObj)
{
    if (this.divElem)
    {
        var html = "<h2>OnDemand";
        if (dataObj.title)
        {
            html += " > " + this.capitalize(dataObj.title);
        }
        html += "</h2>";
        html += this.getContent(dataObj);
        
        this.divElem.innerHTML = html;
    }
}

OnDemandPane.prototype.getContent = function(dataObj)
{
    var html = '<table id="onDemandContentTable">';
    
    
    for (var i = 0; i < dataObj.items.length; i++)
    {
        var brief = dataObj.items[i];
        if ((i % 6) == 0)
        {
            html += '<tr>';
        }
        
        html += '<td id="programPlaceholder">';
        if (brief.icon.imageSource)
        {
            html += '<img id="programIcon" src="' + brief.icon.imageSource + '">';
        }
          
        html += '</td>';
        
        if (((i + 1) % 6) == 0)
        {
            html += '</tr>';
        }
        
    }
    
    html += '</table>';
    
    return html;
}

OnDemandPane.prototype.capitalize = function(s)
{
    if (s)
    {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}