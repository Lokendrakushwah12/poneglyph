import Link from "next/link";
import { Shell } from "../shell";
const Footer = () => {
  return (
    <footer className="w-full bg-background">
      <Shell>
        <hr className="w-full" />
        <div className="relative flex items-center justify-between">
          <p className="text-sm font-[400] text-muted-foreground">
            Poneglyph © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://x.com/Lokendratwt"
              className="p-1 text-sm text-muted-foreground transition-all hover:text-foreground"
            >
              X (Twitter) ↗
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/lokendrakushwah12/"
              className="p-1 text-sm text-muted-foreground transition-all hover:text-foreground"
            >
              LinkedIn ↗
            </Link>
          </div>
        </div>
      </Shell>
    </footer>
  );
};

export default Footer;
