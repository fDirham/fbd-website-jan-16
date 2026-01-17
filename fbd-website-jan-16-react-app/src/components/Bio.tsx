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
} from "../constants/images";

export default function Bio() {
  const { theme } = useTheme();

  const tiktokIcon = theme === "dark" ? TIKTOK_ICON_WHITE : TIKTOK_ICON_BLACK;
  const emailIcon = theme === "dark" ? EMAIL_ICON_WHITE : EMAIL_ICON_BLACK;
  const resumeIcon = theme === "dark" ? RESUME_ICON_WHITE : RESUME_ICON_BLACK;
  const githubIcon = theme === "dark" ? GITHUB_ICON_WHITE : GITHUB_ICON_BLACK;

  return (
    <div className="bio">
      <img src={HEADSHOT_IMAGE} alt="Fajar Dirham" className="bio__headshot" />
      <h1 className="bio__name">Fajar Dirham</h1>
      <p className="bio__title">Software Guy / Writer / 😎</p>
      <p className="bio__description">
        I like building stuff, aiming to get a novel published, and I make
        content.
      </p>
      <div className="bio__links">
        <BioLink icon={tiktokIcon} label="TikTok" href="https://tiktok.com" />
        <BioLink
          icon={YOUTUBE_ICON}
          label="YouTube"
          href="https://youtube.com"
        />
        <BioLink
          icon={emailIcon}
          label="Email"
          href="mailto:email@example.com"
        />
        <BioLink icon={resumeIcon} label="Resume" href="#" />
        <BioLink icon={githubIcon} label="GitHub" href="https://github.com" />
      </div>
    </div>
  );
}
