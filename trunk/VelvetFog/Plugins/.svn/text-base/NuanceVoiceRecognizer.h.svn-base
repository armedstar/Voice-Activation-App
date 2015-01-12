//
//  NuanceVoiceRecognizer.h
//  VelvetFog
//
//  Created by Jonathan Arme on 4/13/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "nmsp_nmas_asr.h"
#import "NMSPResponse.h"

@interface NuanceVoiceRecognizer : CDVPlugin {
    nmsp_nmas_asr *nmasAsr;
    
    enum {STATE_START, STATE_RECORDING, STATE_WAITING_FOR_RESULT} _state;
}

- (void) startRecording:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (void) stopRecordingAndSend:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;

@end
