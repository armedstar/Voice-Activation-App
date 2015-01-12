//
//  NMSPCanonical.m
//  VelvetFog
//
//  Created by Jonathan Arme on 5/7/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "NMSPCanonical.h"

@implementation NMSPCanonical

@synthesize uid = _uid;
@synthesize name = _name;
@synthesize characterName = _characterName;
@synthesize mediaType = _mediaType;

- (id) init
{
    self = [super init];
    if (self)
    {
        self.uid = @"";
    }
    return self;
}

- (NSDictionary *)getDictionary
{
    return [self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"uid", @"name", @"characterName", @"mediaType", nil]];
}

@end
