import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import { BaseCircleList } from '@/components/organisms/List/BaseCircleList'
import { getCircleByCategory } from '@/infra/api/circle'
import { Circle } from '@/lib/types/model/Circle'
import { TwoColumnContainer } from '@/components/molecules/Container/TwoColumnContainer'
import { CircleSidebar } from '@/components/organisms/Circles/CircleSidebar'
import { useRouter } from 'next/dist/client/router'
import { __ } from '@/lang/ja'
import { categoryToCircleType } from '@/lib/utils/category/Category'
import { Category } from '@/lib/enum/app/Category'
import { BaseHead } from '@/components/layouts/BaseHead'
import { CarouselCircleList } from '@/components/organisms/List/CarouselCircleList'
import { getAllCategorySlugProperty } from '@/lib/enum/api/CategorySlugProperty'

type Props = {
  errorCode?: number
  circles?: Circle[]
  recommendCircles?: Circle[]
}
const Page: NextPage<Props> = ({ circles, recommendCircles }) => {
  const router = useRouter()
  const { category } = router.query

  return (
    <div>
      <BaseHead
        title={`${__(
          String(categoryToCircleType(category as Category))
        )} カテゴリー検索`}
      />

      <BaseLayout>
        <div className="bg-gray-100 px-2">
          <TwoColumnContainer sidebar={<CircleSidebar />}>
            <div className="px-5">
              <h1 className="text-2xl py-8">
                {__(String(categoryToCircleType(category as Category)))}
              </h1>

              <p className="text-base pb-4 font-bold">
                {__(
                  String(categoryToCircleType(category as Category)),
                  'CircleTypeTitle'
                )}
              </p>
              <p className="text-sm pb-8">
                {__(
                  String(categoryToCircleType(category as Category)),
                  'CircleTypeText'
                )}
              </p>

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
        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params.category || Array.isArray(params.category)) {
    return {
      notFound: true,
    }
  }

  const { circles, recommendCircles } = await getCircleByCategory(
    params.category
  )

  return {
    props: {
      circles,
      recommendCircles,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllCategorySlugProperty().map(
    (category) => `/circle/category/${category}`
  ),
  fallback: true,
})

export default Page
