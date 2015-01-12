//
//  nmsp_nmas_whether.m
//  NmasAsrSample
//
//  Created by administrator on 11-04-27.
//  Copyright 2011 Nuance. All rights reserved.
//

#import "nmsp_nmas_asr.h"
//#import "NmasAsrSampleViewController.h"

//apply for application_id from customer support, http://www.nuance.com;
#define NMSPGATEWAY	 "mtl-nvc12.nuance.com" //"bz.nvc.nuancemobility.net"
#define NMSPPORT	 443

static const char * APP_ID = "ROVI_DTV_DEV_NMAID_20120305";

static const char APP_KEY[] = 
{ 
    0xd2, 0x13, 0x4d, 0xd1, 0xb5, 0xe0, 0x14, 0x90, 0xbb, 0xd4, 0x92, 0x7a, 0x96, 0x45, 
    0x70, 0xa8, 0x52, 0x2e, 0x7b, 0xd7, 0x02, 0xfa, 0xef, 0x5c, 0x9c, 0xa2, 0xf7, 0x54, 
    0x21, 0xf9, 0x74, 0x1f, 0x01, 0x46, 0xfd, 0x0e, 0xbc, 0x13, 0x26, 0x5a, 0xcc, 0x44, 
    0x05, 0x57, 0xc1, 0x6a, 0xf1, 0xea, 0xae, 0x59, 0x8d, 0x38, 0xc3, 0xf7, 0x04, 0xa0, 
    0x3b, 0x56, 0x95, 0xea, 0x78, 0x05, 0x51, 0xc0 
};


//NMSP SDK: definitions
#define ASR_COMMAND     "ACADIA_SMART_SEARCH"  //"NMDP_ASR_CMD"
#define REQ_PARAM       "REQUEST_INFO"
#define AUDIO_PARAM     "SEARCH" //"AUDIO_INFO"
#define DICT_TYPE		"dictation" 	// "dictation" or "websearch" 
#define NMSP_DEFAULT_CODEC	CODEC_SPEEX_16K


//NMSP SDK: assistant functions
nmsp_nmas_Dictionary* create_asr_command_optional_keys();

nmsp_nmas_Dictionary* create_request_info();

void app_audio_record_EventCallback(const NMSP_AUDIO_RECORD_EVENT event, void* eventData, void* user_data);

void app_manager_EventCB(NMSP_MANAGER_EVENT event, const char* session_id, void* user_data);

void app_nmas_resource_EventCB(NMSP_NMAS_RESOURCE_EVENT event, void* user_data);

void app_resource_EventCB(NMSP_RESOURCE_EVENT event, nmsp_Vector* parameters, RESOURCE_STATUS_CODE status_code, RESOURCE_COMPLETION_CAUSE completion_cause, RESOURCE_EVENT_CODE event_code, void* user_data);

void app_nmas_command_EventCB(NMSP_NMAS_COMMAND_EVENT event, nmsp_nmas_Message* message, void* user_data);


@implementation nmsp_nmas_asr
@synthesize nmas_command = nmas_command;
@synthesize delegate = _delegate;

- (id) initWithDelegate:(id)delegate
{
    self.delegate = delegate;
    
    nmsp_Vector* parameters = NULL;
    nmsp_Parameter* param1 = NULL;
    
    parameters = nmsp_vector_create(NMSP_OBJECT_TYPE_PARAMETER);
    param1 = (nmsp_Parameter*) malloc(sizeof(nmsp_Parameter));
    param1->name = NMSP_DEFINES_PING_INTERVAL_PARAM;
    param1->payload = "5";
    param1->length = (unsigned long) (strlen(param1->payload));
    param1->type = NMSP_PARAM_TYPE_NMSP;
    
    // NMSP SDK: create manager 
    manager = nmsp_manager_create(NMSPGATEWAY, NMSPPORT, APP_ID, APP_KEY, sizeof(APP_KEY), nmsp_getUniqueID(), NMSP_DEFAULT_CODEC, NMSP_DEFAULT_CODEC, parameters, app_manager_EventCB, self);
    
    free((nmsp_Parameter*)param1);
    nmsp_vector_destroy(parameters);
    
    nmas_resource = NULL;
    audio_parameter = NULL;
    nmas_requestInfo_parameter = NULL;
    nmas_command = NULL;
    recorder = NULL;
    return self;
}


