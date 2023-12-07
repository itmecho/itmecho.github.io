type ClassOption = string | boolean | undefined;

export const cx = (...classes: ClassOption[]) =>
  classes.filter((c) => !!c).join(' ');

export default cx;
