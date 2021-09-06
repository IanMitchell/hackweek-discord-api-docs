export default function Discord(props: JSX.IntrinsicElements["img"]) {
  return (
    <div>
      <img src="/docs/images/discord_text_white.png" className={`dark:block hidden ${props.className}`} onMouseEnter={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_white.gif"} onMouseLeave={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_white.png"}/>
      <img src="/docs/images/discord_text_black.png" className={`dark:hidden ${props.className}`} onMouseEnter={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_black.gif"} onMouseLeave={e => (e.target as HTMLImageElement).src = "/docs/images/discord_text_black.png"}/>
    </div>
  );
}
