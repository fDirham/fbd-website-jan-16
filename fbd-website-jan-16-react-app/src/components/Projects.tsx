import ProjectCard from "./ProjectCard";
import {
  PROMETHEA_ICON,
  BOOK_YAPPY_ICON,
  NEKO_FOCUS_ICON,
  JUST_FOCUS_ICON,
  ROCKET_PIXELS_ICON,
  PROFFY_AI_ICON,
  GITHUB_ICON_BLACK,
  GITHUB_ICON_WHITE,
} from "../constants/images";
import useTheme from "../contexts/theme/useTheme";

export default function Projects() {
  const { theme } = useTheme();

  const githubIcon = theme === "dark" ? GITHUB_ICON_WHITE : GITHUB_ICON_BLACK;

  const getProjects = () => {
    return [
      {
        icon: PROMETHEA_ICON,
        title: "Promethea (Novel)",
        description:
          "In a matriarchal Spartan war-academy, a ruthless warrior captures enemy forces, rides flying Drakons, and masters telepathy on her quest to become one of history's greatest heroines.",
      },
      {
        icon: BOOK_YAPPY_ICON,
        title: "Book Yappy",
        description: "iOS app to track your reading.",
      },
      {
        icon: NEKO_FOCUS_ICON,
        title: "NekoFocus",
        description: "iOS app. Pomodoro timer + cats.",
      },
      {
        icon: JUST_FOCUS_ICON,
        title: "Just Focus",
        description: "macOS app. Pomodoro timer in status bar",
      },
      {
        icon: ROCKET_PIXELS_ICON,
        title: "Rocket Pixels",
        description: "Mobile game made in godot. Dodge asteroids!",
      },
      {
        icon: PROFFY_AI_ICON,
        title: "ProffyAI",
        description: "AI homework helper",
      },
      {
        icon: githubIcon,
        title: "Hacker Search",
        description: "Semantic search engine to discover indie products",
      },
      {
        icon: githubIcon,
        title: "Gift Gabble",
        description: "AI gift recommendations + Amazon affiliate links",
      },
      {
        icon: githubIcon,
        title: "Open Source Stuff",
        description: "Idk just check my gh",
      },
    ];
  };

  return (
    <div className="projects">
      {getProjects().map((project) => (
        <ProjectCard
          key={project.title}
          icon={project.icon}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
}
