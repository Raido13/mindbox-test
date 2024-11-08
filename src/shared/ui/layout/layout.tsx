import { ReactNode } from "react";
import { Header } from "../header/header";
import s from './layout.module.scss';

type TProps = {
  children?: ReactNode;
  header?: boolean;
  title?: string;
}

export const Layout = ({children, header = false, title}: TProps) => {
  return (
    <div className={s.layout}>
      {header && <Header title={title}/>}
      <div className={s.layout__container}>
        {children}
      </div>
    </div>
  )
}
