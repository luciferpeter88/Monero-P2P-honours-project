import SideChatPerson from "./SideChatPerson";
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";

export default function SideBar({ users, setUserId, userId }) {
  const { fontSize } = Use();
  const typography = useStoredValue("typography");
  const nameStyle = {
    fontSize: typography?.size.fontSize || fontSize.size.fontSize,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  const descRiptionstyle = {
    fontSize: typography?.size.fontSize - 2 || fontSize.size.fontSize - 2,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  return (
    <aside className="w-80 bg-third rounded-lg">
      <div className="p-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-primary rounded-xl py-2 pl-10 pr-4 text-white placeholder-muted-foreground focus:outline-none "
          />
          <svg
            className="w-5 h-5 text-muted-foreground absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-12.5rem)] px-2 space-y-1">
        {users ? (
          users?.map((user) => (
            <SideChatPerson
              key={user.id}
              id={user.id}
              user={user.username}
              userId={userId}
              setUserId={setUserId}
              nameStyle={nameStyle}
              descRiptionstyle={descRiptionstyle}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-center">No users found</p>
        )}
      </div>
    </aside>
  );
}
