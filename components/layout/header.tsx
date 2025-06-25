import LinkShortcuts from "@/feats/widgets/link-shortcut";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import DayTimeProgress from "../atoms/day-time-progress";
import IconFingerprint from "../icons/fingerprint";

const Header = () => {
  return (
    <div className="w-full border-b">
      <header className="relative mx-auto flex h-12 w-full max-w-[1100px] items-center justify-between border-x bg-light">
        <div className="right-full px-4 xl:absolute">
          <h1>
            <span className="text-xl font-bold">42</span>
            <span className="text-gray-500">OS</span>
          </h1>
        </div>
        <DayTimeProgress containerStyle="hidden md:flex" />
        <LinkShortcuts />
        <div className="left-full px-4 xl:absolute">
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
        </div>
      </header>
    </div>
  );
};

export default Header;
