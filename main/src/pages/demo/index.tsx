import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { WP_REST_API_Posts } from 'wp-types'
import { BaseHead, baseUuCirclesUrl } from '@/src/components/layouts/BaseHead'
import { MainTemplate } from '@/src/components/pages/Main/MainTemplate'
import { useFetchUuYell } from '@/src/hooks/useFetchUuYell'
import { usePagePosition } from '@/src/hooks/usePagePosition'
import { AnnouncementType } from '@/src/lib/enum/api/AnnouncementType'
import { CategorySlugProperty } from '@/src/lib/enum/api/CategorySlugProperty'
import { Importance } from '@/src/lib/enum/api/Importance'
import { TagSlugProperty } from '@/src/lib/enum/api/TagSlugProperty'
import { LocalStorageKey } from '@/src/lib/enum/app/LocalStorageKey'
import { getMainDemo } from '@/src/lib/infra/api/main'
import { Advertise } from '@/src/lib/types/model/Advertise'
import { Announcement } from '@/src/lib/types/model/Announcement'
import { Circle } from '@/src/lib/types/model/Circle'

type Props = {
  advertises: Advertise[]
  mainAdvertises: Advertise[]
  circles: Circle[]
  /** uu-yell記事 */ uuYellArticles: WP_REST_API_Posts
  /** お知らせ */ announcements: Announcement[]
}
const Index: NextPage<Props> = ({
  advertises,
  mainAdvertises,
  circles,
  uuYellArticles,
  announcements,
}) => {
  // 識別子の取得
  const [identifierHash, setIdentifierHash] = useState(null)
  useEffect(() => {
    setIdentifierHash(localStorage.getItem(LocalStorageKey.identifierHash))
  }, [])

  // 「編集長イチオシ」の取得
  const { uuYellForMain } = useFetchUuYell()

  // ページ位置
  const { pageData, onChangeId, recordPagePosition } = usePagePosition({
    pageUrl: '/demo',
    pageName: 'main_demo',
    identifierHash,
  })

  return (
    <div>
      <BaseHead
        title="UU-Circles デモ画面 | 宇都宮大学の“知りたいサークル“を知る場所"
        description={`デモ画面。宇都宮大学のサークル一覧。なりたいジブンをさがす春。`}
        breadcrumbJsonLdItemListElements={[
          {
            position: 1,
            name: 'Home',
            item: baseUuCirclesUrl,
          },
        ]}
        carouselJsonLdData={[
          {
            url: `${baseUuCirclesUrl}/circle`,
          },
          {
            url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.sport}`,
          },
          {
            url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.music}`,
          },
          {
            url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.culture}`,
          },
          {
            url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.community}`,
          },
          {
            url: `${baseUuCirclesUrl}/circle/tag/${TagSlugProperty.programming}`,
          },
          {
            url: `${baseUuCirclesUrl}/circle/category/${CategorySlugProperty.official_organization}`,
          },
        ]}
      />

      <MainTemplate
        advertises={advertises}
        mainAdvertises={mainAdvertises}
        circles={circles}
        uuYellArticles={uuYellArticles}
        uuYellForMain={uuYellForMain}
        announcements={announcements}
        pagePositions={pageData}
        recordPagePosition={recordPagePosition}
        onChangeId={onChangeId}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { circles, advertises, mainAdvertises, uuYellArticles } =
    await getMainDemo()

  const announcements: Announcement[] = [
    {
      announcementId: 0,
      title: 'これはデモ画面です。正しい情報ではありません。',
      announcementType: AnnouncementType.UPDATE_FEATURE,
      importance: Importance.MIDDLE,
    },
  ]
  return {
    props: {
      advertises,
      circles,
      mainAdvertises,
      uuYellArticles,
      announcements,
    },
    revalidate: 120,
  }
}

export default Index
