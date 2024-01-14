import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-5">
      <p>Dashboard Page (protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardPage;