- (void) dealloc
{
	//MUST delete audio recorder before deleting audio paramter;
	if(recorder) {
	    nmsp_audio_recorder_delete(recorder);
		recorder = NULL;
	}
    
	//MUST delete audio paramter after deleting audio recorder;
	if (audio_parameter) {
	    nmsp_nmas_parameter_delete(audio_parameter);
		audio_parameter = NULL;
	}

    // NMSP SDK: delete parameter
	if (nmas_requestInfo_parameter) {
	    nmsp_nmas_parameter_delete(nmas_requestInfo_parameter);
		nmas_requestInfo_parameter = NULL;
	}
    
    // NMSP SDK: destroy command 
	if (nmas_command) {
		nmsp_nmas_command_destroy(nmas_command, nmas_resource);
		nmas_command = NULL;
	}
    
    // NMSP SDK: release nmas resource
	if (nmas_resource) {
		nmsp_resource_freeResource(nmsp_nmas_resource_get_nmsp_resource(nmas_resource), 0);
		nmsp_nmas_resource_destroy(nmas_resource);
		nmas_resource = NULL;
	}
    
    // NMSP SDK: destroy manager
    if (manager) {
        nmsp_manager_destroy(manager);
        manager = NULL;
    }
    
    [super dealloc];
}

nmsp_nmas_Dictionary* createSettingsInfoDictItem(const char* n, const char* t, const char* v){
	nmsp_nmas_Dictionary* dict = NULL;
    dict = nmsp_nmas_create_dictionary();
    nmsp_nmas_dictionary_add(dict, "n", n, UTF8_STRING, strlen(n));
    nmsp_nmas_dictionary_add(dict, "t", t, UTF8_STRING, strlen(t));
    nmsp_nmas_dictionary_add(dict, "v", v, UTF8_STRING, strlen(v));
	return dict;
}

