import { Menu } from 'src/menu/entities/menu.entity';

export const getPermissions = (arr: Array<Menu>) => {
  return arr.reduce((prev, next) => {
    if (next.menuType === 3) {
      prev.push(next.permission);
    }
    return prev;
  }, []);
};
