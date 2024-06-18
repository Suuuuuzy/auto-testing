#!/bin/bash

CMDA="/media/dataj/Documents/capnproto-install-clang/bin/capnp decode /media/dataj/jianjia_nwjs55/src/v8/src/taint_tracking/protos/logrecord.capnp TaintLogRecord"
DIR="/home/suzy/temp/new_taint_log_file/"

if [ -z "$(ls -A "$DIR")" ]; then
   echo "The log directory is tempory empty."
else
    for file in "$DIR"/*; 
    do
        $CMDA < "$file" > /home/suzy/temp/decoded_new_taint_log_file/${file##*/}
        # rm "$file"
    done
fi