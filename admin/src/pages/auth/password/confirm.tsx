import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BlueButton } from '@/src/components/atoms/buttons/BlueButton'
import { GreenButton } from '@/src/components/atoms/buttons/GreenButton'
import { SimplePasswordTextField } from '@/src/components/atoms/form/SimplePasswordTextField'
import { AuthHeader } from '@/src/components/layouts/AuthHeader'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useInput } from '@/src/hooks/useInput'
import { resetPassword } from '@/src/lib/infra/api/auth'
import { isResetPasswordAdminRequestValidationError } from '@/src/lib/types/api/ResetPasswordAdminRequest'

const PasswordConfirmPage: NextPage = () => {
  const password = useInput('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const { token: queryToken, email: queryEamil } = router.query
  const email = Array.isArray(queryEamil) ? queryEamil[0] : queryEamil
  const token = Array.isArray(queryToken) ? queryToken[0] : queryToken

  if (authContext.accessToken) {
    router.push('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const data = await resetPassword({
      type: 'ResetPasswordAdminRequest',
      email,
      token,
      password: password.value,
    })

    if (isResetPasswordAdminRequestValidationError(data)) {
      password.setError(
        data.errors.password && Array.isArray(data.errors.password)
          ? data.errors.password[0]
          : ''
      )

      if (data.errors.email && Array.isArray(data.errors.email)) {
        setError('エラーが発生しました。')
      }

      if (data.errors.token && Array.isArray(data.errors.token)) {
        setError('エラーが発生しました。')
      }

      return
    }

    if (data && data.type === 'success') {
      setSuccess(true)
      return
    }

    setError('エラーが発生しました。')
  }

  return (
    <div>
      <Head>
        <title>新しいパスワード</title>
      </Head>

      <AuthHeader />

      <div className="xl:container">
        <div className="mx-auto mt-16 max-w-screen-md">
          <div className="rounded border-2 border-white p-4">
            <h1 className="mb-4 text-center text-2xl text-white">
              新しいパスワード
            </h1>

            {error ? (
              <div className="mb-4 p-4">
                <p className="text-lg text-white">
                  <FontAwesomeIcon icon={faExclamationTriangle} color="red" />{' '}
                  {error}
                </p>
              </div>
            ) : (
              ''
            )}

            {!success ? (
              <form onSubmit={onSubmit}>
                <div className="mb-4 px-4">
                  <SimplePasswordTextField
                    label="新しいパスワード"
                    id="password"
                    name="password"
                    {...password}
                  />
                </div>

                <div className="text-center">
                  <BlueButton type="submit">パスワードを変更</BlueButton>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-white">
                  パスワードを変更しました。ログイン画面へ進んでください。
                </p>

                <div className="text-center">
                  <GreenButton href="/auth/PasswordConfirmPage">
                    ログインへ進む
                  </GreenButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordConfirmPage
