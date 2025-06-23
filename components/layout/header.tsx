import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import IconFingerprint from "../icons/fingerprint";

const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between gap-4 border-b bg-light px-4">
      <h1>
        <span className="text-xl font-bold">42</span>
        <span className="text-gray-500">OS</span>
      </h1>
      <SignedOut>
        <SignInButton>
          <button>
            <IconFingerprint />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
