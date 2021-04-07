import discord
from discord.ext import tasks, commands
import settings
from datetime import datetime, timedelta, timezone
import requests
import json
import io
import itertools
import create_text
from domain import todayCircleNewJoy as domain

###SET_ENVIRONMENT_VALUES###
TOKEN = settings.TOKEN
# CHANNEL_ID = int(settings.CHANNEL_ID)
API_URL = settings.API_URL
# TEST_API_URL = settings.TEST_API_URL

###TEST_CHANNEL_ID###
CHANNEL_ID = int(settings.TEST_CHANNEL_ID)

###GET_API_INFORMATION###
payload = {'key': 'value'}
r = requests.get(API_URL, params=payload).json()

# ###TEST_API_INFORMATION###
# # r = requests.get(TEST_API_URL, params=payload).json()

# ###MAKE_BOT###
# # 接続に必要なオブジェクトを生成
# client = discord.Client()

# ###SET_LOOP###
# #ループ処理
# @client.event
# async def on_ready():
#     channel = client.get_channel(CHANNEL_ID)
#     #アナウンス
#     if (len(r['todayCircleNewJoys']) == 0):
#         await channel.send('***:crescent_moon:今日の新歓はありません***')
#         exit()
#     else:
#         now = create_text.get_now()
#         await channel.send('***☀️今日の新歓 '+now+'***')
#         message = create_text.make_text(r)
#         for text in message:
#             await channel.send(text)
#         exit()

# client.run(TOKEN)

###TEST_CODES###
print(type(r['todayCircleNewJoys'][0]))
print(r['todayCircleNewJoys'][0])
# A = CircleNewJoy.CircleNewJoy(r['todayCircleNewJoys'][0]['CircleNewJoy'])

A = domain.TodayCircleNewJoy(r['todayCircleNewJoys'][0])
# print(A.slug)
# print(A.circleNewJoy.format_startDay())
print(A.make_text(1))

# print(type(A))

