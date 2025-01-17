import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { CategorySlugProperty } from '@/src/lib/enum/api/CategorySlugProperty'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { CircleType } from '@/src/lib/enum/api/CircleType'
import { DateOfActivity } from '@/src/lib/enum/api/DateOfActivity'
import { PlaceOfActivity } from '@/src/lib/enum/api/PlaceOfActivity'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { Week } from '@/src/lib/enum/api/Week'

export const namespaceType = {
  TitleByCategorySlugProperty: 'TitleByCategorySlugProperty',
  TitleByTagSlugProperty: 'TitleByTagSlugProperty',
  TextByCategorySlugProperty: 'TextByCategorySlugProperty',
  TextByTagSlugProperty: 'TextByTagSlugProperty',
} as const

export const ja: { [key: string]: any } = {
  [CircleType._type]: {
    [CircleType.OFFICIAL_ORGANIZATION]: '公認団体',
    [CircleType.UNOFFICIAL_ORGANIZATION]: '非公認団体',
    [CircleType.SENDING_ORGANIZATION]: '届出団体',
    [CircleType.STUDENT_GROUP]: '学生団体',
  },
  [CategorySlugProperty._type]: {
    [CategorySlugProperty.official_organization]: '公認団体',
    [CategorySlugProperty.unofficial_organization]: '非公認団体',
    // [CategorySlugProperty.sending_organization]: '届出団体',
    [CategorySlugProperty.student_group]: '学生団体',
    [CategorySlugProperty.club]: '部活',
  },
  [DateOfActivity._type]: {
    [DateOfActivity.EVERY_WEEK]: '毎週',
    [DateOfActivity.EVERY_OTHER_WEEK]: '隔週',
  },
  [PlaceOfActivity._type]: {
    [PlaceOfActivity.MINE]: '峰キャンパス',
    [PlaceOfActivity.MINE_AND_YOTO]: '峰と陽東キャンパス',
    [PlaceOfActivity.YOTO]: '陽東キャンパス',
    [PlaceOfActivity.NEWJOY_DISCORD]: '新歓ディスコード',
    [PlaceOfActivity.DISCORD]: 'ディスコード',
    [PlaceOfActivity.ZOOM]: 'Zoom',
    [PlaceOfActivity.OTHER]: 'その他',
  },
  [CircleTagModel._type]: {
    [CircleTagModel.SPORT]: '運動系',
    [CircleTagModel.MUSIC]: '音楽系',
    [CircleTagModel.CULTURE]: '文化系',
    [CircleTagModel.NATURE]: '農業・自然',
    [CircleTagModel.VOLUNTEER]: 'ボランティア',
    [CircleTagModel.INTERNATIONAL]: '国際交流',
    [CircleTagModel.INCARE]: 'インカレ',
    [CircleTagModel.LOOSE]: 'ゆるい',
    [CircleTagModel.COMMUNITY]: '地域おこし',
    [CircleTagModel.PROGRAMMING]: 'プログラミング',
    [CircleTagModel.URGENT_RECRUITMENT]: '部員急募',
    [CircleTagModel.MYSTERY]: '謎',
    [CircleTagModel.MAMMOTH]: 'マンモス',
    [CircleTagModel.ACTIVE_ACTIVITY]: '週5以上',
    [CircleTagModel.MONDAY]: '月曜日活動',
    [CircleTagModel.TUESDAY]: '火曜日活動',
    [CircleTagModel.WEDNESDAY]: '水曜日活動',
    [CircleTagModel.THURSDAY]: '木曜日活動',
    [CircleTagModel.FRIDAY]: '金曜日活動',
    [CircleTagModel.ONLY_MONDAY]: '月曜日のみ活動',
    [CircleTagModel.ONLY_TUESDAY]: '火曜日のみ活動',
    [CircleTagModel.ONLY_WEDNESDAY]: '水曜日のみ活動',
    [CircleTagModel.ONLY_THURSDAY]: '木曜日のみ活動',
    [CircleTagModel.ONLY_FRIDAY]: '金曜日のみ活動',
    [CircleTagModel.HOLIDAY]: '休日活動',
    [CircleTagModel.MINE]: '峰キャンパス',
    [CircleTagModel.YOTO]: '陽東キャンパス',
  },
  [TagSlugProperty._type]: {
    [TagSlugProperty.sport]: '運動系',
    [TagSlugProperty.music]: '音楽系',
    [TagSlugProperty.culture]: '文化系',
    [TagSlugProperty.nature]: '農業・自然',
    [TagSlugProperty.volunteer]: 'ボランティア',
    [TagSlugProperty.international]: '国際交流',
    [TagSlugProperty.incare]: 'インカレ',
    [TagSlugProperty.loose]: 'ゆるい',
    [TagSlugProperty.community]: '地域おこし',
    [TagSlugProperty.programming]: 'プログラミング',
    [TagSlugProperty.urgent_recruitment]: '部員急募',
    [TagSlugProperty.mystery]: '謎',
    [TagSlugProperty.mammoth]: 'マンモス',
    [TagSlugProperty.active_activity]: '週5以上',
    [TagSlugProperty.monday]: '月曜日活動',
    [TagSlugProperty.tuesday]: '火曜日活動',
    [TagSlugProperty.wednesday]: '水曜日活動',
    [TagSlugProperty.thursday]: '木曜日活動',
    [TagSlugProperty.friday]: '金曜日活動',
    [TagSlugProperty.only_monday]: '月曜日のみ活動',
    [TagSlugProperty.only_tuesday]: '火曜日のみ活動',
    [TagSlugProperty.only_wednesday]: '水曜日のみ活動',
    [TagSlugProperty.only_thursday]: '木曜日のみ活動',
    [TagSlugProperty.only_friday]: '金曜日のみ活動',
    [TagSlugProperty.holiday]: '休日活動',
    [TagSlugProperty.online]: 'オンライン',
    [TagSlugProperty.mine]: '峰キャンパス',
    [TagSlugProperty.yoto]: '陽東キャンパス',
  },
  [TagSlugProperty.online.toUpperCase()]: 'オンライン活動',
  CLUB: '部活',
  [Week._type]: {
    [Week.MONDAY]: '月曜日',
    [Week.TUESDAY]: '火曜日',
    [Week.WEDNESDAY]: '水曜日',
    [Week.THURSDAY]: '木曜日',
    [Week.FRIDAY]: '金曜日',
    [Week.SATURDAY]: '土曜日',
    [Week.SUNDAY]: '日曜日',
  },
  [namespaceType.TitleByCategorySlugProperty]: {
    [CategorySlugProperty.official_organization]: 'サークル活動の王道',
    [CategorySlugProperty.unofficial_organization]:
      '公に認められなくても良い。大学内の自由な自治体',
    // [CategorySlugProperty.sending_organization]: '公認を目指して邁進中',
    [CategorySlugProperty.student_group]:
      '社会のために。過去と未来の自分のために',
    [CategorySlugProperty.club]: '大学の1つの顔',
  },
  [namespaceType.TextByCategorySlugProperty]: {
    [CategorySlugProperty.official_organization]:
      '大学公認のサークルです。何かと不安なあなたにも。折り紙付きの安心感が、あなたの新入生生活を充実したものにします。確実なスタートダッシュを決めて、今後の生活とサークルを盛り上げてみませんか？',
    [CategorySlugProperty.unofficial_organization]:
      '学校非公認で活動しているサークルです。学校に認められてはいませんが、縛られもしていません。公認サークルには見えない可能性、一緒に切り拓きませんか？',
    // [CategorySlugProperty.sending_organization]:
    //  '公認サークルになりたい非公認サークルです。大輪の花が眠っているかもしれません。可能性のつぼみを一緒に開きませんか？',
    [CategorySlugProperty.student_group]:
      'サークルと違い、外部を対象にした活動を主とする集団です。（就職にも有利かも。）このサイトも学生集団制作です。一緒に過去の自分をサポートし、未来の自分の成功に繋げましょう。',
    [CategorySlugProperty.club]:
      'その分野での大学の代表となるのが部活動です。大学の名前を背負って、宇都宮大学という集団の一つの顔を担ってみませんか？',
  },
  [namespaceType.TitleByTagSlugProperty]: {
    [TagSlugProperty.sport]: '質実剛健への道',
    [TagSlugProperty.music]: '音を楽しみ、音で楽しませる',
    [TagSlugProperty.culture]: '思考と感性で楽しもう',
    [TagSlugProperty.nature]: '人ならざる命を鑑みる',
    [TagSlugProperty.community]: '土地への愛で、みんなを笑顔に',
    [TagSlugProperty.international]: '世界を知り、世界へ羽ばたく',
    [TagSlugProperty.incare]: '同窓に囚われない自由な活動を',
    [TagSlugProperty.programming]: '新時代を彩る人材に',
    [TagSlugProperty.volunteer]: '誰かのために、世界中の自分のために',
    [TagSlugProperty.active_activity]: '天国か地獄か',
    [TagSlugProperty.loose]: 'あくまで学業の傍らに',
    [TagSlugProperty.monday]: '',
    [TagSlugProperty.tuesday]: '',
    [TagSlugProperty.wednesday]: '',
    [TagSlugProperty.thursday]: '',
    [TagSlugProperty.friday]: '',
    [TagSlugProperty.only_monday]: '',
    [TagSlugProperty.only_tuesday]: '',
    [TagSlugProperty.only_wednesday]: '',
    [TagSlugProperty.only_thursday]: '',
    [TagSlugProperty.only_friday]: '',
    [TagSlugProperty.holiday]: '休日でも一緒だよ^ ^',
    [TagSlugProperty.mammoth]: '紛れもない大御所',
    [TagSlugProperty.urgent_recruitment]: '見学だけでもお願いします',
    [TagSlugProperty.mystery]: '得体のしれない怪団体',
    [TagSlugProperty.mine]: '峰キャンパスで活動',
    [TagSlugProperty.yoto]: '陽東キャンパスで活動',
    [TagSlugProperty.online]: '',
  },
  [namespaceType.TextByTagSlugProperty]: {
    [TagSlugProperty.sport]:
      '誰かと一緒に体を動かすことで、心身ともに充実させましょう。学業の傍ら、楽しく血行を改善してみませんか？',
    [TagSlugProperty.music]:
      '気持ちを音に乗せたい、誰かに笑顔を届けたい…音にかける思いは人それぞれです。あなただけの音楽、奏でてみませんか？',
    [TagSlugProperty.culture]:
      '何かを考えたり、感じたり。頭と心で、しめやかな彩りを持った活動を楽しみましょう。我々人間の文化に興味がある方、種族問わず募集中。',
    [TagSlugProperty.nature]:
      '人社会のことばかり話される昨今。今一度、同じ地球に住まう他者に目を向けてみませんか。',
    [TagSlugProperty.community]:
      '町を見直し、考え、盛り上げる。地域の人を筆頭に、色んな人の笑顔をつくる経験、してみませんか。',
    [TagSlugProperty.international]:
      '多様性が叫ばれるのを聞いているだけではつまらない、とは思いませんか？言語すら違う相手と通じ合うことで、自分の幅を１つ広げましょう。',
    [TagSlugProperty.incare]:
      '他大学の学生とも交流を持ち、自分を広げましょう。他のサークルでは味わえない刺激、欲しくありませんか？',
    [TagSlugProperty.programming]:
      '作業が機械で自動化されていく時代、需要が多い知識を身に着けてみませんか？まずはサークルで、自分の需要を実現する術を体験してみましょう。',
    [TagSlugProperty.volunteer]:
      '見知らぬ誰かを笑顔にするために、今日も活動します。かつてあなたを笑顔にした誰かに、なってみませんか。',
    [TagSlugProperty.active_activity]:
      '活動の多い団体です。ブラックなのか、楽しくてつい、なのか、それは我々にもわかりかねます。',
    [TagSlugProperty.loose]:
      '活動にあまり厳しくない団体です。勉強だけで体力を使い切ってしまっても大丈夫。わずかな余力で、学生生活に花を添えてみませんか？',
    [TagSlugProperty.monday]: '',
    [TagSlugProperty.tuesday]: '',
    [TagSlugProperty.wednesday]: '',
    [TagSlugProperty.thursday]: '',
    [TagSlugProperty.friday]: '',
    [TagSlugProperty.only_monday]: '',
    [TagSlugProperty.only_tuesday]: '',
    [TagSlugProperty.only_wednesday]: '',
    [TagSlugProperty.only_thursday]: '',
    [TagSlugProperty.only_friday]: '',
    [TagSlugProperty.holiday]:
      '休日だろうと駆り出される団体です。果たしてそこは天国か地獄か。',
    [TagSlugProperty.mammoth]:
      '活動人数が50人を超える団体です。賑やかなのが好きな人には推奨します。名前を覚えるのが苦手な人には非推奨です。',
    [TagSlugProperty.urgent_recruitment]:
      '切実に新入生を望んでいる団体です。賑やかさ、または活動面で人手不足ということではありますが、その分だけ好待遇です。ちょっとだけでも、覗いてみませんか？',
    [TagSlugProperty.mystery]:
      '謎に包まれたミステリアスな団体です。どんな人がいて、何をしているのか…。さあ、覗いてみましょう。',
    [TagSlugProperty.mine]: '',
    [TagSlugProperty.yoto]: '',
    [TagSlugProperty.online]: '',
  },
  [AnnouncementType._type]: {
    [AnnouncementType.MAINTENANCE]: 'メンテナンスのお知らせ',
    [AnnouncementType.UPDATE_FEATURE]: 'アップデートのお知らせ',
    [AnnouncementType.BUG]: '不具合に関して',
    [AnnouncementType.NEW_CIRCLE]: '新着サークル追加！',
    [AnnouncementType.EVENT]: 'イベントのお知らせ',
    [AnnouncementType.QUESTIONNAIRE]: 'アンケートのお知らせ',
    [AnnouncementType.ADVERTISE]: '広告のお知らせ',
    [AnnouncementType.UU_YELL]: 'uu-yellより',
  },
}

export const __ = (key: string, namespace?: string): string => {
  try {
    if (!namespace) {
      const v = ja[key]

      if (!v) {
        return ''
      }

      if (v && typeof v === 'string') {
        return v
      }

      return key
    }

    const v = ja[namespace][key]

    if (!v) {
      return ''
    }

    if (v && typeof v === 'string') {
      return v
    }

    return key
  } catch (e) {
    return key
  }
}
