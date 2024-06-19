# this script checks the log without decoding
# logpath: /home/suzy/temp/new_taint_log_file/
import capnp
capnp.remove_import_hook()
TaintLogRecordGroup_capnp = capnp.load("/media/dataj/jianjia_nwjs55/src/v8/src/taint_tracking/protos/logrecord.capnp")


def main():
    # logpath = "/home/suzy/temp/decoded_new_taint_log_file/weapp-qrcode_30077_1718650965035_0"
    logpath = "/home/suzy/temp/new_taint_log_file/wx70e4dfb6146026be-pc_20962_1718742164582_1"
    check_log_flows(logpath)

def check_log_flows(logpath):
    f = open(logpath, 'rb')
    TaintLogRecordGroup = TaintLogRecordGroup_capnp.TaintLogRecord.read_multiple(f)
    for record in TaintLogRecordGroup:
        for range in record.message.jsSinkTainted.taintSource.ranges:
            sourceType = range.type
            if sourceType in ['inputBox']:#, 'sensWechatApi', 'formSubmit', 'onLaunch']:
                print(f'messageId: {record.messageId}')
                print(f'range: {range}')
                for content_log in record.message.jsSinkTainted.targetString.segments:
                    print(f'content: {content_log.content}')
                    conten_str = content_log.content.decode('utf-8')
                    print(f'taint char: {conten_str[range.start]}')
                    # print(f'taint char: {content_log["content"][range["start"]]}')
                frames = record.message.jsSinkTainted.stackTrace.frames
                print('frames:')
                # for frame in frames:
                #     if "appservice" in frame.frameHumanReadable:
                #         print(frame.frameHumanReadable)
                print('\n')
                
                

if __name__ == "__main__":
    main()
