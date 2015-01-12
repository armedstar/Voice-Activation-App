//
//  EntityDisplayBrief.m
//  VelvetFog
//
//  Created by Jonathan Arme on 5/1/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "EntityDisplayBrief.h"

@implementation EntityDisplayBrief

@synthesize uid = _uid;

-(id) initWithID:(NSString *)uid
{
    self = [super init];
    if (self)
    {
        self.uid = uid;
    }
    return self;
}

- (NSString *)JSONString
{
    return [[self getDictionary] JSONString]; 
}

-(NSDictionary *)getDictionary
{
    return [self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"uid", nil]];
}

@end
