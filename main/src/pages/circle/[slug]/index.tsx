import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Error from 'next/error'
import useSWR from 'swr'
import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types'
import { BaseHead, baseUuCirclesUrl } from '@/src/components/layouts/BaseHead'
import { ShowCircleTemplate } from '@/src/components/pages/Circle/Show/ShowCircleTemplate'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { getCircleBySlug } from '@/src/lib/infra/api/circle'
import { PageNotFoundError } from '@/src/lib/infra/api/error'
import { fetchPostsByCircle } from '@/src/lib/infra/uu_yell/fetchPostsByCircle'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

type Props = {
  circle: Circle
  circleTags?: CircleTagModel[]
  circleNewJoys?: CircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** WordPress記事 */ wpPosts?: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }
  errorCode?: number
  /** お知らせ */ announcements?: Announcement[]
}
const Page: NextPage<Props> = ({
  circle,
  circleTags,
  circleNewJoys,
  uuYellArticles,
  wpPosts,
  errorCode,
  announcements,
}) => {
  const { data: uuYellForCircles } = useSWR<{
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }>(['/circle/[slug]', circle.slug], () =>
    fetchPostsByCircle({
      circleSlug: circle.slug,
      circleName: circle.name,
      circleShortName: circle.shortName,
    })
  )

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  if (!circle) {
    return <div></div>
  }

  return (
    <>
      <BaseHead
        title={`${circle.name} - サークル紹介`}
        description={circle.description}
        breadcrumbJsonLdItemListElements={[
          {
            position: 1,
            name: 'Home',
            item: baseUuCirclesUrl,
          },
          {
            position: 2,
            name: 'サークル一覧',
            item: `${baseUuCirclesUrl}/circle`,
          },
          {
            position: 2,
            name: circle.name,
            item: `${baseUuCirclesUrl}/circle/${circle.slug}`,
          },
        ]}
        carouselJsonLdData={[
          {
            url: `${baseUuCirclesUrl}/circle/newjoy`,
          },
          ...(circleNewJoys
            ? circleNewJoys.map((circleNewJoy) => ({
                url: `${baseUuCirclesUrl}/circle/newjoy/${circleNewJoy.id}`,
              }))
            : []),
        ]}
      />

      <ShowCircleTemplate
        circle={circle}
        circleTags={circleTags}
        circleNewJoys={circleNewJoys}
        uuYellArticles={uuYellArticles}
        wpPosts={wpPosts}
        announcements={announcements}
        uuYellForCircles={
          uuYellForCircles || {
            posts: [],
            medias: [],
          }
        }
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Partial<Props>> = async ({
  params,
}) => {
  if (!params || !params.slug || Array.isArray(params.slug)) {
    return {
      notFound: true,
    }
  }

  try {
    const {
      circle,
      circleTags,
      circleNewJoys,
      uuYellArticles,
      wpPosts,
      announcements,
    } = await getCircleBySlug(params.slug)

    return {
      props: {
        circle,
        circleTags,
        circleNewJoys,
        uuYellArticles,
        wpPosts,
        announcements,
      },
      revalidate: 180,
    }
  } catch (e) {
    if (e instanceof PageNotFoundError) {
      return {
        notFound: true,
      }
    }

    console.error(e)

    return { props: { errorCode: 500 } }
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export default Page
