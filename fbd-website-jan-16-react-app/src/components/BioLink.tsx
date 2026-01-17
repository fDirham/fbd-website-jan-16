interface BioLinkProps {
  icon: string;
  label: string;
  href: string;
  style?: React.CSSProperties;
}

export default function BioLink({ icon, label, href, style }: BioLinkProps) {
  return (
    <a
      href={href}
      className="bio-link"
      target="_blank"
      rel="noopener noreferrer"
      style={style}
    >
      <img src={icon} alt={label} className="bio-link__icon" />
      <span className="bio-link__label">{label}</span>
    </a>
  );
}
