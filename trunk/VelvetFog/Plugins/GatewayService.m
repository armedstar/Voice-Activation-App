//
//  GatewayService.m
//  VelvetFog
//
//  Created by Jonathan Arme on 4/30/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

//#import "GatewayService.h"
#import <Cordova/JSONKit.h>
//#import <TGGatewayLib/Classes/Services/Gateway/TGGatewayService.h>
//#import <TGGatewayLib/Classes/Model/Gateway/Celebrity/TGCelebrity.h>
//#import <TGGatewayLib/Classes/Model/Gateway/Movie/TGMovie.h>
//#import <TGGatewayLib/Classes/Model/Gateway/TV/TGTVSeries.h>
//#import <TGGatewayLib/Classes/Model/Gateway/Credit/Celebrity/TGCelebrityCredits.h>
//#import <TGGatewayLib/Classes/Model/Gateway/Credit/Celebrity/TGCelebrityCredit.h>
//#import <TGGatewayLib/Classes/Model/Gateway/Credit/Celebrity/Movie/TGMovieCelebrityCredit.h>


@implementation GatewayService


/*-(NSString *)getCelebrityIdFromName:(NSString *)entityName
{
    NSString *entityId = nil;
    NSString *errorDesc = nil;
    NSPropertyListFormat format;
    
    @try {
        NSString *portalFilePath = [[NSBundle mainBundle] pathForResource:@"celebrityIDs" ofType:@"plist"];
        NSData *plistXML = [[NSFileManager defaultManager] contentsAtPath:portalFilePath];
        NSDictionary *celebIds = (NSDictionary *)[NSPropertyListSerialization
                                              propertyListFromData:plistXML
                                              mutabilityOption:NSPropertyListMutableContainersAndLeaves
                                              format:&format
                                              errorDescription:&errorDesc];
        if (celebIds && entityName)
        {
            entityId = (NSString *)[celebIds objectForKey:entityName];
        }
    }
    @catch (NSException *exception) {
        NSLog(@"Unable to get entity ID for name: %@, %@", entityName, [exception reason]);
    }
    @finally {
        return entityId;
    }

}

-(void)getFavoritesContent:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *callbackID = [arguments pop];
    NSString *jsString;
    
    CDVPluginResult *result = nil;
    
    @try {
        NSString *portalFilePath = [[NSBundle mainBundle] pathForResource:@"favorites-en_US" ofType:@"xml"];
        NSString *favoritesContent = [NSString stringWithContentsOfFile:portalFilePath encoding:NSUTF8StringEncoding error:nil];
        if (favoritesContent)
        {
            NSArray *favArr = [PortalGroupDefinitionCollectionParser parseXMLData:favoritesContent];
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:favArr];
            jsString = [result toSuccessCallbackString:callbackID];
        }
    }
    @catch (NSException *exception) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[exception reason]];
        jsString = [result toErrorCallbackString:callbackID];
    }
    @finally {
        [self writeJavascript:jsString];
    }
}

-(void)getOnDemandContent:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    //loading from local XML.
    
    NSString* callbackID = [arguments pop];
    NSString* jsString;
    
    CDVPluginResult* result = nil;
    
    @try {
        NSString *portalFilePath = [[NSBundle mainBundle] pathForResource:@"vodContent-en_US" ofType:@"xml"]; 
        NSString *vodContent = [NSString stringWithContentsOfFile:portalFilePath encoding:NSUTF8StringEncoding error:nil];  
        if (vodContent) {  
            NSArray * test = [PortalGroupDefinitionCollectionParser parseXMLData:vodContent];
            
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:test];
            jsString = [result toSuccessCallbackString:callbackID];	
        }  
    }
    @catch (NSException *e) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[e reason]];
        jsString = [result toErrorCallbackString:callbackID];
    }
    @finally {
        [self writeJavascript:jsString];

    }
}

-(void) getCelebrityHandler:(NSNotification *)notification
{
    TGCelebrity *celebrity = (TGCelebrity *)notification;
    NSString *jsString;
    
    if (celebrity)
    {
        NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
        [formatter setDateFormat:@"MMMM d, yyyy"];
        
        NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[celebrity dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"entityId", @"name", @"shortBiography", nil]]];
        if (celebrity.dateOfBirth)
        {
            [dict setValue:[formatter stringFromDate:celebrity.dateOfBirth] forKey:@"dateOfBirth"];
        }
        
        if (celebrity.dateOfDeath)
        {
            [dict setValue:[formatter stringFromDate:celebrity.dateOfDeath] forKey:@"dateOfDeath"];
        }
        
        if (celebrity.primaryImage)
        {
            [dict setValue:[celebrity.primaryImage dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"imageSource", nil]] forKey:@"primaryImage"];
        }
        
        jsString = [NSString stringWithFormat:@"GatewayService.__getCelebrityDetailsCallback(%@);", [dict JSONString]];
        [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
    }

}

-(void) getCelebrityCreditsHandler:(NSNotification *)notification
{
    TGCelebrityCredits *credits = (TGCelebrityCredits *)notification;
    NSMutableArray *retCredits = [[NSMutableArray alloc] init];
    NSString *jsString;
    
    if (credits && credits.actorCreditList)
    {
        //Only grabbing acting credits at the moment (no director, creator, crew credits)
        
        for (TGCelebrityCredit *actorCredit in credits.actorCreditList)
        {
            NSMutableDictionary *creditDict = [[NSMutableDictionary alloc] init];
            [creditDict setValue:actorCredit.mediaEntityId forKey:@"entityId"];
            [creditDict setValue:actorCredit.mediaTitle forKey:@"mediaTitle"];
            
            TGPhoto *creditImage = actorCredit.mediaIconImage;
            if (creditImage)
            {
                [creditDict setValue:[creditImage dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"imageSource", nil]] forKey:@"mediaIconImage"];
            }
            
            [retCredits addObject:creditDict];
            [creditDict release];
        }
    }
    
    jsString = [NSString stringWithFormat:@"GatewayService.__getCelebrityCreditsCallback(%@);", [retCredits JSONString]];
    [retCredits release];
    [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
}

-(void) getMovieHandler:(NSNotification *)notification
{
    TGMovie *movie = (TGMovie *)notification;
    NSString *jsString;
    
    if (movie)
    {
        NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[movie dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"entityId", @"title", @"synopsis", nil]]];
        
        if (movie.primaryImage)
        {
            [dict setValue:[movie.primaryImage dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"imageSource", nil]] forKey:@"primaryImage"];
        }
        
        jsString = [NSString stringWithFormat:@"GatewayService.__getMovieDetailsCallback(%@);", [dict JSONString]];
        [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
    }
}

-(void) getTVSeriesHandler:(NSNotification *)notification
{
    TGTVSeries *tvSeries = (TGTVSeries *)notification;
    NSString *jsString;
    
    if (tvSeries)
    {
        NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[tvSeries dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"entityId", @"title", @"synopsis", nil]]];
        
        if (tvSeries.primaryImage)
        {
            [dict setValue:[tvSeries.primaryImage dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"imageSource", nil]] forKey:@"primaryImage"];
        }
        
        jsString = [NSString stringWithFormat:@"GatewayService.__getTVSeriesDetailsCallback(%@);", [dict JSONString]];
        [self.webView performSelectorOnMainThread:@selector(stringByEvaluatingJavaScriptFromString:) withObject:jsString waitUntilDone:NO];
    }
}

-(void) getCelebrityDetails:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    
    NSString *callbackID = [arguments pop];
    NSString *jsString;
    NSString *entityId = [options valueForKey:@"entityId"];
    NSString *entityName = [options valueForKey:@"entityName"];
    
    CDVPluginResult *result = nil;
    
    @try {
        if ((entityId == nil) || ([entityId length] <= 0))
        {
            entityId = [self getCelebrityIdFromName:entityName];
        }
        
        [[TGGatewayService instance] getCelebrity:entityId entityOwner:@"cosmo" callbackTarget:self callbackSelector:@selector(getCelebrityHandler:)];
    }
    @catch (NSException *exception) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[exception reason]];
        jsString = [result toErrorCallbackString:callbackID];
        [self writeJavascript:jsString];
    }
}

-(void) getCelebrityCredits:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *callbackID = [arguments pop];
    NSString *jsString;
    NSString *entityId = [options valueForKey:@"entityId"];
    NSString *entityName = [options valueForKey:@"entityName"];
    
    CDVPluginResult *result = nil;
    
    @try {
        if ((entityId == nil) || ([entityId length] <= 0))
        {
            entityId = [self getCelebrityIdFromName:entityName];
        }
        [[TGGatewayService instance] getCelebrityCredits:entityId entityOwner:@"cosmo" callbackTarget:self callbackSelector:@selector(getCelebrityCreditsHandler:)];
    }
    @catch (NSException *exception) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[exception reason]];
        jsString = [result toErrorCallbackString:callbackID];
        [self writeJavascript:jsString];
    }
}

-(void) getMovieDetails:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *callbackID = [arguments pop];
    NSString *jsString;
    NSString *entityId = [options valueForKey:@"entityId"];
    
    CDVPluginResult *result = nil;
    
    @try 
    {
        [[TGGatewayService instance] getMovie:entityId entityOwner:@"cosmo" callbackTarget:self callbackSelector:@selector(getMovieHandler:)];
    }
    @catch (NSException *exception) 
    {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[exception reason]];
        jsString = [result toErrorCallbackString:callbackID];
        [self writeJavascript:jsString];
    }
}

-(void) getTVSeriesDetails:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSString *callbackID = [arguments pop];
    NSString *jsString;
    NSString *entityId = [options valueForKey:@"entityId"];
    
    CDVPluginResult *result = nil;
    
    @try 
    {
        [[TGGatewayService instance] getTVSeries:entityId entityOwner:@"cosmo" callbackTarget:self callbackSelector:@selector(getTVSeriesHandler:)];
    }
    @catch (NSException *exception) 
    {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_NO_RESULT messageAsString:[exception reason]];
        jsString = [result toErrorCallbackString:callbackID];
        [self writeJavascript:jsString];
    }
}*/

@end
