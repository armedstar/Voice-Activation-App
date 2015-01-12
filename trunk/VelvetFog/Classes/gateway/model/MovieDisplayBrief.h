//
//  MovieDisplayBrief.h
//  VelvetFog
//
//  Created by Jonathan Arme on 5/1/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "EntityDisplayBrief.h"
#import "PhotoDisplayBrief.h"

@interface MovieDisplayBrief : EntityDisplayBrief

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) NSString *synopsis;
@property (nonatomic, copy) NSString *genre;
@property (nonatomic, copy) NSString *year;
@property (nonatomic, copy) NSString *runtime;
@property (nonatomic) uint qualityRating;
@property (nonatomic, copy) PhotoDisplayBrief *icon;

@end