- (void) startRecording
{
	//MUST delete audio recorder before deleting audio paramter;
	if(recorder) {
	    nmsp_audio_recorder_delete(recorder);
		recorder = NULL;
		[self showMessage:@"nmsp_audio_recorder_delete"];
	}
    
	//MUST delete audio paramter after deleting audio recorder;
	if (audio_parameter) {
	    nmsp_nmas_parameter_delete(audio_parameter);
		audio_parameter = NULL;
		[self showMessage:@"nmsp_nmas_parameter_delete"];
	}

	//NMSP SDK: MUST delete audio paramter after deleting audio recorder;
	if (nmas_requestInfo_parameter) {
	    nmsp_nmas_parameter_delete(nmas_requestInfo_parameter);
		nmas_requestInfo_parameter = NULL;
		[self showMessage:@"nmsp_nmas_parameter_delete"];
	}
    
    // NMSP SDK: destroy command 
	if (nmas_command) {
		nmsp_nmas_command_destroy(nmas_command, nmas_resource);
		nmas_command = NULL;
		[self showMessage:@"nmsp_nmas_command_destroy"];
	}
    
    // NMSP SDK: release nmas resource
	if (nmas_resource) {
		nmsp_resource_freeResource(nmsp_nmas_resource_get_nmsp_resource(nmas_resource), 0);
		nmsp_nmas_resource_destroy(nmas_resource);
		nmas_resource = NULL;
		[self showMessage:@"nmsp_resource_freeResource"];
	}
    
    // NMSP SDK: create NMAS resource  
    nmas_resource = nmsp_nmas_resource_create(manager, app_nmas_resource_EventCB, app_resource_EventCB, NULL, NULL, self);
    
    //NMSP SDK: Create optionalKey
    nmsp_nmas_Dictionary* optionalKey = create_asr_command_optional_keys();
    
    // NMSP SDK: create command ASR_COMMAND 
    nmas_command = nmsp_nmas_command_create(nmas_resource, app_nmas_command_EventCB, ASR_COMMAND,"1","enus",nmsp_getOperatorName(), nmsp_getDeviceModel(), 35000, optionalKey, self);
    
    
    int loc_enabled = 0;
    nmsp_nmas_Parameter* transferParam = nmsp_nmas_text_param_create("TRANSFER_ID", "eltransferid", strlen("eltransferid"));
    nmsp_nmas_Dictionary* loc_dict = nmsp_nmas_create_dictionary();
    nmsp_nmas_dictionary_add(loc_dict, "loc_enabled", &loc_enabled, INTEGER, 1);
    nmsp_nmas_Parameter* locParameter = nmsp_nmas_dict_param_create("LOCATION", loc_dict);
    
    nmsp_nmas_Parameter* textParameter = nmsp_nmas_text_param_create("SEARCH", "search for stargate", strlen("search for stargate")); 
     
     //settingParam
    nmsp_nmas_Sequence* setting_seq = nmsp_nmas_create_sequence();
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("return_epg_results", "general", "1"), DICTIONARY, 1);
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("epg_results_size", "general", "10"), DICTIONARY, 1);
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("safe_search", "general", "0"), DICTIONARY, 1);
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("headend", "general", "311455"/*headend*/), DICTIONARY, 1);
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("local_time", "general", "1334718618"), DICTIONARY, 1);
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("second_screen", "general", "1"), DICTIONARY, 1);
    nmsp_nmas_sequence_add(setting_seq, createSettingsInfoDictItem("return_rovi_ids", "general", "1"), DICTIONARY, 1);
    
    nmsp_nmas_Dictionary* setting_dict = nmsp_nmas_create_dictionary();
    nmsp_nmas_dictionary_add(setting_dict, "settings_info", setting_seq, SEQUENCE, 1);
    nmsp_nmas_Parameter* settingParameter = nmsp_nmas_dict_param_create("SETTINGS", setting_dict);
    
    //audio
    audio_parameter = nmsp_nmas_audio_param_create("SEARCH", nmas_resource);
    
    nmsp_nmas_Dictionary* requestInfo = create_request_info();
    nmas_requestInfo_parameter = nmsp_nmas_dict_param_create(REQ_PARAM, requestInfo);

    
    nmsp_nmas_command_send_parameter(nmas_command, transferParam);
    nmsp_nmas_command_send_parameter(nmas_command, locParameter);
    nmsp_nmas_command_send_parameter(nmas_command, settingParameter);
    nmsp_nmas_command_send_parameter(nmas_command, audio_parameter);
    
    nmsp_general_AudioSink* audio_sink = nmsp_nmas_audio_param_getAudioSink(audio_parameter);
    recorder = nmsp_audio_recorder_create(audio_sink, manager, app_audio_record_EventCallback, 30000, NULL, self);
    nmsp_audio_recorder_start(recorder);
    [self showMessage:@"nmsp_audio_recorder_start"];
    
    nmsp_nmas_command_end(nmas_command);
    [self showMessage:@"nmsp_nmas_command_end"];
    
    nmsp_nmas_delete_dictionary(optionalKey, 1);
    nmsp_nmas_parameter_delete(transferParam);
    nmsp_nmas_parameter_delete(locParameter);
    nmsp_nmas_delete_dictionary(loc_dict, 1);
    nmsp_nmas_parameter_delete(settingParameter);
    nmsp_nmas_delete_dictionary(setting_dict, 1);
    nmsp_nmas_parameter_delete(textParameter);
    
    
}

