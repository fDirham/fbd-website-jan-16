import BioLink from "./BioLink";
import useTheme from "../contexts/theme/useTheme";
import {
  HEADSHOT_IMAGE,
  TIKTOK_ICON_BLACK,
  TIKTOK_ICON_WHITE,
  YOUTUBE_ICON,
  EMAIL_ICON_BLACK,
  EMAIL_ICON_WHITE,
  RESUME_ICON_BLACK,
  RESUME_ICON_WHITE,
  GITHUB_ICON_BLACK,
  GITHUB_ICON_WHITE,
  CDN_BASE_URL,
} from "../constants/images";

export default function Bio() {
  const { theme } = useTheme();

  const tiktokIcon = theme === "dark" ? TIKTOK_ICON_WHITE : TIKTOK_ICON_BLACK;
  const emailIcon = theme === "dark" ? EMAIL_ICON_WHITE : EMAIL_ICON_BLACK;
  const resumeIcon = theme === "dark" ? RESUME_ICON_WHITE : RESUME_ICON_BLACK;
  const githubIcon = theme === "dark" ? GITHUB_ICON_WHITE : GITHUB_ICON_BLACK;

  const links = [
    {
      icon: tiktokIcon,
      label: "TikTok",
      href: "https://tiktok.com/@fbdwrites",
    },
    {
      icon: YOUTUBE_ICON,
      label: "YouTube",
      href: "https://youtube.com/@fbdwrites",
    },
    { icon: emailIcon, label: "Email", href: "mailto:fajarletters@gmail.com" },
    {
      icon: resumeIcon,
      label: "Resume",
      href: CDN_BASE_URL + "Fajar_Dirham_Resume.pdf",
    },
    { icon: githubIcon, label: "GitHub", href: "https://github.com/fDirham" },
  ];

  return (
    <div className="bio">
      <img src={HEADSHOT_IMAGE} alt="Fajar Dirham" className="bio__headshot" />
      <h1 className="bio__name">Fajar Dirham</h1>
      <p className="bio__title">Software Dev / Writer / 😎</p>
      <p className="bio__description">
        I like building stuff, aiming to get a novel published, and I make
        content about the books i read.
      </p>
      <div className="bio__links">
        {links.map((link) => (
          <BioLink
            key={link.label}
            icon={link.icon}
            label={link.label}
            href={link.href}
          />
        ))}
      </div>
    </div>
  );
}
