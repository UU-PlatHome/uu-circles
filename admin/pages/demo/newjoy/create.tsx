import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateDemoCircleNewJoyForm } from '@/components/organisms/form/DemoCircleNewJoy/CreateDemoCircleNewJoyForm'
import { useBooleanInput, useDateInput, useStringInput } from '@/hooks/useInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createDemoCircleNewJoy } from '@/infra/api/demo_cirecle_new_joy'
import { PlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { isRegisterDemoCircleNewJoyRequestValidationError } from '@/lib/types/api/RegisterDemoCircleNewJoyRequest'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const CreatePage: NextPage = () => {
  const router = useRouter()
  const { isMd } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  const title = useStringInput('')
  const description = useStringInput('')
  const url = useStringInput('')
  const placeOfActivity = useStringInput(PlaceOfActivity.DISCORD)
  const placeOfActivityDetail = useStringInput('')
  const startDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const endDate = useDateInput(null, 'YYYY/MM/DD HH:mm', 'YYYY-MM-DD HH:mm')
  const published = useBooleanInput(true)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)

    const data = await createDemoCircleNewJoy(1, {
      type: 'RegisterDemoCircleNewJoyRequest',
      title: title.value,
      description: description.value,
      url: url.value,
      placeOfActivity: placeOfActivity.value,
      placeOfActivityDetail: placeOfActivityDetail.value,
      startDate: startDate.toFormatApi,
      endDate: endDate.toFormatApi,
      published: published.toBoolean,
    })

    if (data && isRegisterDemoCircleNewJoyRequestValidationError(data)) {
      title.setErrors(data.errors.title)
      description.setErrors(data.errors.description)
      url.setErrors(data.errors.url)
      placeOfActivity.setErrors(data.errors.placeOfActivity)
      placeOfActivityDetail.setErrors(data.errors.placeOfActivityDetail)
      startDate.setErrors(data.errors.startDate)
      endDate.setErrors(data.errors.endDate)
      published.setErrors(data.errors.published)
      setIsOpen(false)

      return
    }

    setIsOpen(false)
    await router.push(`/demo/newjoy`)
  }

  return (
    <div>
      <Head>
        <title>デモ新歓作成</title>
      </Head>

      {isMd ? <BaseHeader /> : ''}

      {isOpen ? <SubmitLoading isOpen={isOpen} /> : ''}

      <BaseContainer>
        <BaseWrapper title="新歓作成">
          <div className="border-2 border-gray-800 px-2 py-4">
            <CreateDemoCircleNewJoyForm
              onSubmit={onSubmit}
              circle={{
                name: 'aaa',
                shortName: 'aaa',
              }}
              form={{
                title,
                description,
                url,
                placeOfActivity,
                placeOfActivityDetail,
                startDate,
                endDate,
                published,
              }}
            />
          </div>
        </BaseWrapper>
      </BaseContainer>
    </div>
  )
}

export default CreatePage
