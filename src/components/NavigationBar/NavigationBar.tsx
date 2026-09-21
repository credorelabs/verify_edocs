import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink, Menu, Shield, X } from "react-feather";
import { IS_DEVELOPMENT } from "../../config";

const TRADETRUST_VERIFY_URL = IS_DEVELOPMENT ? "https://dev.tradetrust.io/verify" : "https://tradetrust.io/verify";

interface NavLinkItem {
  label: string;
  to: string;
  external?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Verify", to: "/" },
  { label: "Documentation", to: "https://www.credore.in", external: true },
  { label: "Contact", to: "https://www.credore.in", external: true },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146c94] focus-visible:ring-offset-2";

const isVerifyRoute = (pathname: string): boolean => pathname === "/" || pathname.startsWith("/viewer");

export const NavigationBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const renderExternalGlyph = () => <ExternalLink size={14} className="shrink-0 text-[#89969f]" aria-hidden="true" />;

  return (
    <nav className="relative" data-testid="navigation-bar">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b border-[#dce6ee] bg-white/90 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_rgba(16,42,67,0.08)]" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-screen-lg items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <a
            href="/"
            onClick={closeMenu}
            className={`group flex shrink-0 items-center gap-3 rounded-xl ${FOCUS_RING}`}
            aria-label="Credore — home"
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#e4e0ec] transition-shadow duration-200 group-hover:shadow-md">
              <img
                src="https://www.credore.xyz/assets/images/logo-small.png"
                className="h-7 w-auto object-contain"
                alt="Credore"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-base leading-tight font-gilroy-bold tracking-tight text-[#102a43]">Credore</p>
              <p className="font-gilroy-medium text-[10px] font-normal uppercase tracking-[0.18em] text-[#89969f]">
                Document Verification
              </p>
            </div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1.5 md:flex">
            {NAV_LINKS.map((item) => {
              const isActive = !item.external && isVerifyRoute(location.pathname);

              const linkClasses = isActive
                ? "relative rounded-lg px-3 py-2 text-sm font-gilroy-bold text-[#146c94] after:absolute after:inset-x-3 after:-bottom-[2px] after:h-[2px] after:rounded-full after:bg-[#146c94] after:content-['']"
                : "relative rounded-lg px-3 py-2 text-sm font-gilroy-medium text-[#526b7e] transition-colors hover:bg-[#edf5f8] hover:text-[#0f5879]";

              return item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 ${linkClasses} ${FOCUS_RING}`}
                >
                  {item.label}
                  {renderExternalGlyph()}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.to}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 ${linkClasses} ${FOCUS_RING}`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 items-center md:flex">
            <a
              href={TRADETRUST_VERIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl bg-[#146c94] px-4 py-2.5 text-sm font-gilroy-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f5879] hover:shadow-md ${FOCUS_RING}`}
            >
              Verify in TradeTrust
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            ref={toggleRef}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navigation-mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce6ee] bg-white text-[#102a43] shadow-sm transition-colors hover:bg-[#edf5f8] md:hidden ${FOCUS_RING}`}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Click-away backdrop (mobile only) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#102a43]/25 backdrop-blur-[2px] md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        id="navigation-mobile-menu"
        aria-hidden={!menuOpen}
        className={`sticky top-[72px] z-40 md:hidden ${menuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="border-x border-b border-[#dce6ee] bg-white px-4 pb-5 pt-3 shadow-[0_18px_40px_rgba(16,42,67,0.14)] sm:px-6">
              <nav aria-label="Mobile primary">
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {/* Primary: verify a credential */}
                  <li>
                    <a
                      href="/"
                      onClick={closeMenu}
                      aria-current={isVerifyRoute(location.pathname) ? "page" : undefined}
                      className={`group inline-flex w-full items-center justify-between gap-2 rounded-xl bg-[#146c94] px-4 py-3 text-sm font-gilroy-bold text-white shadow-sm transition-all duration-200 hover:bg-[#0f5879] ${FOCUS_RING}`}
                    >
                      Verify a credential
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  {/* Secondary: verify in TradeTrust */}
                  <li>
                    <a
                      href={TRADETRUST_VERIFY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className={`inline-flex w-full items-center justify-between gap-2 rounded-xl border border-[#a9c1d0] bg-white px-4 py-3 text-sm font-gilroy-bold text-[#146c94] transition-colors hover:bg-[#edf5f8] hover:text-white ${FOCUS_RING}`}
                    >
                      Verify in TradeTrust
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </nav>

              <hr className="my-4 border-[#e7eaec]" />

              <nav aria-label="Mobile links">
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {NAV_LINKS.filter((item) => item.external).map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className={`inline-flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-gilroy-medium text-[#526b7e] transition-colors hover:bg-[#edf5f8] hover:text-[#0f5879] ${FOCUS_RING}`}
                      >
                        {item.label}
                        {renderExternalGlyph()}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Status strip */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#dce6ee] bg-[#f6fafc] px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-gilroy-bold text-[10px] font-bold uppercase tracking-[0.14em] text-[#526b7e]">
                    Verification Portal
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-gilroy-medium text-[10px] text-[#89969f]">
                  <Shield size={12} aria-hidden="true" />
                  Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
