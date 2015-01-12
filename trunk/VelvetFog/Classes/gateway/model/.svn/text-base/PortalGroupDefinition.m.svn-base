//
//  PortalGroupDefinition.m
//  VelvetFog
//
//  Created by Jonathan Arme on 4/30/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "PortalGroupDefinition.h"

@implementation PortalGroupDefinition

@synthesize title = _title;
@synthesize items = _items;

- (id) init
{
    self = [super init];
    if (self)
    {
        self.items = [[NSMutableArray alloc] init];
    }
    return self;
}

- (void) dealloc
{
    [self.items release];
    
    [super dealloc];
}

- (NSDictionary *)getDictionary
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"title", nil]]];
    NSMutableArray *itemDictionaryArr = [NSMutableArray arrayWithCapacity:[self.items count]];
    for (EntityDisplayBrief *brief in self.items)
    {
        [itemDictionaryArr addObject:[brief getDictionary]];
    }
    [dict setValue:itemDictionaryArr forKey:@"items"];
    
    return dict;
}

- (NSString *)JSONString
{
    return [[self getDictionary] JSONString];
}


@end
