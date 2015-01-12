
function ApplicationPreferences() {
    
}

ApplicationPreferences.prototype.get = function(key,success,fail)
{
    var args = {};
    args.key = key;
    PhoneGap.exec(success,fail,"ApplicationPreferences","getSetting",[args]);
};

PhoneGap.addConstructor(function() { 
                        if (!window.plugins) {
                            window.plugins = {};
                        }
                        window.plugins.ApplicationPreferences = new ApplicationPreferences();
                        });