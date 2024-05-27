#!/bin/bash

CMDA="/media/dataj/Documents/capnproto-install-clang/bin/capnp decode /media/dataj/jianjia_nwjs55/src/v8/src/taint_tracking/protos/logrecord.capnp TaintLogRecord"

for file in /home/suzy/temp/new_taint_log_file/*; 
do
    if [ "$file" != "*_de" ]
    then
    $CMDA < "$file" > /home/suzy/temp/decoded_new_taint_log_file/${file##*/}
    fi
done