export function make_text() {
    let text = '\n---------------------------\n';
    // 新歓の開始と終了の時刻を取得

    // 送信するテキストの整形
    text += '**'+ '1' + ',**\n:ballot_box_with_check: '+self.name+'\n\n'

    // if (self.circleNewJoy.title is not None):
        text += '📛 新歓名:**' /*+self.circleNewJoy.title*/ +'**\n\n'

    // if (self.circleNewJoy.startDate is not None and self.circleNewJoy.endDate is not None):
        text += '🗓 日にち:**'/*+str(self.circleNewJoy.startDatetime())*/ + ' ~ '+/*str(self.circleNewJoy.endDatetime())+*/'**\n\n'
    // elif (self.circleNewJoy.endDate is None):
    //  text += '🗓 日にち:**' + /*str(self.circleNewJoy.startDatetime())*/+' ~ **\n\n'

    // if (self.circleNewJoy.placeOfActivity is not None):
        text += '🧭 場所:**' /* +PlaceOfActivity.placeOfActivityTrans(self.circleNewJoy.placeOfActivity)*/ + '**\n\n'

    // if (self.circleNewJoy.description is not None):
        text += '📣 ひとこと:**' /*+ self.circleNewJoy.description*/ + '**\n\n'

    // if (self.circleNewJoy.url is not None):
        text += '💻 新歓URL:' /*+ self.circleNewJoy.url*/ + '\n\n'

    // if (self.slug is not None):
        text += '👀 サークルを見る: https://uu-circles.com/circle/'/*+self.slug*/+'\n\n'
    text += '📌 新歓ルーム:**'/*+str(idx + 1)*/+'**\n\n'
    text += '\n---------------------------\n'

    return text
}
