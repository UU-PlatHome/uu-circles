import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faUserAlt,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { __ } from '@/lang/ja'
import { Circle } from '@/lib/types/model/Circle'

type Props = {
  circle: Circle
}

const CircleListItemTableColumn: FC<{
  title: string
}> = ({ children, title }) => {
  return (
    <div className="w-1/3 lg:w-1/6 pr-2 mb-2">
      <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
        {title}
      </p>
      <div className="flex justify-center h-7 items-center">{children}</div>
    </div>
  )
}
const CircleListItem: FC<Props> = ({ circle }) => {
  const imageLink =
    circle.mainImageUrl || circle.handbillImageUrl || `/images/no-image.png`
  return (
    <div className="text-white flex mb-4">
      <div className="hidden lg:block">
        <img
          src={imageLink}
          width="100"
          height="100"
          className="square-image object-contain"
        />
      </div>

      <div className="ml-2 w-full">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="lg:hidden mr-2">
            <img
              src={imageLink}
              width="100"
              height="100"
              className="square-image object-contain"
            />
          </div>
          <h2 className="font-bold text-lg text-gray-300 mb-2">
            {circle.name}
          </h2>
        </div>

        <div className="flex flex-wrap w-full">
          <CircleListItemTableColumn title="公開中">
            <FontAwesomeIcon
              size="lg"
              color={circle.release ? 'green' : 'red'}
              icon={circle.release ? faCheckCircle : faTimesCircle}
            />
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="種別">
            {__(circle.circleType) || '不明'}
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="編集">
            <Link href="/circle/[id]/edit" as={`/circle/${circle.id}/edit`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="タグ">
            <Link href="/circle/[id]/tag" as={`/circle/${circle.id}/tag`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faTags} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="新歓">
            <Link href="/circle/[id]/newjoy" as={`/circle/${circle.id}/newjoy`}>
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </a>
            </Link>
          </CircleListItemTableColumn>
          <CircleListItemTableColumn title="ユーザー">
            <Link href="/circle/[id]/user" as={`/circle/${circle.id}/user`} >
              <a>
                <FontAwesomeIcon
                  size="lg"
                  color="orange"
                  icon={ faUserAlt }
                />
              </a>
            </Link>
          </CircleListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { CircleListItem }
