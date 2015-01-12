//
//  MovieDisplayBrief.m
//  VelvetFog
//
//  Created by Jonathan Arme on 5/1/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "MovieDisplayBrief.h"

@implementation MovieDisplayBrief

@synthesize title = _title;
@synthesize synopsis = _synopsis;
@synthesize genre = _genre;
@synthesize year = _year;
@synthesize runtime = _runtime;
@synthesize qualityRating = _qualityRating;
@synthesize icon = _icon;

-(NSDictionary *)getDictionary
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[super getDictionary]];
    [dict addEntriesFromDictionary:[self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"title", @"synopsis", @"genre", @"year", @"runtime", nil]]];
    
    if (self.icon)
    {
        [dict setValue:[self.icon getDictionary] forKey:@"icon"];
    }
    
    return dict;
}


@end
