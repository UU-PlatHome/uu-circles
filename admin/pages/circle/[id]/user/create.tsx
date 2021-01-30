
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { createCircleUser } from '@/infra/api/circle_user'
import { isRegisterCircleUserRequestValidationError, RegisterCircleUserRequest } from '@/lib/types/api/RegisterCircleUserRequest'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id } = router.query

    const username = useInput('')
    const displayName = useInput('')
    const email = useInput('')

    const onSubmit = async (event) => {
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
            username.setError(data.errors.username && Array.isArray(data.errors.username) ? data.errors.username[0] : '')
            displayName.setError(data.errors.displayName && Array.isArray(data.errors.displayName) ? data.errors.displayName[0] : '')
            email.setError(data.errors.email && Array.isArray(data.errors.email) ? data.errors.email[0] : '')

            return
        }

        await router.push('/circle')
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/5">
                        <BaseSidebar />
                    </div>

                    <div className="w-full lg:w-4/5">
                        <div className="py-10">
                            <div className="flex justify-between mb-8">
                                <h1 className="text-2xl text-gray-100">
                                    サークルアカウント新規作成
                                </h1>
                            </div>

                            <div className="border-2 border-gray-800 px-2 py-4">
                                <form onSubmit={onSubmit}>
                                    <BaseTextField
                                        label="ユーザー名"
                                        name="username"
                                        id="username"
                                        note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                        { ...displayName }
                                    />

                                    <BaseTextField
                                        label="表示名"
                                        name="display_name"
                                        id="display_name"
                                        placeholder="u-lab"
                                        note="入力がない場合は、自動で決まります"
                                        { ...username }
                                    />

                                    <BaseTextField
                                        label="メールアドレス"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="example@example.com"
                                        { ...email }
                                    />

                                    <div className="flex justify-center mt-8">
                                        <GreenButton type="submit">
                                            進む
                                        </GreenButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default CreatePage