#!/bin/sh

TIME="15"
DEPLOY_STATUS=$1
URL="https://api.telegram.org/bot$TG_BOT_TOKEN/sendMessage"
PARSE_MODE="Markdown"
TEXT="-------------------------------------%0A*Deploy status:* $DEPLOY_STATUS%0A\`Project: $CI_PROJECT_NAME\`%0A\`Branch: $CI_COMMIT_BRANCH\` %0A*Commit Msg:*%0A$CI_COMMIT_MESSAGE%0A[Pipeline here]($CI_PROJECT_URL/pipelines/$CI_PIPELINE_ID/)%0A-------------------------------------"

curl -s --max-time $TIME -d "chat_id=$TG_GROUP_ID&disable_web_page_preview=1&text=$TEXT&parse_mode=$PARSE_MODE" $URL > /dev/null
