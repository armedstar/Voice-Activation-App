FavoritesPane.prototype = new UIComponent;
FavoritesPane.prototype.constructor = FavoritesPane;

function FavoritesPane(divElem)
{
    UIComponent.apply(this, arguments);
}

FavoritesPane.prototype.update = function(dataObj)
{
    if (this.divElem)
    {
        var html = "<h2>Favorites</h2>";
        html += this.getContent(dataObj);
        this.divElem.innerHTML = html;
    }
}

FavoritesPane.prototype.getContent = function(dataObj)
{
    var html = '<table id="favoritesContentTable">';
    
    
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