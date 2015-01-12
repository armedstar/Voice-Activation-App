//
//  PhotoDisplayBrief.m
//  VelvetFog
//
//  Created by Jonathan Arme on 5/1/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "PhotoDisplayBrief.h"

@implementation PhotoDisplayBrief

@synthesize title = _title;
@synthesize uid = _uid;
@synthesize caption = _caption;
@synthesize credit = _credit;
@synthesize width = _width;
@synthesize height = _height;
@synthesize sourceText = _sourceText;
@synthesize format = _format;
@synthesize imageSource = _imageSource;

-(id) copyWithZone:(NSZone *)zone
{
    PhotoDisplayBrief *copy = [[PhotoDisplayBrief allocWithZone:zone] init];
    copy.title = self.title;
    copy.uid = self.uid;
    copy.caption = self.caption;
    copy.credit = self.credit;
    copy.width = self.width;
    copy.height = self.height;
    copy.sourceText = self.sourceText;
    copy.format = self.format;
    copy.imageSource = self.imageSource;
    
    return copy;
}

- (NSDictionary *)getDictionary
{
    return [self dictionaryWithValuesForKeys:[NSArray arrayWithObjects:@"uid", @"title", @"caption", @"credit", @"width", @"height", @"sourceText", @"format", @"imageSource", nil]];
}

-(NSString *)JSONString
{
    return [[self getDictionary] JSONString];
}

@end
