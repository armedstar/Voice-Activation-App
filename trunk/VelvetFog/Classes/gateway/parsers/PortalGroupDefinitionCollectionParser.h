//
//  PortalGroupDefinitionCollectionParser.h
//  VelvetFog
//
//  Created by Jonathan Arme on 4/30/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
//#import <TouchXML_1.0.7/Common/Source/CXMLDocument.h>
//#import <TouchXML_1.0.7/Common/Source/CXMLElement.h>
//#import <TouchXML_1.0.7/Common/Source/CXMLNode_XPathExtensions.h>
#import "PortalGroupDefinition.h"
#import "MovieDisplayBrief.h"
#import "TVSeriesDisplayBrief.h"
#import "PhotoDisplayBrief.h"

@interface PortalGroupDefinitionCollectionParser : NSObject

+ (NSArray *) parseXMLData:(NSString *)xmlData;

//+ (MovieDisplayBrief *) parseMovieBriefXMLData:(CXMLElement *)movieBriefNode;
//+ (TVSeriesDisplayBrief *) parseTVSeriesBriefXMLData:(CXMLElement *)tvSeriesNode;

@end
