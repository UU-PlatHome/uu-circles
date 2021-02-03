import { BaseContainer } from '@/components/layouts/BaseContainer'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useContext } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { createCircleUser } from '@/infra/api/circle_user'
import { isRegisterCircleUserRequestValidationError, RegisterCircleUserRequest } from '@/lib/types/api/RegisterCircleUserRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { CreateCircleUserForm } from '@/components/organisms/form/CircleUser/CreateCircleUser'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id } = router.query

    const username = useStringInput('')
    const displayName = useStringInput('')
    const email = useStringInput('')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = await createCircleUser(
            Number(id),
            {
                type: 'RegisterCircleUserRequest',
                username: username.value,
                displayName: displayName.value,
                email: email.value
            } as RegisterCircleUserRequest, 
            authContext.accessToken
        )

        if (isRegisterCircleUserRequestValidationError(data)) {
            username.setErrors(data.errors.username)
            displayName.setErrors(data.errors.displayName)
            email.setErrors(data.errors.email)

            return
        }

        await router.push('/circle')
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="サークルアカウント新規作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <CreateCircleUserForm
                            onSubmit={onSubmit}
                            form={{
                                username,
                                displayName,
                                email,
                            }}
                        />
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage