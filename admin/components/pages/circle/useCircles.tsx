import { useEffect, useState } from "react"
import { useBooleanOrNullInput, useStringInput } from "@/hooks/useInput"
import { usePageInput } from "@/hooks/usePageInput"
import { CircleType } from "@/lib/enum/api/CircleType"
import { Circle } from "@/lib/types/model/Circle"
import { hiraToKana } from "@/lib/utils/String"

export const useCircles = ({
  originalCircles,
}: {
  originalCircles: Circle[]
}) => {
  const [filteredCircles, setFilteredCircles] = useState<Circle[]>([])
  const [nowPageCircles, setNowPageCircles] = useState<Circle[]>([])
  const searchName = useStringInput('')
  const searchRelease = useBooleanOrNullInput(null)
  const searchCircleType = useStringInput('')

  const page = usePageInput({
    initialMaxPage: Math.ceil(
      originalCircles ? originalCircles.length / 10 : 1
    ),
    pageSize: 10,
  })

  useEffect(() => {
    const search = {
      name: searchName.value,
      release: searchRelease.toBooleanOrNull,
      circleType: searchCircleType.value,
    }

    setFilteredCircles(searchCircle({ circles: originalCircles, search }))
    page.updatePage(1)
  }, [
    originalCircles,
    searchName.value,
    searchRelease.toBooleanOrNull,
    searchCircleType.value,
  ])

  useEffect(() => {
    page.setMaxPage(Math.ceil(filteredCircles.length / 10))
  }, [filteredCircles, page])

  useEffect(() => {
    setNowPageCircles(filteredCircles.slice(
      (page.page - 1) * page.pageSize,
      page.page * page.pageSize
    ))
  }, [
    filteredCircles,
    page.page,
    page.pageSize
  ])

  return {
    searchName,
    searchRelease,
    searchCircleType,
    nowPageCircles,
    page,
  }
}

const searchCircle = ({
  circles,
  search: {
    name,
    release,
    circleType
  }
}: {
  circles: Circle[]
  search: {
    name?: string,
    release?: boolean | null | 'null',
    circleType?: string
  }
}): Circle[] => {
  if (!circles) {
    return []
  }

  const searchedCirclesByName = searchCircleByName({ circles, search: { name } })
  const searchedCirclesByRelease = searchCircleByRelease({
    circles: searchedCirclesByName,
    search: { release }
  })
  const searchedCirclesByCircleType = searchCircleByCircleType({
    circles: searchedCirclesByRelease,
    search: { circleType }
  })

  return searchedCirclesByCircleType
}

const searchCircleByName = ({
  circles,
  search: {
    name
  }
}: {
  circles: Circle[]
  search: {
    name?: string
  }
}): Circle[] => {
  if (!name) {
    return circles
  }

  return circles.filter(c => {
    const _name = hiraToKana(name)

    if (c.name && hiraToKana(c.name).includes(_name)) {
      return true
    }

    if (c.shortName && hiraToKana(c.shortName).includes(_name)) {
      return true
    }

    if (c.nameKana && hiraToKana(c.nameKana).includes(_name)) {
      return true
    }

    if (c.prefixName && hiraToKana(c.prefixName).includes(_name)) {
      return true
    }

    if (c.slug && c.slug.includes(_name)) {
      return true
    }

    if (c.description && c.description.includes(_name)) {
      return true
    }

    return false
  })
}

const searchCircleByRelease = ({
  circles,
  search: {
    release
  }
}: {
  circles: Circle[]
  search: {
    release?: null | 'null' | boolean | 'true' | 'false'
  }
}): Circle[] => {
  if (!release && release !== false /** release === null */) {
    return circles
  }

  if (release === 'null') {
    return circles
  }

  return circles.filter(c => {
    if (release === 'true') {
      return c.release === true
    }

    if (release === 'false') {
      return c.release === false
    }

    if (c.release === release) {
      return true
    }

    return false
  })
}

const searchCircleByCircleType = ({
  circles,
  search: {
    circleType
  }
}: {
  circles: Circle[]
  search: {
    circleType?: string
  }
}): Circle[] => {
  if (!circleType) {
    return circles
  }

  return circles.filter(c => {
    if (
      circleType === CircleType.OFFICIAL_ORGANIZATION &&
      c.circleType === CircleType.OFFICIAL_ORGANIZATION
    ) {
      return true
    }

    if (
      circleType === CircleType.SENDING_ORGANIZATION &&
      c.circleType === CircleType.SENDING_ORGANIZATION
    ) {
      return true
    }

    if (
      circleType === CircleType.STUDENT_GROUP &&
      c.circleType === CircleType.STUDENT_GROUP
    ) {
      return true
    }

    if (
      circleType === CircleType.UNOFFICIAL_ORGANIZATION &&
      c.circleType === CircleType.UNOFFICIAL_ORGANIZATION
    ) {
      return true
    }

    if (
      circleType === '不明' &&
      ['', null].includes(c.circleType)
    ) {
      return true
    }

    return false
  })
}
