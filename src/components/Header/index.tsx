import Image from 'next/image';
import logo from '../../../../ignews/public/images/logo.svg';
import ActiveLink from './ActiveLink';
import { SignInButton } from './SignInButton';
import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
             <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
      <SignInButton />
      </div>
    </header>
  )
}