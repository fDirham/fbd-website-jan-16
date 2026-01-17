import BioLink from "./BioLink";
import useTheme from "../contexts/theme/useTheme";
import {
  HEADSHOT_IMAGE,
  TIKTOK_ICON_BLACK,
  TIKTOK_ICON_WHITE,
  YOUTUBE_ICON,
  EMAIL_ICON_BLACK,
  EMAIL_ICON_WHITE,
} from "../constants/images";

export default function Bio() {
  const { theme } = useTheme();

  const tiktokIcon = theme === "dark" ? TIKTOK_ICON_WHITE : TIKTOK_ICON_BLACK;
  const emailIcon = theme === "dark" ? EMAIL_ICON_WHITE : EMAIL_ICON_BLACK;

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
  ];

  return (
    <div className="bio">
      <img src={HEADSHOT_IMAGE} alt="Fajar Dirham" className="bio__headshot" />
      <h1 className="bio__name">Fajar Dirham</h1>
      <p className="bio__title">Software Dev / Writer / 😎</p>
      <p className="bio__description">i build. i write. i post content.</p>
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
