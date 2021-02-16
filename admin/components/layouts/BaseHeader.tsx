import { useMediaQuery } from '@/hooks/useMediaQuery'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { BaseContainer } from './BaseContainer'

type Props = {
    onClick?(): void
}
const BaseHeader: React.FC<Props> = ({ onClick }) => {
    const {isMd} = useMediaQuery()

    return (
        <div className="border-b-2 border-gray-100 shadow">
            <BaseContainer>
                <div className="h-14 flex items-center justify-between px-4 ">
                    <div className="flex items-center">
                        {!isMd ? (
                            <div className="pr-2">
                                <button onClick={onClick}>
                                    <FontAwesomeIcon size="lg" color="#fff" icon={faBars} />
                                </button>
                            </div>
                        ): ''}

                        <Link href="/">
                            <a className="text-white text-xl hover:underline">
                                UU-Circles
                            </a>
                        </Link>
                    </div>

                    <Link href="/circle">
                        <a className="text-white hover:underline">
                            サークル一覧
                        </a>
                    </Link>
                </div>
            </BaseContainer>
        </div>
    )
}

export { BaseHeader }