import { Outlet, Link } from "@remix-run/react";

export default function AdminLayout() {
  return (
    <div className="bg-primary text-white m-5">
      {/* Main content area */}
      <div className="flex flex-col rounded-lg">
        {/* Top nav / header */}
        <header className="bg-third p-4 flex justify-between items-center rounded-lg">
          <Link
            to="/admin"
            className="text-xl font-bold text-secondary cursor-pointer"
          >
            <h1 className="text-xl font-bold text-secondary cursor-pointer">
              Admin Dashboard
            </h1>
          </Link>
          <div>
            <Link to="/">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                Logout
              </button>
            </Link>
          </div>
        </header>
      </div>
      {/* Content outlet */}
      <div className="flex min-h-screen gap-5 mt-5 bg-primary">
        <main className="w-full  overflow-y-auto  rounded-lg bg-primary">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
