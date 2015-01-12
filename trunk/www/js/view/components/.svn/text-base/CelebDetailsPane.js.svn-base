CelebDetailsPane.prototype = new UIComponent;
CelebDetailsPane.prototype.constructor = CelebDetailsPane;

CelebDetailsPane.ON_CREDITS_BUTTON_CLICK = "ON_CREDITS_BUTTON_CLICK";

function CelebDetailsPane(divElem)
{
    UIComponent.apply(this, arguments);
}

CelebDetailsPane.prototype.update = function(entity)
{
    if (this.divElem)
    {
        var html = this.getNav();
        html += this.getEntityHtml(entity);
        this.divElem.innerHTML = html;
        
        document.getElementById('detailsNavCreditsButton').onclick = Relegate.create(this, this.onCreditsButtonClick, 'detailsNavCreditsButton');
    }
}

CelebDetailsPane.prototype.getNav = function()
{
    return '<div id="detailsNav"><img src="images/celebNav.png"><a id="detailsNavCreditsButton" class="detailsNavCreditsButton"></a></div>';
}

CelebDetailsPane.prototype.onCreditsButtonClick = function()
{
    this.dispatchEvent( new EventS(CelebDetailsPane.ON_CREDITS_BUTTON_CLICK) );
}

CelebDetailsPane.prototype.getEntityHtml = function(entity)
{
    var ret = '<div id="castContainer"><div><div id="featurePhoto">';
    
    if (entity.name.toLowerCase() == 'andrew lincoln')
    {
        //hacking imagery for "Rick Grimes" Walking dead
        ret += '<img src="images/castMainImg.png">';
    }
    else if (entity.primaryImage && entity.primaryImage.imageSource) {
        ret += '<img src="' + entity.primaryImage.imageSource + '">';
    }
    
    ret += '</div><div id="details"><h2>' + entity.name + '</h2>';
    
    
    if (entity.dateOfBirth)
    {
        ret += '<p class="info">Born: ' + entity.dateOfBirth + '</p>';
    }
    
    if (entity.dateOfDeath)
    {
        ret += '<p class="info">Died: ' + entity.dateOfDeath + '</p>';
    }
    
    ret += '</div>';  //details
    
    if (entity.shortBiography)
    {
        ret += '<p id="bio">' + entity.shortBiography + '</p>'
    }
    
    ret += '</div></div>'; // end
    
    return ret;
}