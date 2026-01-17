import ProjectCard from "./ProjectCard";
import {
  PROMETHEA_ICON,
  BOOK_YAPPY_ICON,
  NEKO_FOCUS_ICON,
  JUST_FOCUS_ICON,
  ROCKET_PIXELS_ICON,
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
        url: "https://example.com/promethea",
      },
      {
        icon: BOOK_YAPPY_ICON,
        title: "Book Yappy",
        description: "iOS app to track your reading.",
        url: "https://example.com/book-yappy",
      },
      {
        icon: NEKO_FOCUS_ICON,
        title: "NekoFocus",
        description: "iOS app. Pomodoro timer + cats.",
        url: "https://example.com/nekofocus",
      },
      {
        icon: JUST_FOCUS_ICON,
        title: "Just Focus",
        description: "macOS app. Pomodoro timer in status bar",
        url: "https://example.com/just-focus",
      },
      {
        icon: ROCKET_PIXELS_ICON,
        title: "Rocket Pixels",
        description: "Mobile game made in godot. Dodge asteroids!",
        url: "https://example.com/rocket-pixels",
      },
      {
        icon: githubIcon,
        title: "Open Source Projects",
        description: "JUST CHECK MY GITHUB!",
        url: "https://github.com",
      },
    ];
  };

  return (
    <div className="projects">
      {getProjects().map((project, index) => (
        <ProjectCard
          key={project.title}
          icon={project.icon}
          title={project.title}
          description={project.description}
          url={project.url}
          style={{
            animationDelay: `${3 + index * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
