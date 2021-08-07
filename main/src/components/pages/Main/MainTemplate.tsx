import { GreenButton } from '@/src/components/atoms/button/GreenButton'
import { BaseFooter } from '@/src/components/layouts/BaseFooter'
import { BaseLayout } from '@/src/components/layouts/BaseLayout'
import { BaseContainer } from '@/src/components/molecules/Container/BaseContainer'
import { MainCircleList } from '@/src/components/pages/Main/Parts/MainCircleList'
import { MainHead } from '@/src/components/pages/Main/Parts/MainHead'
import { MainSponsorshipFooter } from '@/src/components/pages/Main/Parts/MainSponsorshipFooter'
import { MainTagList } from '@/src/components/pages/Main/Parts/MainTagList'
import { MainUucircleAd } from '@/src/components/pages/Main/Parts/MainUucircleAd'
import { MainUucircleBottomButtons } from '@/src/components/pages/Main/Parts/MainUucircleBottomButtons'
import { MainUucircleTopButtons } from '@/src/components/pages/Main/Parts/MainUucircleTopButtons'
import { MainUucircleTopCarousel } from '@/src/components/pages/Main/Parts/MainUucircleTopCarousel'
import { Advertise } from "@/src/lib/types/model/Advertise";
import { Announcement } from "@/src/lib/types/model/Announcement";
import { Circle } from "@/src/lib/types/model/Circle";
import { PagePositions } from '@/src/lib/types/model/PagePosition'
import { NextPage } from "next";
import { WP_REST_API_Attachments, WP_REST_API_Posts } from "wp-types";

const ID_LIST = {
  HEADER_CATCH_COPY: 'header_catch_copy',
  TOP_BUTTONS: 'top_buttons',
} as const

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
  uuYellForMain: {
    posts: WP_REST_API_Posts
    medias: WP_REST_API_Attachments
  }
  pagePositions: PagePositions
  onChangeId: (_pagePositionId: string) => Promise<void>
}
export const MainTemplate: NextPage<Props> = ({
  advertises,
  mainAdvertises,
  circles,
  uuYellArticles,
  uuYellForMain,
  announcements,
  pagePositions,
  onChangeId,
}) => {
  return (
    <div>
      <MainHead />

      <BaseLayout
        announcement={
          announcements && announcements.length > 0
            ? announcements[0]
            : undefined
        }
      >
        <MainUucircleTopCarousel advertises={mainAdvertises} />

        <div
          id={ID_LIST.HEADER_CATCH_COPY}
          style={{ marginTop: '-6px' }}
          className="bg-white"
          onMouseOver={() => onChangeId(ID_LIST.HEADER_CATCH_COPY)}
        >
          <p className="text-center py-8">新歓をハックする！</p>
        </div>

        {
          pagePositions.pagePositions.filter(
            (pagePosition) => pagePosition.pagePositionId === ID_LIST.HEADER_CATCH_COPY
          ).length
        }

        <div
          id={ID_LIST.TOP_BUTTONS}
          onMouseOver={() => onChangeId(ID_LIST.TOP_BUTTONS)}
        >
          <MainUucircleTopButtons />
        </div>

        {
          pagePositions.pagePositions.filter(
            (pagePosition) => pagePosition.pagePositionId === ID_LIST.TOP_BUTTONS
          ).length
        }

        <BaseContainer>
          <div className="px-7">
            <MainTagList />

            {/*  サークル一覧 */}
            <MainCircleList circles={circles} />

            <div className="pt-4 pb-10 bg-gray-100 flex justify-center">
              <GreenButton href="/circle">もっと見る</GreenButton>
            </div>
          </div>
        </BaseContainer>

        <div className="bg-gray-100">
          {/*  フッター */}

          <MainUucircleAd />

          <MainUucircleBottomButtons
            medias={uuYellForMain ? uuYellForMain.medias : []}
            posts={uuYellForMain ? uuYellForMain.posts : []}
          />

          <MainSponsorshipFooter advertises={advertises} />

          <BaseFooter uuYellArticles={uuYellArticles} />
        </div>
      </BaseLayout>
    </div>
  )
}