- (void) stopRecording
{
    // NMSP SDK: stop recording 
	nmsp_audio_recorder_stop(recorder);
    [self showMessage:@"nmsp_audio_recorder_stop"];
}

- (void) showMessage:(NSString *)formatString, ... 
{
    va_list args;
    va_start(args, formatString);

    NSString * message = [[NSString alloc] initWithFormat:formatString arguments:args];
    NSLog(@"%@", message);
    
    [message release];

    va_end(args);    
}

@end

//NMSP SDK: assistant functions
nmsp_nmas_Dictionary* create_asr_command_optional_keys()
{
    const char *dic_type    = DICT_TYPE; 
    const char *locale      = "US";
    const char *nmaid       = APP_ID;
    const char *app_name    = "email_client";
    const char *field_id    = "To_Field";
    const char *op_sys      = "4.0";
    const char *network     = "3G";
    const char *audio_src   = "SpeakerAndMicrophone";
    const char *location    = "<+29.59300303, -98.37395602> +/- 2252.00m";
    const char *session_id  = "1234567890";
    const char *utt_num     = "5";
    const char *ui_language = "entv";
    const char *submodel    = "submodel42";
    const char *app_state   = "45";
    
    nmsp_nmas_Dictionary* dict = nmsp_nmas_create_dictionary();
    nmsp_nmas_dictionary_add(dict, "dictation_type",         dic_type,    ASCII_STRING, strlen(dic_type));
    nmsp_nmas_dictionary_add(dict, "locale",                 locale,      ASCII_STRING, strlen(locale));
    nmsp_nmas_dictionary_add(dict, "nmaid",                  nmaid,       UTF8_STRING, strlen(nmaid));
    nmsp_nmas_dictionary_add(dict, "iphone_app_type",        "DragonTV3", UTF8_STRING , strlen("DragonTV3") ); //Dragon_TV=B14, DragonTV3=B13, DragonTV2=B12 
    nmsp_nmas_dictionary_add(dict, "application_name",       app_name,    ASCII_STRING, strlen(app_name));
    nmsp_nmas_dictionary_add(dict, "field_id",               field_id,    ASCII_STRING, strlen(field_id));
    nmsp_nmas_dictionary_add(dict, "phone_OS",               op_sys,      ASCII_STRING, strlen(op_sys));
    nmsp_nmas_dictionary_add(dict, "phone_network",          network,     ASCII_STRING, strlen(network));
    nmsp_nmas_dictionary_add(dict, "audio_source",           audio_src,   ASCII_STRING, strlen(audio_src));
    nmsp_nmas_dictionary_add(dict, "location",               location,    ASCII_STRING, strlen(location));
    nmsp_nmas_dictionary_add(dict, "application_session_id", session_id,  ASCII_STRING, strlen(session_id));
    nmsp_nmas_dictionary_add(dict, "utterance_number",       utt_num,     ASCII_STRING, strlen(utt_num));
    nmsp_nmas_dictionary_add(dict, "ui_language",            ui_language, ASCII_STRING, strlen(ui_language));
    nmsp_nmas_dictionary_add(dict, "phone_submodel",         submodel,    ASCII_STRING, strlen(submodel));
    nmsp_nmas_dictionary_add(dict, "application_state_id",   app_state,   ASCII_STRING, strlen(app_state));
    
    return dict;
}

nmsp_nmas_Dictionary* create_request_info()
{
	int start = 0;
	int end = 0;
    //	int binary_results = 1;
    
    nmsp_nmas_Dictionary* dict = nmsp_nmas_create_dictionary();
    
    nmsp_nmas_dictionary_add(dict, "start", &start, INTEGER, 1);
    nmsp_nmas_dictionary_add(dict, "end",  &end, INTEGER, 1);
    nmsp_nmas_dictionary_add(dict, "text", " ", UTF8_STRING, 0);
    
    return dict;
}


