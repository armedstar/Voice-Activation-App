//
//  NuanceVoiceRecognizer.m
//  VelvetFog
//
//  Created by Jonathan Arme on 4/13/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "NuanceVoiceRecognizer.h"

@implementation NuanceVoiceRecognizer

- (id) initWithWebView:(UIWebView *)theWebView
{
    if ((self = (NuanceVoiceRecognizer *)[super initWithWebView:theWebView]))
    {
        //TODO init code
        nmasAsr = [[nmsp_nmas_asr alloc] initWithDelegate:self];
        _state = STATE_START;
    }
    return self;
}

- (void) startRecording:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    [nmasAsr startRecording];
    _state = STATE_RECORDING;
    
}

- (void) stopRecordingAndSend:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    [nmasAsr stopRecording];
    _state = STATE_WAITING_FOR_RESULT;
    
}

- (void) handleResponse:(NMSPResponse *)response
{
    _state = STATE_START;
    
    NSString* jsString = [NSString stringWithFormat:@"NuanceVoiceRecognizer.__onIntent(%@);", [response toJSObject]];
    [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
    
}

- (void) handleError:(NSString *)errMessage
{
    NSString* jsString = [NSString stringWithFormat:@"NuanceVoiceRecognizer.__onError(\"%@\");", errMessage];
    [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
}

- (void) handleReadyForAudio
{
    NSString* jsString = @"NuanceVoiceRecognizer.__onReadyForAudio();";
    [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
    
}


@end
