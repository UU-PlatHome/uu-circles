import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseHead } from '@/components/layouts/BaseHead'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { CarouselCircleList } from '@/components/organisms/List/CarouselCircleList'
import { getCircleByTag } from '@/infra/api/circle'
import { __ } from '@/lang/ja'
import { Announcement } from '@/lib/types/model/Announcement'
import { Circle } from '@/lib/types/model/Circle'
import { TagPageViewRanking } from '@/lib/types/model/TagPageViewRanking'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { WP_REST_API_Posts } from 'wp-types'

type Props = {
  errorCode?: number
  circles?: Circle[]
  recommendCircles?: Circle[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Posts
  /** お知らせ */ announcements?: Announcement[]
  /** タグページ閲覧数 */ tagPageViewRanking: TagPageViewRanking
}
const Page: NextPage<Props> = ({
  circles,
  recommendCircles,
  uuYellArticles,
  announcements,
  tagPageViewRanking,
}) => {
  const router = useRouter()
  const { tag } = router.query
  const circleTagTitle = __(String(tag).toUpperCase(), 'CircleTagTitle')
  const circleTagText = __(String(tag).toUpperCase(), 'CircleTagText')

  if (!circles) {
    return <div></div>
  }

  return (
    <div>
      <BaseHead title={`${__(String(tag).toUpperCase())}タグ検索`} />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer
            sidebar={<CircleSidebar tagPageViewRanking={tagPageViewRanking} />}
          >
            <div className="px-5">
              <h1 className="text-2xl py-8">{__(String(tag).toUpperCase())}</h1>

              {circleTagTitle ? (
                <p className="text-base pb-4 font-bold">{circleTagTitle}</p>
              ) : (
                ''
              )}
              {circleTagText ? (
                <p className="text-sm pb-8">{circleTagText}</p>
              ) : (
                ''
              )}

              {/*  サークル一覧 */}
              <BaseCircleList circles={circles} />

              <div className="pb-8">
                <h2 className="text-lg py-8">他のサークルも見る</h2>

                <CarouselCircleList circles={recommendCircles} />
              </div>
            </div>
          </TwoColumnContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.tag || Array.isArray(params.tag)) {
    return {
      notFound: true,
    }
  }

  const {
    circles,
    recommendCircles,
    uuYellArticles,
    announcements,
    tagPageViewRanking,
  } = await getCircleByTag(params.tag)

  return {
    props: {
      circles,
      recommendCircles,
      uuYellArticles,
      announcements,
      tagPageViewRanking,
    },
    revalidate: 120,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