//SDK callbacks
void app_audio_record_EventCallback(const NMSP_AUDIO_RECORD_EVENT event, void* eventData, void* user_data)
{
    nmsp_nmas_asr *nmasAsr = (nmsp_nmas_asr *)user_data;
    
	switch(event) {
        case NMSP_AUDIO_RECORD_BUFFER_RECORDED:
            break;
        case NMSP_AUDIO_RECORD_ERROR:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_ERROR]"]; 
            break;
        case NMSP_AUDIO_RECORD_STARTED:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_STARTED]"]; 
            break;
        case NMSP_AUDIO_RECORD_STOPPED:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_STOPPED]"];
            break;
        case NMSP_AUDIO_RECORD_OUT_OF_MEMORY:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_OUT_OF_MEMORY]"]; 
            break;
        case NMSP_AUDIO_RECORD_INVALID_STATE:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_INVALID_STATE]"]; 
            break;
        case NMSP_AUDIO_RECORD_STOPPED_TIMEOUT:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_STOPPED_TIMEOUT]"]; 
            break;
        case NMSP_AUDIO_RECORD_STOPPED_END_OF_SPEECH:
            [nmasAsr showMessage:@"audio_record_EventCallback event [NMSP_AUDIO_RECORD_STOPPED_END_OF_SPEECH]"]; 
            break;
    }
}

void app_manager_EventCB(NMSP_MANAGER_EVENT event, const char* session_id, void* user_data)
{
    nmsp_nmas_asr *nmasAsr = (nmsp_nmas_asr *)user_data;
    
	switch(event) {
		case NMSP_MANAGER_CONNECTED:
            [nmasAsr showMessage:@"Manager_EventCB event [NMSP_MANAGER_CONNECTED]"];
            [nmasAsr showMessage:@"Session Id = %@",[[[NSString alloc] initWithUTF8String:session_id] autorelease]];
			break;
		case NMSP_MANAGER_DISCONNECTED:
			[nmasAsr showMessage:@"manager_EventCB event [NMSP_MANAGER_DISCONNECTED]"]; 
			break;
		case NMSP_MANAGER_CONNECTION_FAILED:
			[nmasAsr showMessage:@"manager_EventCB event [NMSP_MANAGER_CONNECTION_FAILED]"]; 
            [nmasAsr handleResult:@"CONNECTION_FAILED"];
			break;
		case NMSP_MANAGER_DESTROYED:
			[nmasAsr showMessage:@"manager_EventCB event [NMSP_MANAGER_DESTROYED]"]; 
			break;
		case NMSP_MANAGER_OUT_OF_MEMORY:
			[nmasAsr showMessage:@"manager_EventCB event [NMSP_MANAGER_OUT_OF_MEMORY]"]; 
			break;
    }
}

void app_nmas_resource_EventCB(NMSP_NMAS_RESOURCE_EVENT event, void* user_data)
{
    nmsp_nmas_asr *nmasAsr = (nmsp_nmas_asr *)user_data;
    
	switch(event) {
        case NMSP_NMAS_RESOURCE_COMMAND_CREATED:
            [nmasAsr showMessage:@"NMAS Command Created\n"];
            [nmasAsr.delegate handleReadyForAudio];
            break;
        case NMSP_NMAS_RESOURCE_COMMAND_CREATION_FAILED:
            [nmasAsr showMessage:@"NMAS Command Creation Failed\n"];
            [nmasAsr handleResult:@"COMMAND_CREATION_FAILED"];
            break;
	}
}

