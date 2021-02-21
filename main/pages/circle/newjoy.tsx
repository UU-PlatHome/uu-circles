import { GetServerSideProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { getTodayCircleNewJoy } from '@/infra/api/circleNewJoy'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import Link from 'next/link'
import { IndexCircleNewJoyList } from '@/components/organisms/List/IndexCircleNewJoyList'
type Props = {
  errorCode?: number

  futureCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
  todayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
}
const Page: NextPage<Props> = ({ futureCircleNewJoys, todayCircleNewJoys }) => {
  console.log('TOP')
  console.log(todayCircleNewJoys)
  return (
    <div>
      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl py-8">今日の新歓</h1>
            <div className="pb-16">
              <div className="pb-16">
                <h2 className="font-bold text-lg md:text-center pl-1 mb-3">
                  今日開催予定の新歓イベント
                </h2>
                {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                  <IndexCircleNewJoyList
                    // slug={circle.slug}
                    circleNewJoys={todayCircleNewJoys}
                  />
                ) : (
                  <p>今日の新歓はありません</p>
                )}
              </div>
              <section className=" border-2 border-gray-700 rounded-xl grid grid-cols-5 mx-3 bg-white px-2 py-2 pl-6">
                <div className="col-span-4">
                  <h2 className="font-bold text-xl">U-lab新歓説明会</h2>
                  <div className="border-b-2  grid grid-cols-8">
                    <p className="text-gray-600 text-xs col-span-1">場所</p>
                    <p className="text-gray-600 text-xs col-span-6 text-center"></p>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-b-2  grid grid-cols-8">
                      <p className="text-gray-600 text-xs col-span-2 mr-1">
                        日時
                      </p>
                      <p className="text-gray-600 text-xs col-span-6 text-center">
                        2021/3/5
                      </p>
                    </div>
                    <div className="border-b-2  grid grid-cols-8 ml-1">
                      <p className="text-gray-600 text-xs col-span-2">場所</p>
                      <p className="text-gray-600 text-xs col-span-6 text-center">
                        12:00-15:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* 詳細 */}
                <div className="col-span-1 rounded-full bg-black text-white w-10 h-10 flex items-center justify-center mx-auto mt-3">
                  <Link href="mx-auto">
                    <a className="text-sm text-center mx-auto">詳細</a>
                  </Link>
                </div>
              </section>
            </div>

            <div className="pb-16">
              <h2 className="font-bold text-lg md:text-center pl-1 mb-3 ">
                開催日時が近い新歓イベント
              </h2>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const {
    futureCircleNewJoys,
    todayCircleNewJoys,
  } = await getTodayCircleNewJoy()

  return {
    props: {
      futureCircleNewJoys,
      todayCircleNewJoys,
    },
  }
}

export default Page
