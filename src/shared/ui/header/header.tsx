import s from './header.module.scss';

export const Header = ({ title }: {title?: string}) => {
  return (
    <header className={s.header}>
      <h1>{title}</h1>
    </header>
  )
}
