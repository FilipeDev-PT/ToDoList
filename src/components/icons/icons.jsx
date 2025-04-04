import style from "./icons.module.css";
import * as LucideIcons from "lucide-react";

export default function Icons({ name, onClick, className }) {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Ícone "${name}" não encontrado.`);
    return null;
  }

  return (
    <button onClick={onClick} className={style.buttonIcons}>
      <LucideIcon className={`${className ? style[className] : ""}`} />
    </button>
  );
}