void app_resource_EventCB(NMSP_RESOURCE_EVENT event, nmsp_Vector* parameters, RESOURCE_STATUS_CODE status_code, RESOURCE_COMPLETION_CAUSE completion_cause, RESOURCE_EVENT_CODE event_code, void* user_data)
{
	unsigned int i;
    nmsp_Parameter* parameter;
    nmsp_nmas_asr *nmasAsr = (nmsp_nmas_asr *)user_data;
    
	switch(event) {
        case NMSP_RESOURCE_SET_PARAM_COMPLETED:
            [nmasAsr showMessage:@"Resource_EventCB event [NMSP_RESOURCE_SET_PARAM_COMPLETED]"]; 
            if(parameters != NULL) {
                for(i = 0; i < nmsp_vector_getCount(parameters); i++) {
                    parameter = (nmsp_Parameter*)nmsp_vector_getItem(parameters, i);
                    [nmasAsr showMessage:@"param name: %@", [[[NSString alloc] initWithUTF8String:parameter->name] autorelease]];
                }
            }
            break;
        case NMSP_RESOURCE_SET_PARAM_FAILED:
            [nmasAsr showMessage:@"Resource_EventCB event [NMSP_RESOURCE_SET_PARAM_FAILED]"]; 
            break;
        case NMSP_RESOURCE_GET_PARAM_COMPLETED:
            [nmasAsr showMessage:@"Resource_EventCB event [NMSP_RESOURCE_GET_PARAM_COMPLETED]"]; 
            if(parameters != NULL) {
                for(i = 0; i < nmsp_vector_getCount(parameters); i++) {
                    parameter = (nmsp_Parameter*)nmsp_vector_getItem(parameters, i);
                    [nmasAsr showMessage:@"param name: %@ value: %@", 
                     [[[NSString alloc] initWithUTF8String:parameter->name] autorelease],
                     [[[NSString alloc] initWithUTF8String:parameter->payload] autorelease]];
                }
            }
            break;
        case NMSP_RESOURCE_GET_PARAM_FAILED:
            [nmasAsr showMessage:@"Resource_EventCB event [NMSP_RESOURCE_GET_PARAM_FAILED]"]; 
            break;
        case NMSP_RESOURCE_RESOURCE_UNLOADED:
            [nmasAsr showMessage:@"Resource_EventCB event [NMSP_RESOURCE_RESOURCE_UNLOADED]"]; 
            break;
    }
}

