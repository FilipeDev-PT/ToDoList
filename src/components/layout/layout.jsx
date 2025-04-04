import style from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={style.ContainerGlobal}>
      <div className={style.containerContent}>{children}</div>
    </div>
  );
}
