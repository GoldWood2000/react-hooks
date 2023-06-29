import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/01_v18hooks">v18Hooks</Link>
        </li>
        <li>
          <Link to="/02_ahooks">ahooks</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
