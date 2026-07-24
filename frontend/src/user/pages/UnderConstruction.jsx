import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Picks a new one on every visit - the whole point is it never gets old
// while this page is a placeholder. Keep additions in the same
// {emoji, headline, subtext} shape.
const bits = [
  {
    emoji: "🚧",
    headline: "bro really said “coming soon” and left it there",
    subtext: "no cap, we're cooking. the wifi's fine, this page just isn't.",
  },
  {
    emoji: "💀",
    headline: "this page said 'not today' and meant it",
    subtext: "manifesting it finishing itself so we don't have to.",
  },
  {
    emoji: "🫠",
    headline: "task failed successfully",
    subtext: "it's giving unfinished business. very mysterious. very us.",
  },
  {
    emoji: "🔧",
    headline: "the devs are so back (eventually)",
    subtext: "we promise it's not vaporware, just fashionably late.",
  },
  {
    emoji: "🐢",
    headline: "loading since 2026, still going strong",
    subtext: "touch some grass while this cooks, we'll wait for you too.",
  },
  {
    emoji: "🚀",
    headline: "plot twist: this page doesn't exist yet",
    subtext: "the suspense is doing numbers though, ngl.",
  },
  {
    emoji: "🛠️",
    headline: "under construction, over ambition",
    subtext: "we bit off more than we could chew and we're chewing anyway.",
  },
  {
    emoji: "☕",
    headline: "the dev is on a coffee break, it's been 3 days",
    subtext: "we'd say 'almost done' but we've said that before too.",
  },
  {
    emoji: "🙈",
    headline: "it's not broken, it's just shy",
    subtext: "this page has main character energy, it just needs a minute.",
  },
  {
    emoji: "📉",
    headline: "productivity: down bad. vibes: immaculate.",
    subtext: "we're not procrastinating, we're marinating.",
  },
  {
    emoji: "🧃",
    headline: "juice box error: page not juicy enough yet",
    subtext: "give it a sec, it's getting there. allegedly.",
  },
  {
    emoji: "🕹️",
    headline: "this page is still stuck on the loading screen of life",
    subtext: "press start again later, results may vary.",
  },
  {
    emoji: "🧟",
    headline: "the page is technically alive, just not functional",
    subtext: "kind of like us on a monday morning tbh.",
  },
  {
    emoji: "📦",
    headline: "your page has shipped! jk it hasn't, lol",
    subtext: "tracking number: still in the dev's head somewhere.",
  },
  {
    emoji: "🫡",
    headline: "we regret to inform you: nothing is ready",
    subtext: "but we salute your dedication to checking anyway.",
  },
  {
    emoji: "🎢",
    headline: "buckle up, this feature is still in the workshop",
    subtext: "safety first, half-finished code second.",
  },
  {
    emoji: "🐌",
    headline: "moving at the speed of a caffeinated snail",
    subtext: "slow, but with intent. mostly intent.",
  },
  {
    emoji: "🥲",
    headline: "we said 'this week' three weeks ago",
    subtext: "time is a construct, deadlines are more of a suggestion.",
  },
  {
    emoji: "🎯",
    headline: "so close, yet so very not close",
    subtext: "we can see the finish line, we just haven't started running.",
  },
  {
    emoji: "🫥",
    headline: "this page ghosted you, we're so sorry",
    subtext: "it's not you, it's the roadmap. it's always the roadmap.",
  },
  {
    emoji: "🌧️",
    headline: "we're not okay, but the coffee's helping",
    subtext:
      "this page is basically our to-do list: long, ignored, still there.",
  },
  {
    emoji: "🕯️",
    headline: "rip to the version of us that thought this'd be quick",
    subtext: "he was young. he was naive. he estimated 'two days'.",
  },
  {
    emoji: "🛌",
    headline: "the page is tired, the devs are tired, we're all tired",
    subtext: "everything's fine. everything is completely, definitely fine.",
  },
  {
    emoji: "📵",
    headline: "error 404: motivation not found",
    subtext: "we checked the couch cushions. it's not there either.",
  },
  {
    emoji: "🎭",
    headline: "pretending this was intentional the whole time",
    subtext: "it's not a bug, it's a lifestyle choice.",
  },
  {
    emoji: "🍂",
    headline: "this page has seen some seasons and finished none of them",
    subtext: "relatable, honestly. we're all a work in progress.",
  },
  {
    emoji: "🧊",
    headline: "cool, calm, and completely unfinished",
    subtext: "we contain multitudes. mostly missing features.",
  },
  {
    emoji: "🎬",
    headline: "season finale: to be continued (indefinitely)",
    subtext: "renewed for another season, no release date, classic move.",
  },
];

const pickRandom = () => bits[Math.floor(Math.random() * bits.length)];

const UnderConstruction = () => {
  const rootRef = useRef(null);
  const location = useLocation();

  const [content, setContent] = useState(pickRandom);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setContent(pickRandom());
  }, [location.key]);

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".uc-emoji", {
          scale: 0,
          rotate: -25,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        })
        .from(".uc-headline", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".uc-subtext", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          ".uc-progress",
          { scaleX: 0, transformOrigin: "left", duration: 0.6 },
          "-=0.2",
        )
        .from(
          ".uc-cta",
          { y: 16, opacity: 0, duration: 0.4, stagger: 0.1 },
          "-=0.3",
        );

      gsap.to(".uc-emoji", {
        rotate: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });
    },
    { scope: rootRef, dependencies: [location.key] },
  );

  return (
    <section
      ref={rootRef}
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden relative"
    >
      {/* Decorative blobs - same soft-glow language as the hero sections */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-blue-300/30 blur-3xl" />

      <div className="relative max-w-lg w-full bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
        <div className="uc-emoji inline-block text-6xl sm:text-7xl mb-6">
          {content.emoji}
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
          Page under construction
        </span>

        <h1 className="uc-headline text-2xl sm:text-3xl font-extrabold text-blue-950 leading-snug">
          {content.headline}
        </h1>

        <p className="uc-subtext text-gray-600 mt-4 text-base sm:text-lg">
          {content.subtext}
        </p>

        {/* Fake progress bar, permanently stuck - it's a bit */}
        <div className="mt-8">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
            <span>build progress</span>
            <span>2%</span>
          </div>
          <div className="h-3 rounded-full bg-blue-50 border border-blue-100 overflow-hidden">
            <div className="uc-progress h-full w-[2%] bg-[#0a54ff] rounded-full" />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="uc-cta px-6 py-3 bg-[#0a54ff] text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Take me home
          </Link>

          <Link
            to="/products"
            className="uc-cta px-6 py-3 border border-blue-200 text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Browse stuff that works
          </Link>

          <Link
            to="/contact-us"
            className="uc-cta px-6 py-3 border border-blue-200 text-blue-900 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            Contact us instead
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-8">
          new excuse every time you land here, we've got a whole list 🔁
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;
