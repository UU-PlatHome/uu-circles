//曜日を取得する関数
import dayjs from 'dayjs'

/**
 * 曜日を返す
 */
export const getDOW = (
  originStartDate: dayjs.Dayjs | Date | string
): string => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)
  const DOWList = ['日', '月', '火', '水', '木', '金', '土'] //dayjsは日曜始まり
  const DOW = DOWList[date.day()]
  return DOW
}

//月を返す
export const getMonth = (originDate: dayjs.Dayjs | Date | string): string => {
  if (!originDate) {
    return '未定'
  }
  const date = dayjs.isDayjs(originDate) ? originDate : dayjs(originDate)

  return date.format('M')
}

//日にちを返す
export const getDay = (originDate: dayjs.Dayjs | Date | string): string => {
  if (!originDate) {
    return '未定'
  }
  const date = dayjs.isDayjs(originDate) ? originDate : dayjs(originDate)

  return date.format('D')
}

//2021/2/4などを返す
export const getDate = (originDate: dayjs.Dayjs | Date | string): string => {
  if (!originDate) {
    return '未定'
  }
  const date = dayjs.isDayjs(originDate) ? originDate : dayjs(originDate)

  return date.format('YYYY/MM/DD')
}

/**
 * 18:00-21:00などを返す
 * @param originStartDate
 * @param originEndDate
 * @returns
 */
export const getTime = (
  originStartDate: dayjs.Dayjs | Date | string,
  originEndDate: dayjs.Dayjs | Date | string
): string => {
  if (originStartDate && originEndDate) {
    return `${getTimeFormat(originStartDate)}-${getTimeFormat(originEndDate)}`
  }

  if (originStartDate) {
    return `${getTimeFormat(originStartDate)}-`
  }

  if (originEndDate) {
    return `-${getTimeFormat(originEndDate)}`
  }

  return '未定'
}

/**
 * 18:00や21:00を返す
 * ただし、00:00 ~ 02:59 のとき、24:00 ~ 26:59にする
 *
 * @param originDate
 * @returns
 */
export const getTimeFormat = (
  originDate: dayjs.Dayjs | Date | string
): string | null => {
  if (!originDate) {
    return null
  }

  const date = dayjs.isDayjs(originDate) ? originDate : dayjs(originDate)

  const hh = date.hour()
  const formatHh = 0 <= hh && hh <= 2 ? hh + 24 : hh

  return `${formatHh}:${date.format('mm')}`
}

/**
 * 2021年2月26日 18:00-21:00などを返す
 *
 * @param originStartDate
 * @param originEndDate
 * @returns
 */
export const getFullJPDate = (
  originStartDate: Date | string,
  originEndDate: Date | string
): string => {
  if (!originStartDate) {
    return '未定'
  }
  const date = dayjs(originStartDate)

  const fullDate = date.format('YYYY年M月D日')

  return fullDate + '　' + getTime(originStartDate, originEndDate)
}

export const isDate = (strDate: string) => {
  // 空文字は無視
  if (strDate === '') {
    return true
  }

  // 年/月/日の形式のみ許容する
  if (!strDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
    return false
  }

  // 日付変換された日付が入力値と同じ事を確認
  // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
  const date = new Date(strDate)
  const splitDate = strDate.split('/')
  if (
    Number(date.getFullYear().toString()) !== Number(splitDate[0]) ||
    Number(date.getMonth().toString()) !==
      Number((Number(splitDate[1]) - 1).toString()) ||
    Number(date.getDate().toString()) !== Number(splitDate[2])
  ) {
    return false
  }

  return true
}

export const isDatetime = (strDatetime: string) => {
  // 空文字は無視
  if (strDatetime === '') {
    return true
  }

  // 年/月/日 時:分の形式のみ許容する
  if (
    !strDatetime.match(
      /^\d{4}\/\d{1,2}\/\d{1,2} ([01]?[0-9]|2[0-3]):([0-5][0-9])$/
    )
  ) {
    return false
  }

  // 日付変換された日付が入力値と同じ事を確認
  // new Date()の引数に不正な日付が入力された場合、相当する日付に変換されてしまうため
  const date = new Date(strDatetime)
  const strDatetimeSplit = strDatetime.split('/')
  const strDateDate = strDatetimeSplit[2].split(' ')[0]
  const strTime = strDatetimeSplit[2].split(' ')[1].split(':')
  const strDatetimeHour = strTime[0]
  const strDatetimeMinute = strTime[1]
  if (
    date.getFullYear() !== Number(strDatetimeSplit[0]) ||
    date.getMonth() !== Number(strDatetimeSplit[1]) - 1 ||
    date.getDate() !== Number(strDateDate) ||
    date.getHours() !== Number(strDatetimeHour) ||
    date.getMinutes() !== Number(strDatetimeMinute)
  ) {
    return false
  }

  return true
}
