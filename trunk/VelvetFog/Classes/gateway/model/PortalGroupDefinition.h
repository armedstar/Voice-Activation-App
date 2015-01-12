//
//  PortalGroupDefinition.h
//  VelvetFog
//
//  Created by Jonathan Arme on 4/30/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Foundation/NSKeyValueCoding.h>
#import "EntityDisplayBrief.h"

@interface PortalGroupDefinition : NSObject

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSMutableArray *items;

- (NSString *)JSONString;

- (NSDictionary *)getDictionary;

@end
