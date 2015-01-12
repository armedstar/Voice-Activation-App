//
//  ApplicationPreferences.m
//  VelvetFog
//
//  Created by Jonathan Arme on 4/25/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "ApplicationPreferences.h"

@implementation ApplicationPreferences

- (void)getSetting:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString* callbackID = [arguments pop];
	NSString* jsString;
    
    
    NSString *settingsName = [options objectForKey:@"key"];
    CDVPluginResult* result = nil;
    
    @try 
    {
        //At the moment we only return strings
        //bool: true = 1, false=0
        NSString *returnVar = [[NSUserDefaults standardUserDefaults] stringForKey:settingsName];
        if(returnVar == nil)
        {
            returnVar = [self getSettingFromBundle:settingsName]; //Parsing Root.plist
            if ([returnVar isKindOfClass:[NSNumber class]])
                returnVar = [NSString stringWithFormat:@"%i", [(NSNumber *)returnVar intValue]];
            
            if (returnVar == nil) 
                @throw [NSException exceptionWithName:nil reason:@"Key not found" userInfo:nil];;
        }
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[returnVar stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
        jsString = [result toSuccessCallbackString:callbackID];		
    }
    @catch (NSException * e) 
    {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[e reason]];
        jsString = [result toErrorCallbackString:callbackID];
    }
    @finally 
    {
        [self writeJavascript:jsString]; //Write back to JS
    }
}

- (id)getSettingFromBundle:(NSString*)settingsName
{
	NSString *pathStr = [[NSBundle mainBundle] bundlePath];
	NSString *settingsBundlePath = [pathStr stringByAppendingPathComponent:@"Settings.bundle"];
	NSString *finalPath = [settingsBundlePath stringByAppendingPathComponent:@"Root.plist"];
    
	NSDictionary *settingsDict = [NSDictionary dictionaryWithContentsOfFile:finalPath];
	NSArray *prefSpecifierArray = [settingsDict objectForKey:@"PreferenceSpecifiers"];
	NSDictionary *prefItem;
	for (prefItem in prefSpecifierArray)
	{
		if ([[prefItem objectForKey:@"Key"] isEqualToString:settingsName]) 
			return [prefItem objectForKey:@"DefaultValue"];		
	}
	return nil;
    
}

@end
