"use client";

import LocalSignIn from "@/feats/widgets/local-sign-in";
import { useAuth } from "@/utils/auth-context";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import IconLogin from "../icons/login";

const messages = [
  {
    title: "Welcome to your Life Dashboard",
    cta: "Log in to begin organizing your energy, attention, and priorities.",
  },
  {
    title: "Start building your intentional life",
    cta: "Sign in now to start tracking what moves you forward.",
  },
  {
    title: "Ready to take control of your time?",
    cta: "Log in and start designing your day with purpose.",
  },
];

const SignInCard = () => {
  const index = Math.floor(Math.random() * messages.length);
  const message = messages[index];
  const { userId } = useAuth();

  if (userId) {
    return null; // If user is already signed in, don't show the sign-in card
  }

  return (
    <SignedOut>
      <div className="bg-grid absolute inset-0">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 border bg-light bg-opacity-95 p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            {message.title}
          </h2>
          <p className="text-center text-gray-400">{message.cta}</p>
          <div className="mx-auto w-full max-w-sm rounded-lg">
            <SignInButton>
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-dark px-4 py-2 text-sm text-white transition hover:bg-gray-800">
                <IconLogin className="h-4 w-4" />
                Sign in
              </button>
            </SignInButton>
          </div>
          <div className="relative w-full text-center text-sm text-gray-400">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
            <span className="relative bg-white px-2">or</span>
          </div>

          <LocalSignIn buttonText="Start Using Locally" />
          <p className="mt-2 text-center text-xs text-gray-400">
            Local mode only — data will not sync or be saved across devices.
          </p>
        </div>
      </div>
    </SignedOut>
  );
};

export default SignInCard;
