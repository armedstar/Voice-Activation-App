//
//  WebSocket.h
//  TestPhoneGapWebSockets
//
//  Created by Jonathan Arme on 4/5/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "AsyncSocket.h"

@interface WebSocket : CDVPlugin {
    NSMutableArray *connectedSockets;
}

-(void) connect:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) close:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) send:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
