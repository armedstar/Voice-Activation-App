//
//  GatewayService.h
//  VelvetFog
//
//  Created by Jonathan Arme on 4/30/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "PortalGroupDefinitionCollectionParser.h"

@interface GatewayService : CDVPlugin

-(void) getOnDemandContent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) getFavoritesContent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) getCelebrityDetails:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) getCelebrityCredits:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) getMovieDetails:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) getTVSeriesDetails:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(NSString *) getCelebrityIdFromName:(NSString*)entityName;

@end
