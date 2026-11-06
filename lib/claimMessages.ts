export type ClaimLang = "th" | "en";

export type ClaimReason =
  | "not_referred"
  | "no_qualifying_deposit"
  | "already_claimed"
  | "campaign_closed"
  | "campaign_not_found"
  | "streamer_not_found"
  | "unknown";

const REASON_MESSAGES: Record<ClaimReason, Record<ClaimLang, string>> = {
  not_referred: {
    th: "บัญชีนี้ยังไม่อยู่ภายใต้การแนะนำของสตรีมเมอร์รายนี้ กรุณาตรวจสอบลิงก์ที่ใช้สมัครหรือติดต่อทีมดูแลสมาชิก",
    en: "This account is not currently linked to this streamer. Please check the registration link you used or contact member support.",
  },
  no_qualifying_deposit: {
    th: "ยังไม่พบยอดฝากที่ตรงตามเงื่อนไขโปรโมชั่น กรุณาตรวจสอบเงื่อนไขและลองใหม่หลังทำรายการสำเร็จ",
    en: "We couldn't find a deposit that meets this campaign's requirements. Please review the terms and try again after completing the transaction.",
  },
  already_claimed: {
    th: "คุณได้ส่งคำขอรับโปรโมชั่นนี้แล้ว ไม่จำเป็นต้องส่งคำขอซ้ำ",
    en: "You have already submitted a request for this promotion. There is no need to submit it again.",
  },
  campaign_closed: {
    th: "โปรโมชั่นนี้ปิดรับคำขอแล้ว ติดตามสตรีมเมอร์เพื่อรับข่าวโปรโมชั่นรอบถัดไป",
    en: "This promotion is no longer accepting requests. Follow the streamer for the next campaign.",
  },
  campaign_not_found: {
    th: "ไม่พบโปรโมชั่นนี้ในระบบ กรุณาลองใหม่อีกครั้ง",
    en: "This promotion could not be found. Please try again.",
  },
  streamer_not_found: {
    th: "ไม่สามารถตรวจสอบสิทธิ์ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
    en: "We couldn't check your eligibility right now. Please try again.",
  },
  unknown: {
    th: "ไม่สามารถตรวจสอบสิทธิ์ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
    en: "We couldn't check your eligibility right now. Please try again.",
  },
};

export function reasonMessage(reason: string, lang: ClaimLang): string {
  const key = (
    reason in REASON_MESSAGES ? reason : "unknown"
  ) as ClaimReason;
  return REASON_MESSAGES[key][lang];
}

export const CLAIM_COPY: Record<string, Record<ClaimLang, string>> = {
  entryTitle: { th: "เช็คสิทธิ์และรับโบนัส", en: "Check Eligibility & Claim" },
  entryDescription: {
    th: "ตรวจสอบสิทธิ์ด้วยเบอร์โทรที่ใช้สมัครได้ด้วยตัวเอง",
    en: "Check your eligibility yourself using your registered phone number",
  },
  entryStatusOpen: { th: "เปิดรับอยู่", en: "Open now" },
  entryStatusClosed: {
    th: "ยังไม่มีโปรโมชั่นที่เปิดรับ",
    en: "No promotion is open right now",
  },
  formTitle: { th: "เช็คสิทธิ์รับโบนัส", en: "Check Bonus Eligibility" },
  phoneLabel: {
    th: "เบอร์โทรศัพท์ที่ใช้สมัคร",
    en: "Phone number used to register",
  },
  phoneErrorEmpty: {
    th: "กรุณากรอกเบอร์โทรศัพท์",
    en: "Please enter your phone number",
  },
  phoneErrorInvalid: {
    th: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
    en: "Please enter a valid 10-digit phone number",
  },
  privacyNote: {
    th: "ข้อมูลของคุณใช้เพื่อตรวจสอบสิทธิ์เท่านั้น และจะไม่แสดงชื่อผู้ใช้ภายในระบบ",
    en: "Your information is only used to check eligibility and your internal username is never shown.",
  },
  checkButton: { th: "เช็คสิทธิ์", en: "Check Eligibility" },
  checkingText: { th: "กำลังตรวจสอบสิทธิ์…", en: "Checking eligibility…" },
  eligibleTitle: {
    th: "คุณเข้าเงื่อนไขโปรโมชั่น",
    en: "You're Eligible",
  },
  eligibleDescription: {
    th: "ตรวจสอบข้อมูลเรียบร้อยแล้ว กรุณายืนยันเพื่อส่งคำขอรับโบนัส",
    en: "Verification complete. Please confirm to submit your bonus request.",
  },
  bonusLabel: { th: "โบนัสที่คุณได้รับ", en: "Your bonus" },
  confirmButton: { th: "ยืนยันรับโบนัส", en: "Confirm Claim" },
  backButton: { th: "ย้อนกลับ", en: "Back" },
  retryButton: { th: "ลองเช็คอีกครั้ง", en: "Try again" },
  contactSupportButton: {
    th: "ติดต่อทีมดูแลสมาชิก",
    en: "Contact member support",
  },
  submittingText: { th: "กำลังส่งคำขอ…", en: "Submitting your request…" },
  successTitle: { th: "รับคำขอเรียบร้อยแล้ว", en: "Request Received" },
  successDescription: {
    th: "คำขอของคุณกำลังรอเข้าสู่รอบส่งออกข้อมูลถัดไป",
    en: "Your request is waiting to enter the next data export round.",
  },
  claimAmountLabel: { th: "คำขอรับโบนัส", en: "Bonus requested" },
  countdownLabel: {
    th: "จะถูกส่งเข้าคิวประมวลผลใน",
    en: "Will enter the processing queue in",
  },
  countdownDisclaimer: {
    th: "เวลานี้คือรอบที่คำขอจะถูกส่งเข้าคิวประมวลผล ไม่ใช่เวลาที่โบนัสจะเข้าบัญชี ทีม Payment ยังต้องตรวจสอบและอัปโหลดข้อมูลเข้าสู่ระบบหลังบ้านอีกครั้ง",
    en: "This countdown shows when your request will enter the processing queue. It is not the time the bonus will reach your account. The Payment team must still review and upload the data to the back office.",
  },
  countdownWaiting: {
    th: "กำลังรอรอบประมวลผลถัดไป",
    en: "Waiting for the next processing round",
  },
  closeButton: { th: "ปิด", en: "Close" },
  doneButton: { th: "เสร็จสิ้น", en: "Done" },
  rateLimited: {
    th: "มีการตรวจสอบหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่",
    en: "Too many attempts. Please wait a moment and try again.",
  },
  networkError: {
    th: "เชื่อมต่อไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่",
    en: "Connection failed. Please check your internet and try again.",
  },
};

export function copy(key: keyof typeof CLAIM_COPY, lang: ClaimLang): string {
  return CLAIM_COPY[key][lang];
}
