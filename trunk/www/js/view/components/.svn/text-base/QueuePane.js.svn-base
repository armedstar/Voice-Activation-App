QueuePane.prototype = new UIComponent;
QueuePane.prototype.constructor = QueuePane;

function QueuePane(divElem)
{
    UIComponent.apply(this, arguments);
}

QueuePane.prototype.update = function(entityArray, recordProxy)
{
    if (this.divElem)
    {
        var html = "<h2>My Queue</h2>";
        html += this.getContent(entityArray, recordProxy);
        this.divElem.innerHTML = html;
    }
}

QueuePane.prototype.getContent = function(entityArray, recordProxy)
{
    var html = '<table>';
    
    for (var i = 0; i < entityArray.length; i++)
    {
        var brief = entityArray[i];
        
        html += '<tr><td colspan=3 id="queueDivider"></td></tr>';
        html += '<tr id="row' + i + '"><td width="150px" id="programPlaceholder">';
        
        if (brief.iconImage)
        {
            html += '<img id="programIcon" src="' + brief.iconImage + '">';
        }
        html += '</td>';
        html += '<td width="470px" style="padding-left:10px;"><h2>' + brief.entityName + '<span class="ratings"><img src="images/ratings.png">'
        if (recordProxy.isEntityToBeRecorded(brief)) {
            html += '<img src="images/recordIcon.png">';
        }
        html += '</span></h2>';
        if (brief.entitySynopsis)
        {
            html += '<p>' + brief.entitySynopsis + '</p>';
        }
        html += '</td>';
        html += '<td><h2>Tonight<br>8:00pm</h2></td>'
        
        html += '</tr>'; //end row<i>
    }
    
    html += '</table>';
    
    return html;
}