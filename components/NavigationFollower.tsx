import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import SubLinkContext from "../contexts/SubLinkContext";

export default function NavigationFollower() {
  const router = useRouter();
  const subLinkContext = useContext(SubLinkContext);
  const dispatch = subLinkContext.setActive;

  useEffect(() => {
    if (!router.asPath.includes("#")) dispatch({ type: "direct", payload: "" });
    const activePage = router.basePath + router.pathname;
    let navPageSublinks = document.querySelectorAll(
      `nav a[href^="${activePage}#"]`
    );

    const observers = new Set<IntersectionObserver>();
    let timeout: NodeJS.Timeout | null = null;
    async function addObservers() {
      if (navPageSublinks.length === 0) {
        let time = 100;
        let waitAdditional = (res: () => void) =>
          (timeout = setTimeout(() => {
            navPageSublinks = document.querySelectorAll(
              `nav a[href^="${activePage}#"]`
            );
            if (navPageSublinks.length === 0) {
              if (time > 2000) res();
              time *= 2;
            } else {
              res();
            }
          }, time));
        await new Promise<void>((res) => waitAdditional(res));
        if (navPageSublinks.length === 0) return;
      }
      const navIds: string[] = [];
      for (const elem of navPageSublinks) {
        const href = elem.getAttribute("href");
        const id = href?.split("#")[1];
        if (id) navIds.push(id);
      }

      let currentPageLinks = document.querySelectorAll("main article > a");
      if (currentPageLinks.length === 0) return;
      const update = (entries: IntersectionObserverEntry[]) =>
        dispatch({
          type: "scroll",
          payload: { currentPath: router.pathname, navIds, entries },
        });

      for (const elem of currentPageLinks) {
        const id = elem.getAttribute("href")?.slice(1);
        if (!id || !navIds.includes(id)) continue;
        const observer = new IntersectionObserver(update, {
          root: document.querySelector("main")?.parentElement,
          rootMargin: "0px 0px -80% 0px",
          threshold: 0,
        });
        observers.add(observer);
        observer.observe(elem);
      }
    }

    addObservers();
    return () => {
      if (timeout) clearTimeout(timeout);
      for (const observer of observers) {
        observer.disconnect();
      }
      observers.clear();
    };
  }, [router.basePath, router.pathname, router.asPath, dispatch]);

  return null;
}

export function updateNavReducer(state: string, action: any) {
  if (action.type !== "scroll") {
    return action.payload;
  }
  const { entries, navIds, currentPath } = action.payload;
  const entry = entries[0];
  const intersectingHeight = entry.rootBounds!.height;
  let toBeActive: string | null = null;
  if (
    !entry.isIntersecting &&
    intersectingHeight * 0.9 < entry.boundingClientRect.top &&
    entry.boundingClientRect.top < intersectingHeight * 1.2
  ) {
    const currentIndex = navIds.indexOf(
      entry.target.getAttribute("href")!.slice(1)
    );
    toBeActive = navIds[currentIndex - 1];
  }
  if (entry.isIntersecting) {
    toBeActive = entry.target.getAttribute("href")!.slice(1);
  }
  if (!toBeActive) return state;
  return `${currentPath}#${toBeActive}`;
}
