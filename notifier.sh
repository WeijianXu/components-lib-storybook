#!/bin/sh
FILE_PATH=package.json
id=$(cat $FILE_PATH | grep "version" | sed 's/version//g' | sed 's/[",:]//g' )
echo -e "当前发布版本: \c"
echo $id

domain=http://localhost:6006/sz-design

curl "https://oapi.dingtalk.com/robot/send?access_token=****" -X POST \
  -H "Content-Type: application/json" \
  -d "{\"msgtype\": \"text\",\"text\": {\"content\":\"【新版 $id 发布成功】: \n 1. 变更日志: $domain/?path=/story/***--page ; \n 2. 使用方法: $domain/?path=/story/****--page \"}}"
