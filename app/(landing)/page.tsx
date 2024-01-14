import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-5">
      <p>Landing Page (unprotected)</p>
      <div className="">
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default LandingPage;
