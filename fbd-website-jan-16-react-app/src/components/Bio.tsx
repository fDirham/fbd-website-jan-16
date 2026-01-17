import BioLink from "./BioLink";
import {
  HEADSHOT_IMAGE,
  TIKTOK_ICON,
  YOUTUBE_ICON,
  EMAIL_ICON,
  RESUME_ICON,
  GITHUB_ICON,
} from "../constants/images";

export default function Bio() {
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
        <BioLink icon={TIKTOK_ICON} label="TikTok" href="https://tiktok.com" />
        <BioLink
          icon={YOUTUBE_ICON}
          label="YouTube"
          href="https://youtube.com"
        />
        <BioLink
          icon={EMAIL_ICON}
          label="Email"
          href="mailto:email@example.com"
        />
        <BioLink icon={RESUME_ICON} label="Resume" href="#" />
        <BioLink icon={GITHUB_ICON} label="GitHub" href="https://github.com" />
      </div>
    </div>
  );
}
