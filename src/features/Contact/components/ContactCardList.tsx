import {
  HeartIcon,
  MessageCircleIcon,
  NewspaperIcon,
  UsersIcon,
} from "lucide-react";

export default function ContactCardList() {
  return (
    <div className="border-t py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="boder-3 border-r">
          <div className="flex flex-row items-center gap-6">
            <NewspaperIcon className="size-10" />
            <div className="flex-1">
              <h5>Local and independent</h5>
              <p>
                Tamworth Hub is a local, independent website run for the
                community.
              </p>
            </div>
          </div>
        </div>
        <div className="boder-3 border-r">
          <div className="flex flex-row items-center gap-6 pl-6">
            <UsersIcon className="size-10" />
            <div className="flex-1">
              <h5>Community focused</h5>
              <p>
                We&apos;re here to support local people, businesses and
                organisations.
              </p>
            </div>
          </div>
        </div>
        <div className="boder-3 border-r">
          <div className="flex flex-row items-center gap-6 pl-6">
            <MessageCircleIcon className="size-10" />
            <div className="flex-1">
              <h5>Your feedback matters</h5>
              <p>Your ideas and feedback help us improve and grow</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-6 pl-6">
            <HeartIcon className="size-10" />
            <div className="flex-1">
              <h5>A stronger Tamworth</h5>
              <p>
                Together we can keep Tamworth informed, connected and thriving
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
