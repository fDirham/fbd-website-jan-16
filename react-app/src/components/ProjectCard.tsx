interface ProjectCardProps {
  icon: string;
  title: string;
  description: string;
  url: string;
  style?: React.CSSProperties;
}

export default function ProjectCard({
  icon,
  title,
  description,
  url,
  style,
}: ProjectCardProps) {
  return (
    <a
      href={url}
      className="project-card"
      target="_blank"
      rel="noopener noreferrer"
      style={style}
    >
      <div className="project-card__header">
        <img src={icon} alt={title} className="project-card__icon" />
        <h3 className="project-card__title">{title}</h3>
      </div>
      <p className="project-card__description">{description}</p>
    </a>
  );
}
