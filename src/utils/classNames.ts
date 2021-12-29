export const classNames = (...classes: (string | null | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');
