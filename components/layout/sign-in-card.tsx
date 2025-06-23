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

  return (
    <SignedOut>
      <div className="fixed inset-0 bg-transparent">
        <div className="absolute left-1/2 top-1/3 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 border bg-light bg-opacity-95 p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            {message.title}
          </h2>
          <p className="text-center text-gray-400">{message.cta}</p>
          <SignInButton>
            <button className="flex items-center justify-center gap-2 rounded border border-dark p-2 text-dark hover:brightness-125">
              <IconLogin />
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    </SignedOut>
  );
};

export default SignInCard;
