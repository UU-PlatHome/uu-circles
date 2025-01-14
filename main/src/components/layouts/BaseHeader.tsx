import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { FC, FormEvent } from 'react'
import { YellowButton } from '@/src/components/atoms/button/YellowButton'
import { SearchTextField } from '@/src/components/atoms/form/SearchTextField'
import { useStringInput } from '@/src/hooks/useInput'
import Color from '@/src/styles/colors'

type Props = {
  onClick?(): void
}
const BaseHeader: FC<Props> = ({ onClick }) => {
  const router = useRouter()
  const name = useStringInput('')
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (name.value) {
      router.push(`/circle/search/[name]`, `/circle/search/${name.value}`)
    } else {
      router.push(`/circle`)
    }
  }

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="mx-auto" style={{ maxWidth: 700 }}>
        <div
          id="site_title"
          className="flex justify-between items-center p-4 sm:px-0 xl:container"
        >
          <div className="flex items-center">
            <div className="pr-4 md:hidden">
              <button onClick={onClick}>
                <FontAwesomeIcon
                  size="lg"
                  color={Color.gray[400]}
                  icon={faBars}
                />
              </button>
            </div>

            <h1 className="text-base md:text-lg">
              {router.pathname === '/' ? (
                <p>UU-Circles</p>
              ) : (
                <Link href="/">
                  <a>UU-Circles</a>
                </Link>
              )}
            </h1>

            <div className="hidden ml-4 md:block">
              <form
                onSubmit={onSubmit}
                role="search"
                aria-label="サークルを検索"
              >
                <SearchTextField id="search" name="search" {...name} />
              </form>
            </div>
          </div>

          <div className="flex items-center">
            <p className="mr-4 text-xs sm:text-sm">
              <Link href="/circle">
                <a>
                  <span className="hidden sm:inline">サークルを</span>みつける
                </a>
              </Link>
            </p>

            <YellowButton href="/guide/to-new-students">新入生へ</YellowButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BaseHeader }
