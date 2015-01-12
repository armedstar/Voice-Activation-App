CelebCreditsPane.prototype = new UIComponent;
CelebCreditsPane.prototype.constructor = CelebCreditsPane;

CelebCreditsPane.ON_OVERVIEW_BUTTON_CLICK = "ON_OVERVIEW_BUTTON_CLICK";

function CelebCreditsPane(divElem)
{
    UIComponent.apply(this, arguments);
}

CelebCreditsPane.prototype.update = function(data)
{
    if (this.divElem)
    {
        var html = this.getNav() + this.getCelebDetails(data.actorName, data.actorImage);
        if (data.credits)
            html += this.getCreditsList(data.credits, data.recordProxy);
        this.divElem.innerHTML = html;
        
        document.getElementById('detailsNavOverviewButton').onclick = Relegate.create(this, this.onOverviewButtonClick, 'detailsNavOverviewButton');
    }
}

CelebCreditsPane.prototype.onOverviewButtonClick = function()
{
    this.dispatchEvent( new EventS(CelebCreditsPane.ON_OVERVIEW_BUTTON_CLICK) );
}

CelebCreditsPane.prototype.getNav = function()
{
    return '<div id="detailsNav"><img src="images/filmographyNav.png"><a id="detailsNavOverviewButton" class="detailsNavOverviewButton"></a></div>';
}

CelebCreditsPane.prototype.getCelebDetails = function(actorName, actorImage)
{
    return '<div id="details"><img class="celebImgSm" src="' + actorImage + '"><h2>Credits for ' + actorName + '</h2><div id="recordProgram" style="display:none;"><img src="images/recordIcon.png"></div></div>';
}

CelebCreditsPane.prototype.getCreditsList = function(credits, recordProxy)
{
    var html = '<table id="filmScroll">';
    for (var i = 0; i < credits.length; i++)
    {
        var credit = credits[i];
        html += '<tr><td colspan=2 style="padding:0"><img src="images/divider.png"></td></tr>';
        html += '<tr><td width="138px" id="programPlaceholder">';
        if (credit.mediaIconImage && credit.mediaIconImage.imageSource) 
        {
            html += '<img id="programIcon" src="' + credit.mediaIconImage.imageSource + '">';
        }
        html += '</td>';
        html += '<td style="padding-left:10px;"><h2>' + credit.mediaTitle + '<span class="ratings"><img src="images/ratings.png">'
        if (recordProxy.isEntityToBeRecorded(credit)) {
            html += '<img src="images/recordIcon.png">';
        }
        html += '</span></h2></td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
}