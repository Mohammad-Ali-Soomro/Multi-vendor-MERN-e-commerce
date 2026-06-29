import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

import {
  footerProductLinks,
  footercompanyLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <footer className="bg-dark">
      {/* CTA Section - lavender */}
      <div className="w-11/12 max-w-[1200px] mx-auto pt-16 pb-6">
        <div className="lavender-section p-12 800px:p-16 mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="platform-pill text-xs">Mac</span>
            <span className="platform-pill text-xs">Windows</span>
            <span className="platform-pill text-xs">iOS</span>
            <span className="platform-pill text-xs">Android</span>
          </div>
          <h2 className="font-editorial text-[clamp(2rem,5vw,4rem)] font-bold text-dark my-6 leading-tight">
            ShopVerse, wherever<br />you shop
          </h2>
          <p className="font-sans text-text-muted max-w-[480px] mx-auto mb-8">
            Discover unique products from verified sellers across every category. Your one-stop marketplace.
          </p>
          <Link to="/products">
            <button className="btn-dark px-8 py-4">Start Shopping</button>
          </Link>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 800px:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="col-span-2 800px:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="14" width="4" height="12" rx="2" fill="#C9B1F0"/>
                <rect x="8" y="8" width="4" height="18" rx="2" fill="#C9B1F0"/>
                <rect x="14" y="4" width="4" height="22" rx="2" fill="#C9B1F0"/>
                <rect x="20" y="10" width="4" height="16" rx="2" fill="#C9B1F0"/>
              </svg>
              <span className="font-editorial font-bold text-lg text-cream">ShopVerse</span>
            </div>
            <p className="font-sans text-sm text-cream/40 leading-relaxed mb-4">
              The home for unique products and verified sellers.
            </p>
            <div className="flex gap-3">
              {[AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillYoutube].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
                  <Icon size={16} className="text-cream/60" />
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Company", links: footerProductLinks },
            { title: "Shop", links: footercompanyLinks },
            { title: "Support", links: footerSupportLinks },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-sans font-semibold text-cream text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.link || "#"}
                      className="font-sans text-sm text-cream/40 hover:text-cream/80 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col 800px:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-sm text-cream/30">© 2026 ShopVerse. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="font-sans text-sm text-cream/30 cursor-pointer hover:text-cream/60 transition-colors">Terms</span>
            <span className="font-sans text-sm text-cream/30 cursor-pointer hover:text-cream/60 transition-colors">Privacy</span>
            <span className="font-sans text-sm text-cream/30 cursor-pointer hover:text-cream/60 transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
