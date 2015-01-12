//
//  NMSPResponse.m
//  VelvetFog
//
//  Created by Jonathan Arme on 4/17/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "NMSPResponse.h"

@implementation NMSPResponse

@synthesize uid = _uid;
@synthesize intent = _intent;
@synthesize recognizedText = _recognizedText;
@synthesize genre = _genre;
@synthesize mediaType = _mediaType;
@synthesize isForSecondScreen = _isForSecondScreen;
@synthesize channel = _channel;
@synthesize stationCallLetters = _stationCallLetters;
@synthesize recognizedTitles = _recognizedTitles;
@synthesize recognizedActors = _recognizedActors;

- (id) init
{
    self = [super init];
    if (self)
    {
        self.uid = [NSString stringWithFormat:@"%d", (long)[[NSDate date] timeIntervalSince1970]];
        self.recognizedTitles = [[NSMutableArray alloc] init];
        self.recognizedActors = [[NSMutableArray alloc] init];
    }
    return self;
    
}

- (void) dealloc
{
    [self.recognizedTitles release];
    [self.recognizedActors release];
    
    [super dealloc];
}

- (NSDictionary *)getDictionary
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"uid",@"recognizedText", @"intent", @"genre", @"mediaType", @"isForSecondScreen", @"channel", @"stationCallLetters", nil]]];
    
    NSMutableArray *titleDictionaryArr = [[NSMutableArray alloc] init];
    for (NMSPCanonical *canonical in self.recognizedTitles)
    {
        [titleDictionaryArr addObject:[canonical getDictionary]];
    }
    
    [dict setValue:titleDictionaryArr forKey:@"recognizedTitles"];
    
    
    NSMutableArray *actorDictionaryArr = [[NSMutableArray alloc] init];
    for (NMSPCanonical *canonical in self.recognizedActors)
    {
        [actorDictionaryArr addObject:[canonical getDictionary]];
    }
    
    [dict setValue:actorDictionaryArr forKey:@"recognizedActors"];
    return dict;
}

- (NSString *)toJSObject
{
    NSString *ret = NULL;
    @try {
        ret = [[self getDictionary] JSONString];
    }
    @catch (NSException *exception) {
        NSLog(@"Error from toJSObject: %@, %@", exception.name, exception.reason);
    }
    @finally {
        return ret;
    }
}

@end
