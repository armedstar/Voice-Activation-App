//
//  PortalGroupDefinitionCollectionParser.m
//  VelvetFog
//
//  Created by Jonathan Arme on 4/30/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "PortalGroupDefinitionCollectionParser.h"

@implementation PortalGroupDefinitionCollectionParser
/* 
+ (NSArray *)parseXMLData:(NSString *)xmlData
{
    NSMutableArray * retArr = [[NSMutableArray alloc] init];
    
   CXMLDocument *doc = [[CXMLDocument alloc] initWithXMLString:xmlData options:0 error:nil];
    NSArray *groupDefNodes = [doc nodesForXPath:@"//groupDef" error:nil];
    if ([groupDefNodes count] > 0)
    {
        //Just grabbing the first group of content
        CXMLElement *groupDefNode = [groupDefNodes objectAtIndex:0];
        
        PortalGroupDefinition * groupDef = [[[PortalGroupDefinition alloc] init] autorelease];
        groupDef.title = [[groupDefNode attributeForName:@"title"] stringValue];
        
        NSArray *briefNodes = [groupDefNode children];
        NSMutableArray *groupItems = [[NSMutableArray alloc] initWithCapacity:[briefNodes count]];
        for (CXMLElement *briefNode in briefNodes)
        {
            if ([briefNode.name isEqualToString:@"movieBrief"])
            {
                MovieDisplayBrief *movieBrief = [PortalGroupDefinitionCollectionParser parseMovieBriefXMLData:briefNode];
                [groupItems addObject:movieBrief];
                [movieBrief release];
            }
            else if ([briefNode.name isEqualToString:@"tvSeriesBrief"])
            {
                TVSeriesDisplayBrief *tvSeriesBrief = [PortalGroupDefinitionCollectionParser parseTVSeriesBriefXMLData:briefNode];
                [groupItems addObject:tvSeriesBrief];
                [tvSeriesBrief release];
            }
        }
        groupDef.items = groupItems;
        [groupItems release];
        
        [retArr addObject:[groupDef JSONString]];
    }
    
    return retArr;
}

+ (MovieDisplayBrief *) parseMovieBriefXMLData:(CXMLElement *)movieBriefNode
{
    
    if (movieBriefNode)
    {
        NSString *uid = [[movieBriefNode attributeForName:@"id"] stringValue];
        MovieDisplayBrief * ret = [[MovieDisplayBrief alloc] initWithID:uid];
        ret.title = [[movieBriefNode attributeForName:@"title"] stringValue];
        
        NSString *imageSource = [[movieBriefNode attributeForName:@"imageSource"] stringValue];
        if (imageSource)
        {
            PhotoDisplayBrief *photoBrief = [[PhotoDisplayBrief alloc] init];
            photoBrief.imageSource = imageSource;
            ret.icon = photoBrief;
            [photoBrief release];
        }
        
        NSArray *synopsisNodes = [movieBriefNode nodesForXPath:@"synopsis" error:nil];
        if ([synopsisNodes count] > 0)
        {
            ret.synopsis = [[synopsisNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *genreNodes = [movieBriefNode nodesForXPath:@"genre" error:nil];
        if ([genreNodes count] > 0)
        {
            ret.genre = [[genreNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *runtimeNodes = [movieBriefNode nodesForXPath:@"runtime" error:nil];
        if ([runtimeNodes count] > 0)
        {
            ret.runtime = [[runtimeNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *releaseYearNodes = [movieBriefNode nodesForXPath:@"releaseYear" error:nil];
        if ([releaseYearNodes count] > 0)
        {
            ret.year = [[releaseYearNodes objectAtIndex:0] stringValue];
        }
        
        return ret;
    }
    else {
        return nil;
    }
    
}

+ (TVSeriesDisplayBrief *) parseTVSeriesBriefXMLData:(CXMLElement *)tvSeriesNode
{
    if (tvSeriesNode)
    {
        NSString *uid = [[tvSeriesNode attributeForName:@"id"] stringValue];
        TVSeriesDisplayBrief *ret = [[TVSeriesDisplayBrief alloc] initWithID:uid];
        ret.title = [[tvSeriesNode attributeForName:@"title"] stringValue];
        
        NSString *imageSource = [[tvSeriesNode attributeForName:@"imageSource"] stringValue];
        if (imageSource)
        {
            PhotoDisplayBrief *photoBrief = [[PhotoDisplayBrief alloc] init];
            photoBrief.imageSource = imageSource;
            ret.icon = photoBrief;
            [photoBrief release];
        }
        
        NSArray *synopsisNodes = [tvSeriesNode nodesForXPath:@"synopsis" error:nil];
        if ([synopsisNodes count] > 0)
        {
            ret.synopsis = [[synopsisNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *genreNodes = [tvSeriesNode nodesForXPath:@"genre" error:nil];
        if ([genreNodes count] > 0)
        {
            ret.genre = [[genreNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *runtimeNodes = [tvSeriesNode nodesForXPath:@"runtime" error:nil];
        if ([runtimeNodes count] > 0)
        {
            ret.runtime = [[runtimeNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *startYearNodes = [tvSeriesNode nodesForXPath:@"startYear" error:nil];
        if ([startYearNodes count] > 0)
        {
            ret.startYear = [[startYearNodes objectAtIndex:0] stringValue];
        }
        
        NSArray *endYearNodes = [tvSeriesNode nodesForXPath:@"endYear" error:nil];
        if ([endYearNodes count] > 0)
        {
            ret.endYear = [[endYearNodes objectAtIndex:0] stringValue];
        }
        
        return ret;
    }
    else {
        return nil;
    }
}*/

@end
