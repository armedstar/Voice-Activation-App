//
//  NMSPResponse.h
//  VelvetFog
//
//  Created by Jonathan Arme on 4/17/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Cordova/JSONKit.h>
#import <Foundation/Foundation.h>
#import <Foundation/NSKeyValueCoding.h>
#import "NMSPCanonical.h"

@interface NMSPResponse : NSObject 

@property (nonatomic, copy) NSString *uid;
@property (nonatomic, copy) NSString *intent;
@property (nonatomic, copy) NSString *recognizedText;
@property (nonatomic) BOOL isForSecondScreen;
@property (nonatomic, copy) NSString *genre;
@property (nonatomic, copy) NSString *mediaType;
@property (nonatomic, copy) NSString *channel;
@property (nonatomic, copy) NSString *stationCallLetters;
@property (nonatomic, copy) NSMutableArray *recognizedTitles;
@property (nonatomic, copy) NSMutableArray *recognizedActors;

- (NSDictionary *)getDictionary;
- (NSString *) toJSObject;

@end
