export default function Discord(props: JSX.IntrinsicElements["div"]) {
  return (
    <div>
      <img src="/docs/images/discord_text_white.png" className="w-9/12 dark:block hidden" onMouseEnter={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_white.gif"} onMouseLeave={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_white.png"}/>
      <img src="/docs/images/discord_text_black.png" className="w-9/12 dark:hidden" onMouseEnter={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_black.gif"} onMouseLeave={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_black.png"}/>
    </div>
  );
}
