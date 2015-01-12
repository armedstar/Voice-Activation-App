//
//  WebSocket.m
//  TestPhoneGapWebSockets
//
//  Created by Jonathan Arme on 4/5/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "WebSocket.h"

NSString* const WebSocketErrorDomain = @"WebSocketErrorDomain";
NSString* const WebSocketException = @"WebSocketException";

enum {
    WebSocketTagHandshake = 0,
    WebSocketTagMessage = 1
};

@implementation WebSocket

-(id) initWithWebView:(UIWebView *)theWebView
{
    if ((self = (WebSocket *)[super initWithWebView:theWebView]))
    {
        connectedSockets = [[NSMutableArray alloc] initWithCapacity:1];
    }
    return self;
}

-(void) connect:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSUInteger argc = [arguments count];
    if (argc > 1)
    {
        NSString *urlString = [arguments objectAtIndex:0];
        NSString *userData = [arguments objectAtIndex:1];
        
        NSURL *url = [NSURL URLWithString:urlString];
        if (![url.scheme isEqualToString:@"ws"]) {
            [NSException raise:@"WebSocketException" format:[NSString stringWithFormat:@"Unsupported protocol %@", url.scheme]];
        }
        
        AsyncSocket *socket = [[AsyncSocket alloc] initWithDelegate:self userData:[userData longLongValue]];
        NSError *err;
        BOOL succ = [socket connectToHost:url.host onPort:[url.port intValue] withTimeout:5 error:&err];
        
        if (succ)
        {
        }
        else 
        {
            NSString *jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onError(\"%@\");", [err localizedDescription]];
            [self.webView stringByEvaluatingJavaScriptFromString: jsString];
        }
    }
    else {
        return;
    }
}

- (void) close:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSUInteger argc = [arguments count];
    if(argc > 0)
	{
		NSString* userData = [arguments objectAtIndex:0];
		int socketCount = [connectedSockets count];
		for(int x = 0; x < socketCount; x++)
		{
			AsyncSocket* sock = (AsyncSocket*)[connectedSockets objectAtIndex:x];
			if([sock userData] == [userData longLongValue])
			{
				[sock disconnectAfterReadingAndWriting];
				break;
			}
		}
	}
}

- (void) send:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options
{
    NSUInteger argc = [arguments count];
	
	if(argc > 0)
	{
		NSString* userData = [arguments objectAtIndex:0];
		
		if(argc > 1)
		{
			NSString* message = [arguments objectAtIndex:1];
			BOOL foundSocket = NO;
			int socketCount = [connectedSockets count];
			for(int x = 0; x < socketCount; x++)
			{
				AsyncSocket* sock = (AsyncSocket*)[connectedSockets objectAtIndex:x];
				if([sock userData] == [userData longLongValue])
				{
                    NSMutableData* data = [NSMutableData data];
                    [data appendBytes:"\x00" length:1];
                    [data appendData:[message dataUsingEncoding:NSUTF8StringEncoding]];
                    [data appendBytes:"\xFF" length:1];
                    [sock writeData:data withTimeout:-1 tag:WebSocketTagMessage];
					foundSocket = YES;
					break;
				}
			}
		}
		else 
		{
			NSString* err = [NSString stringWithFormat:@"Error: Call to WebSocketCommand::send with missing message"];
			NSLog(@"%@",err);
			NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onError(\"%d\",\"%@\");",userData,err ];
			[self.webView stringByEvaluatingJavaScriptFromString:jsString];
		}
	}
	else {
		NSLog(@"Call to WebSocketCommand::send with NO arguments!");
	}
}


#pragma mark AsyncSocket delegate methods

