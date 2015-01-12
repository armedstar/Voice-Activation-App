//
//  TVSeriesDisplayBrief.m
//  VelvetFog
//
//  Created by Jonathan Arme on 5/3/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "TVSeriesDisplayBrief.h"

@implementation TVSeriesDisplayBrief

@synthesize title = _title;
@synthesize synopsis = _synopsis;
@synthesize genre = _genre;
@synthesize startYear = _startYear;
@synthesize endYear = _endYear;
@synthesize runtime = _runtime;
@synthesize icon = _icon;

-(NSDictionary *)getDictionary
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[super getDictionary]];
    [dict addEntriesFromDictionary:[self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"title", @"synopsis", @"genre", @"startYear", @"endYear", @"runtime", nil]]];
    
    if (self.icon)
    {
        [dict setValue:[self.icon getDictionary] forKey:@"icon"];
    }
    
    return dict;
}

@end
