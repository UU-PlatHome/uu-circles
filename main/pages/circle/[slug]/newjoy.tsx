import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Circle } from '@/lib/types/model/Circle'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { IndexCircleNewJoyListPC } from '@/components/organisms/List/IndexCircleNewJoyListPC'
import { IndexCircleNewJoyListSP } from '@/components/organisms/List/IndexCircleNewJoyListSP'
import { getCircleNewJoyBySlug } from '@/infra/api/circleNewJoy'
import { CircleNewJoy } from '@/lib/types/model/CircleNewJoy'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { YellowButton } from '@/components/atoms/button/YellowButton'
import { BaseHead } from '@/components/layouts/BaseHead'
import { InformationCircleBesideNewJoyPC } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoyPC'
import { InformationCircleBesideNewJoySP } from '@/components/organisms/ShowCircle/InformationCircleBesideNewJoySP'
import { PageNotFoundError } from '@/infra/api/error'
import Error from 'next/error'

type Props = {
  /** サークル */ circle?: Circle
  errorCode?: number
  /** 新歓開催済み */ pastCircleNewJoys?: CircleNewJoy[]
  /** 新歓開催前 */ futureCircleNewJoys?: CircleNewJoy[]
  /** 現在開催中 */ nowCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓 */ todayCircleNewJoys?: CircleNewJoy[]
  /** 今日の新歓(全て) */ allTodayCircleNewJoys?: {
    slug: string
    circleNewJoy: CircleNewJoy
  }[]
}
const Page: NextPage<Props> = ({
  errorCode,
  circle,
  pastCircleNewJoys,
  futureCircleNewJoys,
  nowCircleNewJoys,
  todayCircleNewJoys,
}) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  const { isMd } = useMediaQuery() //画面サイズによってレイアウト分けるため
  return (
    <div>
      <BaseHead title={`${circle.name}の新歓`} />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <BaseContainer>
            {isMd ? (
              //PC
              <div style={{ width: 750 }}>
                <h1 className="text-2xl text-center py-20">
                  {circle.name}の新歓
                </h1>
                <div className="grid grid-cols-7">
                  <div className="col-span-5">
                    {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                      <div className="pb-16">
                        <h2 className="text-left text-lg  pl-6 mb-3">開催中</h2>

                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={nowCircleNewJoys}
                        />
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="pb-16">
                      <h2 className="text-left text-lg pl-6 mb-3">
                        今日の新歓
                      </h2>
                      {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                        <IndexCircleNewJoyListPC
                          slug={circle.slug}
                          circleNewJoys={todayCircleNewJoys}
                        />
                      ) : (
                        <p className="text-center">今日の新歓はありません</p>
                      )}
                    </div>

                    <div className="pb-16">
                      <h2 className="text-left text-lg pl-6 mb-3">開催予定</h2>

                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={futureCircleNewJoys}
                      />
                    </div>

                    <div className="pb-16">
                      <h2 className="text-left text-lg pl-6 mb-3">開催済み</h2>

                      <IndexCircleNewJoyListPC
                        slug={circle.slug}
                        circleNewJoys={pastCircleNewJoys}
                      />
                    </div>
                  </div>

                  <div className="col-span-2  mx-1">
                    <h2 className="text-xl">主催サークル</h2>

                    <InformationCircleBesideNewJoyPC circle={circle} />
                    <Link href="/circle/newjoy" as={'/circle/newjoy'}>
                      <a>
                        {/* <div
                        className="rounded-md text-white bg-yellow-500 text-center px-2 py-2 mt-6"
                        style={{ width: 222 }}
                      > */}
                        <div className="my-6 w-full">
                          <YellowButton width={'222px'}>
                            <div className="py-2">
                              <h4 className="text-xs">
                                他のサークルの新歓も見る
                              </h4>
                              <h3 className="text-sm font-bold">
                                今日の新歓をチェック！
                              </h3>
                            </div>
                          </YellowButton>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl py-8">新歓イベント日程詳細</h1>
                {nowCircleNewJoys && nowCircleNewJoys.length > 0 ? (
                  <div className="pb-16">
                    <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                      開催中
                    </h2>

                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={nowCircleNewJoys}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    今日の新歓
                  </h2>
                  {todayCircleNewJoys && todayCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={todayCircleNewJoys}
                    />
                  ) : (
                    <p className="text-center">今日の新歓はありません</p>
                  )}
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    開催予定
                  </h2>
                  {futureCircleNewJoys && futureCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={futureCircleNewJoys}
                    />
                  ) : (
                    <p className="text-center">開催予定の新歓はありません</p>
                  )}
                </div>
                <div className="pb-16">
                  <h2 className="font-bold text-lg md:text-center pl-4 mb-3">
                    開催済み
                  </h2>
                  {pastCircleNewJoys && pastCircleNewJoys.length > 0 ? (
                    <IndexCircleNewJoyListSP
                      slug={circle.slug}
                      circleNewJoys={pastCircleNewJoys}
                    />
                  ) : (
                    <p className="text-center">開催済みの新歓はありません</p>
                  )}
                </div>

                <InformationCircleBesideNewJoySP circle={circle} />
              </div>
            )}
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    }
  }

  try {
    const {
      circle,
      pastCircleNewJoys,
      futureCircleNewJoys,
      nowCircleNewJoys,
      todayCircleNewJoys,
      allTodayCircleNewJoys,
    } = await getCircleNewJoyBySlug(params.slug)

    return {
      props: {
        circle,
        pastCircleNewJoys,
        futureCircleNewJoys,
        nowCircleNewJoys,
        todayCircleNewJoys,
        allTodayCircleNewJoys,
      },
      revalidate: 60,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export default Page
