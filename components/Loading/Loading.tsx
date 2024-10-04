import css from './Loading.module.css';

const classes = [
  css['la-ball-clip-rotate-multiple'],
  css['la-dark'],
  css['la-3x'],
  css['centered']
].join(' ');


export default function Loading() {
  return (
    <div className={`${classes} z-[99]`}>
      <div />
      <div />
    </div>
  );
}
