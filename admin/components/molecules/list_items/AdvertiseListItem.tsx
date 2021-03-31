import { GrayButton } from '@/components/atoms/buttons/GrayButton'
import { RedButton } from '@/components/atoms/buttons/RedButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { __ } from '@/lang/ja'
import { Advertise } from '@/lib/types/model/Advertise'
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC, useState } from 'react'
import Modal from 'react-modal'

type Props = {
  advertise: Advertise
  onDelete(advertiseId: number): void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '200px',
  },
}
type DeleteButtonProps = {
  advertise: Advertise
  onDelete(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ advertise, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClickDeleteButton = () => {
    setIsOpen(false)
    onDelete()
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="新歓の削除"
      >
        <h2 className="text-center text-lg mb-4 font-bold">
          本当に削除しますか？
        </h2>

        <p className="mb-8 text-center">{advertise.title}</p>

        <div className="flex justify-center">
          <div className="mx-2">
            <GrayButton onClick={() => setIsOpen(false)}>閉じる</GrayButton>
          </div>
          <div className="mx-2">
            <RedButton onClick={onClickDeleteButton}>削除</RedButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const ListItemTableColumn: FC<{
  title: string
  lg?: boolean
}> = ({ children, title, lg }) => {
  const widthClass = lg ? 'w-1/3 lg:w-1/4' : 'w-1/3 lg:w-1/6'
  return (
    <div className={`${widthClass} pr-2`}>
      <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">
        {title}
      </p>
      <div className="flex justify-center h-7 items-center">{children}</div>
    </div>
  )
}
const AdvertiseListItem: FC<Props> = ({ advertise, onDelete }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="text-white flex mb-4">
      <div className="hidden lg:block">
        <img
          src={
            advertise.mainImageUrl
              ? advertise.mainImageUrl
              : `/images/no-image.png`
          }
          alt="広告画像"
          width={isMd ? 150 : 100}
          height={isMd ? (150 * 218) / 375 : (100 * 218) / 375}
          className="square-image"
        />
      </div>

      <div className="ml-2 w-full">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="lg:hidden mr-2">
            <img
              src={
                advertise.mainImageUrl
                  ? advertise.mainImageUrl
                  : `/images/no-image.png`
              }
              alt="広告画像"
              width={isMd ? 150 : 100}
              height={isMd ? (150 * 218) / 375 : (100 * 218) / 375}
              className="square-image"
            />
          </div>
          <h2 className="font-bold md:text-lg text-gray-300 mb-2">
            {advertise.title}
          </h2>
        </div>

        <div className="flex flex-wrap w-full">
          <ListItemTableColumn title="公開中">
            <FontAwesomeIcon
              size="lg"
              color={advertise.active ? 'green' : 'red'}
              icon={advertise.active ? faCheckCircle : faTimesCircle}
            />
          </ListItemTableColumn>
          <ListItemTableColumn title="公開中" lg>
            <p>{__(advertise.advertiseType, 'advertiseType')}</p>
          </ListItemTableColumn>
          <ListItemTableColumn title="編集する">
            <Link
              href="/advertise/[advertiseId]/edit"
              as={`/advertise/${advertise.id}/edit`}
            >
              <a>
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </a>
            </Link>
          </ListItemTableColumn>
          <ListItemTableColumn title="削除する">
            <DeleteButton
              advertise={advertise}
              onDelete={() => onDelete(advertise.id)}
            />
          </ListItemTableColumn>
        </div>
      </div>
    </div>
  )
}

export { AdvertiseListItem }
