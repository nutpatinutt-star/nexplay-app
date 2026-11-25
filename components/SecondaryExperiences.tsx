"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Check,
  Clock3,
  Gift,
  MessageCircle,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PromoCardArt from "@/components/PromoCardArt";
import { getPromotionsFor, halloweenPromoArt } from "@/data/promotions";
import {
  DEFAULT_STREAMER,
  streamerRoute,
  type StreamerConfig,
} from "@/data/streamers";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { externalLinkProps } from "@/lib/links";
import { trackMetaEvent } from "@/lib/metaPixel";

function PageHeading({
  eyebrow,
  title,
  description,
  backHref,
  isBengali,
}: {
  eyebrow: string;
  title: string;
  description: string;
  backHref: string;
  isBengali?: boolean;
}) {
  return (
    <section className="page-heading neon-panel">
      <div className="page-heading-glow" aria-hidden="true" />
      <Link href={backHref} className="back-link">
        <ArrowLeft size={15} />
        {isBengali ? "হোম" : "หน้าหลัก"}
      </Link>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{description}</span>
    </section>
  );
}

export function PromotionsExperience({
  streamer = DEFAULT_STREAMER,
}: {
  streamer?: StreamerConfig;
}) {
  const reduceMotion = useReducedMotion();
  const isBengali = streamer.locale === "bn";
  const promotions = getPromotionsFor(streamer);

  return (
    <main className="secondary-main">
      <PageHeading
        eyebrow={isBengali ? "SLADE OFFERS" : "NEXPLAY REWARDS"}
        title={isBengali ? "সকল অফার" : "โปรโมชั่นทั้งหมด"}
        description={
          isBengali
            ? `${streamer.name} এর সদস্যদের জন্য বিশেষ অফার`
            : `รวมโบนัสและสิทธิพิเศษที่คัดมาเพื่อสมาชิก ${streamer.name}`
        }
        backHref={streamerRoute(streamer, "")}
        isBengali={isBengali}
      />

      <div className="promotion-list">
        {promotions.map((promotion, index) => {
          const comingSoon = promotion.availability === "coming-soon";
          const ctaUrl =
            promotion.ctaTarget === "line"
              ? streamer.links.line
              : promotion.ctaTarget === "vip"
                ? streamer.links.vip
                : streamer.links.register;

          return (
            <motion.article
              key={promotion.id}
              className={[
                "promotion-list-card",
                `promo-${promotion.accent}`,
                comingSoon ? "is-coming-soon" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
            >
              <PromoCardArt
                icon={promotion.icon}
                photoOverride={halloweenPromoArt(
                  streamer.slug,
                  promotion.icon,
                )}
                photoAlt={promotion.title}
              />
              <div className="promotion-list-scrim" />
              {comingSoon && (
                <span className="promotion-coming-status">
                  <Clock3 size={13} />
                  {isBengali ? "শীঘ্রই আসছে" : "เร็ว ๆ นี้"}
                </span>
              )}
              <div className="promotion-list-content">
                <span className="promo-badge">
                  {comingSoon ? "COMING SOON" : promotion.badge}
                </span>
                <h2>{promotion.title}</h2>
                <p>{promotion.detail}</p>
                {comingSoon ? (
                  <span
                    className="promo-cta promo-cta-coming"
                    aria-disabled="true"
                  >
                    {isBengali ? "শীঘ্রই চালু হবে" : "ยังไม่เปิดให้บริการ"}
                    <Clock3 size={13} />
                  </span>
                ) : (
                  <a
                    {...externalLinkProps(ctaUrl)}
                    className="promo-cta"
                    aria-label={`${promotion.cta}: ${promotion.title}`}
                    onClick={(event) => {
                      if (!ctaUrl) {
                        event.preventDefault();
                        return;
                      }
                      if (
                        promotion.ctaTarget === "register" ||
                        promotion.ctaTarget === "line"
                      ) {
                        trackLinkClick(streamer.slug, promotion.ctaTarget);
                        trackEvent(
                          promotion.ctaTarget === "register"
                            ? "register_click"
                            : "line_click",
                          { streamer_slug: streamer.slug, placement: "promotion_list" },
                        );
                        trackMetaEvent(
                          promotion.ctaTarget === "register" ? "Lead" : "Contact",
                          {
                            content_name: promotion.ctaTarget,
                            streamer_slug: streamer.slug,
                          },
                        );
                      }
                      trackEvent("promotion_click", {
                        streamer_slug: streamer.slug,
                        placement: "promotion_list",
                        promotion_id: promotion.id,
                        promotion_category: promotion.category,
                      });
                    }}
                  >
                    {promotion.cta}
                    <ArrowRight size={13} />
                  </a>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      <section className="terms-note glass-panel">
        <ShieldCheck size={20} />
        <div>
          <strong>{isBengali ? "শর্তাবলী" : "เงื่อนไขโปรโมชั่น"}</strong>
          <p>
            {isBengali
              ? "সুবিধা নেওয়ার আগে প্রতিটি অফারের বিস্তারিত দেখে নিন"
              : "โปรดตรวจสอบรายละเอียดของแต่ละโปรโมชั่นก่อนรับสิทธิ์"}
          </p>
        </div>
      </section>
    </main>
  );
}

const LIVE_SLOTS = [
  { label: "รอบกลางวัน", time: "13:00 – 15:00" },
  { label: "รอบค่ำ", time: "19:00 – 21:00" },
];

const LIVE_SLOTS_BN = [
  { label: "দিনের সেশন", time: "1:00 – 3:00 PM" },
  { label: "সন্ধ্যার সেশন", time: "7:00 – 9:00 PM" },
];

export function FollowExperience({
  streamer = DEFAULT_STREAMER,
}: {
  streamer?: StreamerConfig;
}) {
  const reduceMotion = useReducedMotion();
  const isBengali = streamer.locale === "bn";
  const liveSlots = isBengali ? LIVE_SLOTS_BN : LIVE_SLOTS;
  // Slade has no LINE — the "connect" card repeats the register link instead,
  // same reasoning as the CTA row's second button.
  const connectHref = streamer.singleCta
    ? streamer.links.register
    : streamer.links.line;

  return (
    <main className="secondary-main">
      <PageHeading
        eyebrow="STAY CONNECTED"
        title={isBengali ? `${streamer.name} কে ফলো করুন` : `ติดตาม ${streamer.name}`}
        description={
          isBengali
            ? "লাইভ, নতুন অফার এবং সদস্যদের জন্য বিশেষ সুবিধা মিস করবেন না"
            : "ไม่พลาดไลฟ์ โปรโมชั่นใหม่ และสิทธิพิเศษสำหรับสมาชิก"
        }
        backHref={streamerRoute(streamer, "")}
        isBengali={isBengali}
      />

      <motion.section
        className="follow-hero neon-panel"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <Image
          src={streamer.heroImage}
          alt=""
          fill
          sizes="(max-width: 540px) 100vw, 520px"
          className="follow-hero-image"
        />
        <div className="follow-hero-scrim" />
        <div className="follow-hero-copy">
          <span className="live-badge">LIVE</span>
          <h2>
            {isBengali ? "প্রতিদিন লাইভ" : "ไลฟ์ทุกวัน"}
            <span>
              {isBengali ? "সাথে তাৎক্ষণিক বোনাস" : "พร้อมโบนัสทันใจ"}
            </span>
          </h2>
          <p>
            {isBengali
              ? "লাইভ শুরুর আগে নোটিফিকেশন পেতে মূল চ্যানেল ফলো করুন"
              : "ติดตามช่องทางหลักเพื่อรับแจ้งเตือนก่อนเริ่มไลฟ์"}
          </p>
        </div>
      </motion.section>

      <motion.section
        className="line-connect-card"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
      >
        <span className="line-connect-icon">
          <MessageCircle size={27} />
        </span>
        <div>
          <small>{streamer.singleCta ? "OFFICIAL" : "LINE OFFICIAL"}</small>
          <h2>{isBengali ? "প্রধান যোগাযোগ" : "ช่องทางติดตามหลัก"}</h2>
          <p>
            {isBengali
              ? "রেজিস্ট্রেশন করে সর্বশেষ অফার ও বোনাস পান"
              : "รับข่าว โปรโมชั่น และติดต่อทีมงานได้โดยตรง"}
          </p>
        </div>
        <a
          {...externalLinkProps(connectHref)}
          className="line-connect-cta"
          aria-label={
            isBengali
              ? `${streamer.name} তে রেজিস্ট্রেশন করুন`
              : `เพิ่มเพื่อน ${streamer.name} ทาง LINE`
          }
          onClick={() => {
            if (streamer.singleCta) {
              trackLinkClick(streamer.slug, "register");
              trackEvent("register_click", {
                streamer_slug: streamer.slug,
                placement: "follow_page",
              });
              trackMetaEvent("Lead", {
                content_name: "register",
                streamer_slug: streamer.slug,
              });
              return;
            }
            trackLinkClick(streamer.slug, "line");
            trackEvent("line_click", {
              streamer_slug: streamer.slug,
              placement: "follow_page",
            });
            trackMetaEvent("Contact", {
              content_name: "line",
              streamer_slug: streamer.slug,
            });
          }}
        >
          {isBengali ? "রেজিস্ট্রেশন" : "เพิ่มเพื่อน"}
          <ArrowRight size={15} />
        </a>
      </motion.section>

      <section className="follow-section">
        <div className="section-heading">
          <h2>
            <Radio size={17} />
            {isBengali ? "প্রতিদিনের লাইভ সময়সূচী" : "ตารางไลฟ์ประจำวัน"}
          </h2>
        </div>
        <div className="live-slot-grid">
          {liveSlots.map((slot, index) => (
            <motion.article
              key={slot.label}
              className="live-slot glass-panel"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
            >
              <span className="live-slot-icon">
                <Clock3 size={18} />
              </span>
              <small>{slot.label}</small>
              <strong>{slot.time}</strong>
              <p>{isBengali ? "প্রতিদিন" : "ทุกวัน"}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="benefit-card glass-panel">
        <div className="benefit-title">
          <span>
            <BellRing size={20} />
          </span>
          <div>
            <small>MEMBER UPDATES</small>
            <h2>{isBengali ? "ফলো করলে কী পাবেন?" : "ติดตามแล้วได้อะไร?"}</h2>
          </div>
        </div>
        <ul>
          {(isBengali
            ? [
                "প্রতিটি লাইভ শুরুর আগে নোটিফিকেশন",
                "সর্বশেষ অফার ও বোনাস আপডেট",
                "সরাসরি সাপোর্ট যোগাযোগ",
              ]
            : [
                "แจ้งเตือนก่อนเริ่มไลฟ์ทุกช่วง",
                "อัปเดตโปรโมชั่นและเครดิตฟรีล่าสุด",
                "ช่องทางติดต่อทีมงานได้โดยตรง",
              ]
          ).map((benefit) => (
            <li key={benefit}>
              <span>
                <Check size={13} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <section className="follow-footer-note">
        <Sparkles size={17} />
        <span>
          {isBengali
            ? `${streamer.name} থেকে সব খবর ও বিশেষ সুবিধা`
            : `ข่าวสารและสิทธิพิเศษทั้งหมดจาก ${streamer.name}`}
        </span>
        <Gift size={17} />
      </section>
    </main>
  );
}
