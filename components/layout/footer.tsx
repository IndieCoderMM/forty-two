import { Kbd } from "../atoms/kbd";

const Footer = () => {
  return (
    <div className="w-full border-t">
      <footer className="mx-auto flex h-12 max-w-[1100px] items-center justify-between gap-4 border-x bg-light px-4">
        <div></div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            Press <Kbd keyname="h">h</Kbd> to view hotkeys
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
