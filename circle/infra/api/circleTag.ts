import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { CreateOrUpdateCircleTagRequestValidationError } from '@/lib/types/api/CreateOrUpdateCircleTagRequest'
import { Circle } from '@/lib/types/model/Circle'
import { AxiosError } from 'axios'
import { axiosInstance } from '.'

export const getCircleTag = async (circleId: number) => {
  type AxiosResponse = {
    circle: Circle
    circleTag: CircleTagModel[]
  }
  const { data } = await axiosInstance.get<AxiosResponse>(
    `/circle/api/circle/${circleId}/tag`
  )

  return {
    circle: data.circle,
    circleTag: data.circleTag,
  }
}

export const createOrUpdateCircleTag = async (
  circleId: number,
  circleTag: CircleTagModel[]
) => {
  try {
    await axiosInstance.post(`/circle/api/circle/${circleId}/tag`, {
      circleTag,
    })

    return {
      type: 'success',
    } as {
      type: 'success'
    }
  } catch (_e) {
    const e = _e as AxiosError<CreateOrUpdateCircleTagRequestValidationError>

    if (e.response && e.response.status === 422) {
      return {
        ...e.response.data,
        type: 'CreateOrUpdateCircleTagRequestValidationError',
      } as CreateOrUpdateCircleTagRequestValidationError
    }

    console.error(e)
  }
}
