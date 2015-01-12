//
//  nmsp_nmas_whether.h
//  NmasAsrSample
//
//  Created by administrator on 11-04-27.
//  Copyright 2011 Nuance. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <nmsp_oem/nmsp_parameter.h>
#import <nmsp_resource_common/nmsp_resource_common.h>
#import <nmsp_resource_common/nmsp_resource_util.h>
#import <nmsp_resource_nmas/nmsp_resource_nmas.h>
#import <nmsp_audiorecord/nmsp_audiorecord.h>
#import "NMSPDelegate.h"
#import "NMSPResponse.h"


@interface nmsp_nmas_asr : NSObject {
    nmsp_Manager* manager;
    nmsp_NmasResource* nmas_resource;
    nmsp_nmas_Command* nmas_command;
    nmsp_nmas_Parameter* audio_parameter;
    nmsp_nmas_Parameter* nmas_requestInfo_parameter;
    nmsp_audio_Recorder* recorder; 
    
    UIViewController* _controller;
    id _delegate;
}

@property nmsp_nmas_Command *nmas_command;
@property (nonatomic, assign) id delegate;

- (id) initWithDelegate:(id)delegate;
- (void) dealloc;
- (void) startRecording;
- (void) stopRecording;
- (void) showMessage:(NSString *)formatString, ...;
//- (void) handleResult:(NSString *)result;

@end

