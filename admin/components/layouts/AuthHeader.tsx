import Link from 'next/link'
import React from 'react'
import { BaseContainer } from './BaseContainer'

const AuthHeader: React.FC = () => {
    return (
        <div className="border-b-2 border-gray-100 shadow">
            <BaseContainer>
                <div className="h-14 flex items-center justify-between px-4 ">
                    <div className="flex items-center">
                        <h1 className="text-white text-xl">UU-Circles</h1>
                    </div>

                    <Link href="/login">
                        <a className="text-white hover:underline">ログイン</a>
                    </Link>
                </div>
            </BaseContainer>
        </div>
    )
}

export { AuthHeader }