void app_nmas_command_EventCB(NMSP_NMAS_COMMAND_EVENT event, nmsp_nmas_Message* message, void* user_data)
{
	unsigned long length;
	char* result;
    char* text;
    void* mediaType;
    char* genre;
    char* intent;
    char* channel;
    char* second_screen;
    char* canonical_name;
    char* character_name;
    char* canonical_id;
    char* canonical_mediaType;
    
    nmsp_nmas_asr *nmasAsr = (nmsp_nmas_asr *)user_data;
    unsigned int num_titles;
    unsigned int num_actors;
    unsigned int num_stations;
    unsigned int num_canonicals;
    
    //For test
    nmsp_nmas_Sequence* seq_result = NULL;
    nmsp_nmas_Sequence* titles = NULL;
    nmsp_nmas_Sequence* actors = NULL;
    nmsp_nmas_Sequence* canonicals = NULL;
    nmsp_nmas_Sequence* stations = NULL;
    nmsp_nmas_Sequence* seq_epg_results = NULL;
    nmsp_nmas_Dictionary* dict_result = NULL;
    nmsp_nmas_Dictionary* canonical_result = NULL;
    int i=0;
    
    NSString* msg;
    
	switch(event) {
        case NMSP_NMAS_COMMAND_TIMEDOUT_WAITING_FOR_RESULTS:
            [nmasAsr.delegate handleError:@"NMSP Command timed out waiting for results."];
            break;
        case NMSP_NMAS_COMMAND_REMOTE_DISCONNECTION:
            [nmasAsr.delegate handleError:@"NMSP Command remote disconnection."];
            break;
        case NMSP_NMAS_COMMAND_ENDED:
            //[nmasAsr.delegate handleError:@"NMSP Command ended."];
            break;
        case NMSP_NMAS_COMMAND_IDLE_FOR_TOO_LONG:
            //[nmasAsr.delegate handleError:@"NMSP Command idle for too long."];
            break;
        case NMSP_NMAS_COMMAND_LOST_CONNECTION:
            [nmasAsr.delegate handleError:@"NMSP Lost remote connection."];
            break;
        case NMSP_NMAS_COMMAND_PDX_RESPONSE:
            switch(message->cmd) 
		{
            case QUERY_RESULT:
                result = (char*)nmsp_nmas_get_message_value("result_type", message, &length);
                
                seq_result = nmsp_nmas_get_message_value("results", message, &length);
                dict_result = nmsp_nmas_get_sequence_value(0, seq_result, &length);
                seq_epg_results = nmsp_nmas_get_dictionary_value("epg", dict_result , &length);
                text = (char*)nmsp_nmas_get_dictionary_string_value("text", dict_result, &length);
                mediaType = (char*)nmsp_nmas_get_dictionary_value("media_type", dict_result, &length);
                intent = (char*)nmsp_nmas_get_dictionary_value("intent", dict_result, &length);
                genre = (char*)nmsp_nmas_get_dictionary_value("genre", dict_result, &length);
                channel = (char *)nmsp_nmas_get_dictionary_value("channel", dict_result, &length);
                second_screen = (char *)nmsp_nmas_get_dictionary_value("second_screen", dict_result, &length);
                titles = nmsp_nmas_get_dictionary_sequence_value("titles", dict_result);
                actors = nmsp_nmas_get_dictionary_sequence_value("actors", dict_result);
                stations = nmsp_nmas_get_dictionary_sequence_value("stations", dict_result);
                
                
                NMSPResponse * response = [[NMSPResponse alloc] init];
                
                if (intent)
                {
                    response.intent = [NSString stringWithCString:intent encoding:NSUTF8StringEncoding];
                }
                
                if (text)
                {
                    response.recognizedText = [NSString stringWithCString:text encoding:NSUTF8StringEncoding];
                }
                if (genre)
                {
                    response.genre = [NSString stringWithCString:genre encoding:NSUTF8StringEncoding];
                }
                if (mediaType)
                {
                    response.mediaType = [NSString stringWithCString:mediaType encoding:NSUTF8StringEncoding];
                }
                if (channel)
                {
                    response.channel = [NSString stringWithCString:channel encoding:NSUTF8StringEncoding];
                }
                if ((second_screen) && (strcmp(second_screen, "true") == 0))
                {
                    response.isForSecondScreen = true;
                }
                else 
                {
                    response.isForSecondScreen = false;
                }
                
                if (stations)
                {
                    num_stations = nmsp_nmas_sequence_get_num_elements(stations);
                    
                    if (num_stations > 0)
                    {
                        dict_result = nmsp_nmas_get_sequence_value(0, stations, &length);
                        canonicals = nmsp_nmas_get_dictionary_sequence_value("canonicals", dict_result);
                        num_canonicals = nmsp_nmas_sequence_get_num_elements(canonicals);
                        if (num_canonicals > 0)
                        {
                            canonical_result = nmsp_nmas_get_sequence_value(0, canonicals, &length);
                            result = (char *)nmsp_nmas_get_dictionary_string_value("call_letters", canonical_result, &length);
                            if (result)
                                response.stationCallLetters = [NSString stringWithCString:result encoding:NSUTF8StringEncoding];
                            
                        }
                    }
                }
                
                if (titles)
                {
                    num_titles = nmsp_nmas_sequence_get_num_elements(titles);
                    NSMutableArray *canonArr = [[NSMutableArray alloc] init];
                    
                    for (i=0; i < num_titles; i++)
                    {
                        dict_result = nmsp_nmas_get_sequence_value(i, titles, &length);
                        canonicals = nmsp_nmas_get_dictionary_sequence_value("canonicals", dict_result);
                        num_canonicals = nmsp_nmas_sequence_get_num_elements(canonicals);
                        
                        for (int j=0; j < num_canonicals; j++)
                        {
                            canonical_result = nmsp_nmas_get_sequence_value(j, canonicals, &length);
                            canonical_name = (char*)nmsp_nmas_get_dictionary_string_value("name", canonical_result, &length);
                            canonical_mediaType = (char*)nmsp_nmas_get_dictionary_value("media_type", canonical_result, &length);
                            
                            NMSPCanonical *canonical = [[NMSPCanonical alloc] init];
                            if (canonical_name)
                            {
                                canonical.name = [NSString stringWithCString:canonical_name encoding:NSUTF8StringEncoding];
                            }
                            
                            if ((canonical_mediaType) && ((strcmp(canonical_mediaType, "SM") == 0) || (strcmp(canonical_mediaType, "SE") == 0)))
                            {
                                canonical.mediaType = @"tvSeries";
                                canonical_id = (char*)nmsp_nmas_get_dictionary_string_value("series_id", canonical_result, &length);
                            }
                            else 
                            {
                                canonical.mediaType = @"movie";
                                canonical_id = (char*)nmsp_nmas_get_dictionary_string_value("program_id", canonical_result, &length);
                            }
                            
                            if (canonical_id)
                            {
                                canonical.uid = [NSString stringWithCString:canonical_id encoding:NSUTF8StringEncoding];
                            }
                            
                            [canonArr addObject:canonical];
                            [canonical release];
                        }
                    }
                    response.recognizedTitles = canonArr;
                    [canonArr release];
                }
                
                if (actors)
                {
                    num_actors = nmsp_nmas_sequence_get_num_elements(actors);
                    NSMutableArray *canonArr = [[NSMutableArray alloc] init];
                    
                    for (i=0; i < num_actors; i++)
                    {
                        dict_result = nmsp_nmas_get_sequence_value(i, actors, &length);
                        canonicals = nmsp_nmas_get_dictionary_sequence_value("canonicals", dict_result);
                        num_canonicals = nmsp_nmas_sequence_get_num_elements(canonicals);
                        
                        for (int j=0; j < num_canonicals; j++)
                        {
                            canonical_result = nmsp_nmas_get_sequence_value(j, canonicals, &length);
                            canonical_name = (char*)nmsp_nmas_get_dictionary_string_value("name", canonical_result, &length);
                            character_name = (char*)nmsp_nmas_get_dictionary_string_value("character", canonical_result, &length);
                            NMSPCanonical *canonical = [[NMSPCanonical alloc] init];
                            if (canonical_name)
                                canonical.name = [NSString stringWithCString:canonical_name encoding:NSUTF8StringEncoding];
                            
                            if (character_name)
                                canonical.characterName = [NSString stringWithCString:character_name encoding:NSUTF8StringEncoding];
                            
                            canonical.mediaType = @"celebrity";
                            
                            //TODO: we need to figure out how to populate valid UIDs since DTV is not providing them at the moment.
                            //Hardcoding Andrew Lincoln (Rick Grimes)
                            //canonical.uid = @"578300";
                            
                            [canonArr addObject:canonical];
                            [canonical release];
                        }
                    }
                    
                    response.recognizedActors = canonArr;
                    [canonArr release];
                }
                
                [nmasAsr.delegate handleResponse:response];
                [response release];
                
                break;
            case QUERY_ERROR:
                result = (char*)nmsp_nmas_get_message_value("description", message, &length);
                msg = [[[NSString alloc] initWithUTF8String:result] autorelease];
                [nmasAsr.delegate handleError:[[[NSString alloc] initWithFormat:@"Query Error: %@", msg] autorelease]];
                break;
            case QUERY_RETRY:
                result = (char*)nmsp_nmas_get_message_value("name", message, &length);
                msg = [[[NSString alloc] initWithUTF8String:result] autorelease];
                [nmasAsr.delegate handleError:[[[NSString alloc] initWithFormat:@"Retry Query: %@", msg] autorelease]];
                break;
		}
            break;
        case NMSP_NMAS_COMMAND_DESTROYED:
            [nmasAsr showMessage:@"NMSP Command destroyed"];
            break;
	}
}
