import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleNewJoyForm } from '@/components/organisms/form/CircleNewJoy/CreateCircleNewJoyForm'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { showCircle } from '@/infra/api/circle'
import { createCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import {
  isRegisterCircleNewJoyRequestValidationError,
  RegisterCircleNewJoyRequest,
} from '@/lib/types/api/RegisterCircleNewJoyRequest'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const privateNewjoyLink = useStringInput('')
  const placeOfActivity = useStringInput(PlaceOfActivity.DISCORD)
  const placeOfActivityDetail = useStringInput('')
  const publishFrom = useDateInput(null, 'YYYY/MM/DD', 'YYYY-MM-DD')
  const startDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const endDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const release = useBooleanInput(true)

  const { data: circle } = useSWR([`/admin/api/circle/${id}`, Number(id)], () =>
    showCircle(Number(id))
  )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createCircleNewJoy(Number(id), {
      type: 'RegisterCircleNewJoyRequest',
      title: title.value,
      description: description.value,
      url: url.value,
      privateNewjoyLink: privateNewjoyLink.value,
      placeOfActivity: placeOfActivity.value,
      placeOfActivityDetail: placeOfActivityDetail.value,
      publishFrom: publishFrom.toFormatApi,
      startDate: startDate.toFormatApi,
      endDate: endDate.toFormatApi,
      release: release.toBoolean,
    } as RegisterCircleNewJoyRequest)

    if (data && isRegisterCircleNewJoyRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      description.setErrors(data.errors.description)
      url.setErrors(data.errors.url)
      privateNewjoyLink.setErrors(data.errors.privateNewjoyLink)
      placeOfActivity.setErrors(data.errors.placeOfActivity)
      placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
      publishFrom.setErrors(data.errors.publishFrom)
      startDate.setErrors(data.errors.startDate)
      endDate.setErrors(data.errors.endDate)
      release.setErrors(data.errors.release)
      setIsOpen(false)

      return
    }

    setIsOpen(false)
    await router.push(`/circle/${id}/newjoy`)
  }

  return (
    <div>
      <Head>
        <title>新歓作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="新歓作成">
          <div className="border-2 border-gray-800 px-2 py-4">
            {circle ? (
              <CreateCircleNewJoyForm
                onSubmit={onSubmit}
                circle={circle}
                form={{
                  title,
                  description,
                  url,
                  privateNewjoyLink,
                  placeOfActivity,
                  placeOfActivityDetail,
                  publishFrom,
                  startDate,
                  endDate,
                  release,
                }}
              />
            ) : (
              ''
            )}
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
