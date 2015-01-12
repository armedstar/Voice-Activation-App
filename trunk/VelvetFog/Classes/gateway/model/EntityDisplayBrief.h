//
//  EntityDisplayBrief.h
//  VelvetFog
//
//  Created by Jonathan Arme on 5/1/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/JSONKit.h>

@interface EntityDisplayBrief : NSObject

@property (nonatomic, copy) NSString *uid;

- (id) initWithID:(NSString *)uid;

- (NSString *)JSONString;

- (NSDictionary *)getDictionary;

@end
