import Image from 'next/image'
import { FC } from 'react'
import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types'
import { AppealingPoint } from './Parts/AppealingPoint'
import { CircleTopInformation } from './Parts/CircleTopInformation'
import { InformationField } from './Parts/InformationField'
import { NewJoyList } from './Parts/NewJoyList'
import { ShowCircleTitle } from './Parts/ShowCircleTitle'
import { TopImage } from './Parts/TopImage'
import { WpPostBlock } from './Parts/WpPostBlock'
import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseHead } from '@/src/components/layouts/BaseHead'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { TwitterEmbed } from '@/src/components/organisms/Twitter/TwitterEmbed'
import { CircleTagModel } from '@/src/lib/enum/api/CircleTagModel'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'
import { CircleNewJoy } from '@/src/lib/types/model/CircleNewJoy'

type Props = {
  circle?: Circle
  circleTags?: CircleTagModel[]
  circleNewJoys?: CircleNewJoy[]
  /** uu-yellの記事 */ uuYellArticles?: WP_REST_API_Post[]
  /** WordPress記事 */ wpPosts?: {
    postsNotTags: WP_REST_API_Post[]
    postsExistTags: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }
  /** お知らせ */ announcements?: Announcement[]
  uuYellForCircles: {
    posts: WP_REST_API_Post[]
    medias: WP_REST_API_Attachment[]
  }
}

export const ShowCircleTemplate: FC<Props> = ({
  circle,
  circleTags,
  circleNewJoys,
  uuYellArticles,
  wpPosts,
  announcements,
  uuYellForCircles,
}) => {
  // w : h = 210 : 297
  const width = 300
  const height = (300 * 297) / 210

  return (
    <div>
      <BaseHead
        title={`${circle.name} サークル詳細`}
        description={circle.description}
      />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <div>
          <BaseContainer>
            <div>
              <div className="bg-white">
                <TopImage circle={circle} />
              </div>

              <CircleTopInformation circle={circle} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 pb-16">
              <div className="order-1">
                <AppealingPoint circle={circle} />
              </div>

              {circle.handbillImageUrl ? (
                <div className="order-2 pt-10">
                  <ShowCircleTitle>新歓ビラ</ShowCircleTitle>

                  <div className="flex justify-center md:justify-start">
                    <a
                      href={circle.handbillImageUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src={circle.handbillImageUrl}
                        alt={`${circle.name}新歓ビラ`}
                        width={width}
                        height={height}
                        className="rounded"
                        objectFit="cover"
                      />
                    </a>
                  </div>
                </div>
              ) : (
                ''
              )}

              <div className="order-4 md:order-4 pt-10">
                <div>
                  {circleNewJoys && circleNewJoys.length > 0 ? (
                    <div>
                      <NewJoyList
                        slug={circle.slug}
                        circleNewJoys={circleNewJoys}
                      />
                    </div>
                  ) : (
                    <div>
                      <ShowCircleTitle>新歓イベント日程</ShowCircleTitle>

                      <p className="text-center">
                        現在開催予定の新歓はありません
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-8 pb-10 bg-gray-100 flex justify-center">
                  <GreenButton
                    href="/circle/[slug]/newjoy"
                    as={`/circle/${circle.slug}/newjoy`}
                  >
                    もっと詳しく
                  </GreenButton>
                </div>
              </div>

              <div className="order-3 md:order-3 pt-10">
                <InformationField circle={circle} circleTags={circleTags} />
              </div>

              {wpPosts &&
              wpPosts.postsExistTags &&
              wpPosts.postsExistTags.length > 0 ? (
                <div className="order-5 pt-10 px-6 md:px-0">
                  <ShowCircleTitle>おすすめの投稿</ShowCircleTitle>

                  {wpPosts.postsExistTags.map((post, key) => {
                    return (
                      <div
                        key={`wpPosts.postsExistTags-${key}`}
                        className="mb-4"
                      >
                        <WpPostBlock
                          post={post}
                          media={
                            wpPosts.medias &&
                            wpPosts.medias.find(
                              (media) => media.id === post.featured_media
                            )
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                ''
              )}

              {wpPosts &&
              wpPosts.postsNotTags &&
              wpPosts.postsNotTags.length > 0 ? (
                <div className="order-6 pt-10 px-6 md:px-0">
                  <ShowCircleTitle>最新の投稿</ShowCircleTitle>

                  {wpPosts.postsNotTags.map((post, key) => {
                    return (
                      <div key={`wpPosts.postsNotTags-${key}`} className="mb-4">
                        <WpPostBlock
                          post={post}
                          media={
                            wpPosts.medias &&
                            wpPosts.medias.find(
                              (media) => media.id === post.featured_media
                            )
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                ''
              )}
            </div>

            {uuYellForCircles &&
            uuYellForCircles.posts &&
            uuYellForCircles.posts.length > 0 ? (
              <div className="pt-10 px-6 md:px-0">
                <ShowCircleTitle>
                  uu-yellでサークルを詳しく知ろう！
                </ShowCircleTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 pb-8">
                  {uuYellForCircles.posts.map((post, key) => {
                    return (
                      <div key={`uuYellForCircles-${key}`} className="mb-4">
                        <WpPostBlock
                          post={post}
                          media={
                            uuYellForCircles.medias &&
                            uuYellForCircles.medias.find(
                              (media) => media.id === post.featured_media
                            )
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              ''
            )}

            <div>
              {circle && circle.twitterUrl ? (
                <div className="pb-16 px-6 md:pl-0 md:pr-2">
                  <ShowCircleTitle>{circle.name}のTwitter</ShowCircleTitle>

                  <div className="md:w-1/2">
                    <TwitterEmbed
                      name={circle.name}
                      twitterLink={circle.twitterUrl}
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </BaseContainer>
        </div>

        {/*  フッター */}
        <BaseFooter uuYellArticles={uuYellArticles} />
      </BaseLayout>
    </div>
  )
}
