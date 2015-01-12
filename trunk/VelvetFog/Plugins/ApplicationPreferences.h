//
//  ApplicationPreferences.h
//  VelvetFog
//
//  Created by Jonathan Arme on 4/25/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface ApplicationPreferences : CDVPlugin

- (void)getSetting:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options;
- (NSString*) getSettingFromBundle:(NSString*)settingName;

@end