- (void)onSocket:(AsyncSocket *)sock willDisconnectWithError:(NSError *)err
{
    NSLog(@"Disconnecting due to socket error");
	NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onError(\"%d\",\"%@\");"
						  ,[sock userData]
						  ,[err localizedDescription] ];
	[self.webView stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)onSocketDidDisconnect:(AsyncSocket *)sock
{
	[connectedSockets removeObject:sock];
	NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onClosed(\"%d\");",[sock userData] ];
	[self.webView stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)onSocket:(AsyncSocket *)sock didAcceptNewSocket:(AsyncSocket *)newSocket
{
	[connectedSockets addObject:newSocket];
}

int randFromRange(int min, int max)
{
    return (arc4random() % max) + min;
}

- (NSData*) createRandomBytes
{
    NSMutableData* result = [NSMutableData data];
    for (int i = 0; i < 8; i++) 
    {
        unichar byte = randFromRange(48,122);
        [result appendBytes:&byte length:1];
    }
    return result;
}

- (void)onSocket:(AsyncSocket *)sock didConnectToHost:(NSString *)host port:(UInt16)port
{
    
    NSString *requestPath = @"/"; // FIXME total hack
    // if (url.query) {
    //   requestPath = [requestPath stringByAppendingFormat:@"?%@", url.query];
    // }
    
    NSMutableData *handshake = [NSMutableData data];
    
    NSString* getRequest = [NSString stringWithFormat:@"GET %@ HTTP/1.1\r\n"
                            "Upgrade: WebSocket\r\n"
                            "Sec-WebSocket-Key1: %@\r\n"
                            "Connection: Upgrade\r\n"
                            "Host: %@\r\n"
                            "Sec-WebSocket-Key2: %@\r\n"
                            "Origin: %@\r\n"
                            "\r\n",
                            requestPath,@"4 @1  46546xW%0l 1 5",host,@"12998 5 Y3 1  .P00",nil];
    
    NSData *key3 = [self createRandomBytes];
    
    [handshake appendData:[getRequest dataUsingEncoding:NSASCIIStringEncoding]];
    [handshake appendData:key3];
    [sock writeData:handshake withTimeout:-1 tag:WebSocketTagHandshake];
    
	// but we're not open yet...
	[connectedSockets addObject:sock];
}

- (void)onSocket:(AsyncSocket *)sock didReadData:(NSData *)data withTag:(long)tag
{
    if (tag == WebSocketTagHandshake) {
        NSString* response = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
        if ([response hasPrefix:@"HTTP/1.1 101 WebSocket Protocol Handshake\r\n"]) {
            NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onOpen(\"%d\");",[sock userData] ];        	
        	[self.webView stringByEvaluatingJavaScriptFromString:jsString];
        	
            [sock readDataToData:[NSData dataWithBytes:"\xFF" length:1] withTimeout:-1 tag:WebSocketTagMessage];
        } else {
            // TODO fix onError to match real error codes
      		NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onError(\"%d\",\"%@\");",[sock userData] , @"Error could not complete handshake" ];
      		[self.webView stringByEvaluatingJavaScriptFromString:jsString];
        }
    } else if (tag == WebSocketTagMessage) {
        if ([data length] <= 16) return; //invalid message size
        
        char firstByte = 0xFF;
        [data getBytes:&firstByte range:NSMakeRange(16, 1)];
        if (firstByte != 0x00) return; // Discard message
        NSString* msg = [[NSString alloc] initWithData:[data subdataWithRange:NSMakeRange(18, [data length]-34)] encoding:NSUTF8StringEncoding];
        
    	if(msg)
    	{
            // needs to escape to be able to pass strings back to the PhoneGap WebSocket
            NSString *escaped = [msg stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""];
            NSCharacterSet *newlines = [NSCharacterSet newlineCharacterSet];
            NSArray *parts = [escaped componentsSeparatedByCharactersInSet:newlines];
            escaped = [parts componentsJoinedByString:@""];
            
    		NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onMessage(\"%d\",\"%@\");",[sock userData] , escaped];
            
    		[self.webView stringByEvaluatingJavaScriptFromString:jsString];
    	}
    	else
    	{
    		NSLog(@"Error converting received data into UTF-8 String");
    		NSString* jsString = [[NSString alloc] initWithFormat:@"WebSocket.__onError(\"%d\",\"%@\");",[sock userData] , @"Error converting received data into UTF-8 String" ];
    		[self.webView stringByEvaluatingJavaScriptFromString:jsString];
    	}
        
        [sock readDataToData:[NSData dataWithBytes:"\xFF" length:1] withTimeout:-1 tag:WebSocketTagMessage];
    }
}

- (void)onSocket:(AsyncSocket *)sock didReadPartialDataOfLength:(CFIndex)partialLength tag:(long)tag
{
	
}

- (void)onSocket:(AsyncSocket *)sock didWriteDataWithTag:(long)tag
{
	if (tag == WebSocketTagHandshake) {
        [sock readDataToData:[@"\r\n\r\n" dataUsingEncoding:NSASCIIStringEncoding] withTimeout:-1 tag:WebSocketTagHandshake];
    }
}

- (void)onSocket:(AsyncSocket *)sock didWritePartialDataOfLength:(CFIndex)partialLength tag:(long)tag
{
	
}

- (void)onSocketDidSecure:(AsyncSocket *)sock
{
	
}

@end
