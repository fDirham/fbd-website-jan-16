interface BioLinkProps {
  icon: string;
  label: string;
  href: string;
}

export default function BioLink({ icon, label, href }: BioLinkProps) {
  return (
    <a href={href} className="bio-link" target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={label} className="bio-link__icon" />
      <span className="bio-link__label">{label}</span>
    </a>
  );
}
