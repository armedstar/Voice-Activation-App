
function NuanceVoiceRecognizer()
{
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    
    this.onintent = null;
    this.onreadyforaudio = null;
    this.onerror = null;
}

NuanceVoiceRecognizer.prototype.startRecording = function()
{
    PhoneGap.exec("NuanceVoiceRecognizer.startRecording");
}

NuanceVoiceRecognizer.prototype.stopRecording = function()
{
    PhoneGap.exec("NuanceVoiceRecognizer.stopRecordingAndSend");
}

//static methods to be called from native side.
NuanceVoiceRecognizer.__onIntent = function(intent)
{
    var nvr = NuanceVoiceRecognizer();
    nvr.onintent(intent);
}

NuanceVoiceRecognizer.__onReadyForAudio = function()
{
    var nvr = NuanceVoiceRecognizer();
    nvr.onreadyforaudio();
}

NuanceVoiceRecognizer.__onError = function(error)
{
    var nvr = NuanceVoiceRecognizer();
    nvr.onerror(error);
}

PhoneGap.addConstructor(function() {
                        if (!window.plugins) window.plugins = {};
                        window.plugins.nuanceVoiceRecognizer = NuanceVoiceRecognizer;
                        console.log('Setup NuanceVoiceRecognizer');
                        });