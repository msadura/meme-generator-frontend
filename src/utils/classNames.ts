export const classNames = (...classes: (string | null | false)[]) =>
  classes.filter(Boolean).join(' ');
