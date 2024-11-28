import s from './header.module.scss';

export const Header = ({ title }: { title?: string }) => {
  return (
    <header className={s.header}>
      <h1 className={s.header__title}>{title}</h1>
    </header>
  );
};
