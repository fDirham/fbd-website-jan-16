interface ProjectCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ProjectCard({ icon, title, description }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-card__header">
        <img src={icon} alt={title} className="project-card__icon" />
        <h3 className="project-card__title">{title}</h3>
      </div>
      <p className="project-card__description">{description}</p>
    </div>
  );
}
