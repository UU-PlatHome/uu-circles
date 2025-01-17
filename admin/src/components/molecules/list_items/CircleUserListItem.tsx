import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FC, useState } from 'react'
import Modal from 'react-modal'
import { GrayButton } from '@/src/components/atoms/buttons/GrayButton'
import { RedButton } from '@/src/components/atoms/buttons/RedButton'
import { User } from '@/src/lib/types/model/User'

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
  user: User
  onDelete(): void
}
const DeleteButton: FC<DeleteButtonProps> = ({ user, onDelete }) => {
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
        contentLabel="部員アカウント削除"
      >
        <h2 className="mb-4 text-center text-lg font-bold">
          本当に削除しますか？
        </h2>

        <p className="mb-8 text-center">{user.displayName}</p>

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
type Props = {
  user: User
  circleId: number
  onDelete(circleUser: number): void
  onResendEmail(email: string): void
}
const CircleUserListItem: FC<Props> = ({
  circleId,
  user,
  onDelete,
  onResendEmail,
}) => {
  return (
    <div>
      <div className="mb-4 ml-2 w-full">
        <h2 className="mb-2 text-lg font-bold text-gray-300">
          {user.displayName}
        </h2>

        <div className="flex w-full flex-wrap">
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              ユーザー名
            </p>
            <div className="flex h-7 items-center justify-center text-white">
              {user.username}
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              有効なアカウント
            </p>
            <div className="flex h-7 items-center justify-center">
              <FontAwesomeIcon
                size="lg"
                color={user.active ? 'green' : 'red'}
                icon={user.active ? faCheckCircle : faTimesCircle}
              />
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              認証済みか
            </p>
            <div className="flex h-7 items-center justify-center">
              <div>
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    size="lg"
                    color={user.emailVerifiedAt ? 'green' : 'red'}
                    icon={user.emailVerifiedAt ? faCheckCircle : faTimesCircle}
                  />
                </div>
                {!user.emailVerifiedAt ? (
                  <div className="text-sm text-white">
                    <button onClick={() => onResendEmail(user.email)}>
                      メールの再送信
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              所属サークル
            </p>
            <div className="flex h-7 items-center justify-center">
              <Link href="/user/circle/[userId]" as={`/user/circle/${user.id}`}>
                <FontAwesomeIcon
                  size="lg"
                  color="orange"
                  icon={faUserFriends}
                />
              </Link>
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              編集する
            </p>
            <div className="flex h-7 items-center justify-center">
              <Link
                href="/circle/[id]/user/[userId]/edit"
                as={`/circle/${circleId}/user/${user.id}/edit`}
              >
                <FontAwesomeIcon size="lg" color="orange" icon={faEdit} />
              </Link>
            </div>
          </div>
          <div className="w-full pr-2 lg:w-1/6">
            <p className="mb-2 bg-gray-800 py-1 text-center text-sm font-bold text-gray-300">
              削除する
            </p>
            <div className="flex h-7 items-center justify-center">
              <DeleteButton user={user} onDelete={() => onDelete(user.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CircleUserListItem }
