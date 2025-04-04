import style from "./loading.module.css";

export default function Loading() {
  return (
    <div className={style.containerLoading}>
      <div className={style.contentLoading}></div>
    </div>
  );
}
