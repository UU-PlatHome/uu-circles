import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import {
  getTodayCircleNewJoy,
  TodayCircleNewJoy,
} from '@/infra/api/circleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { IndexCircleNewJoyListForNoSlug } from '@/components/organisms/List/IndexCircleNewJoyListForNoSlug'
import { BaseHead } from '@/components/layouts/BaseHead'
import Error from 'next/error'

type Props = {
  errorCode?: number
  futureCircleNewJoys?: TodayCircleNewJoy[]
  todayCircleNewJoys?: TodayCircleNewJoy[]
}
const Page: NextPage<Props> = ({
  errorCode,
  futureCircleNewJoys,
  todayCircleNewJoys,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div>
      <BaseHead title="今日の新歓" />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            <h1 className="text-2xl py-8 md:py-20 md:text-center">
              今日の新歓
            </h1>

            <h2 className="md:hidden font-bold text-lg md:text-center pl-1 mb-3">
              今日開催予定の新歓イベント
            </h2>

            <div className="pb-16">
              {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                <IndexCircleNewJoyListForNoSlug
                  circleNewJoys={todayCircleNewJoys}
                />
              ) : (
                <p className="text-center">今日の新歓はありません</p>
              )}
            </div>

            <div className="pb-16">
              <section>
                <h2 className="font-bold md:font-normal text-lg md:text-2xl pl-1 mb-4 md:mb-0 md:py-20 md:text-center">
                  開催日時が近い新歓イベント
                </h2>
                <IndexCircleNewJoyListForNoSlug
                  circleNewJoys={futureCircleNewJoys}
                />
              </section>
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const {
      futureCircleNewJoys,
      todayCircleNewJoys,
    } = await getTodayCircleNewJoy()

    return {
      props: {
        futureCircleNewJoys,
        todayCircleNewJoys,
      },
      revalidate: 180,
    }
  } catch (e) {
    return { props: { errorCode: 500 } }
  }
}

export default Page
