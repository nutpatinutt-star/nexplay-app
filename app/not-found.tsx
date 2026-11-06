import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span>404</span>
      <h1>ไม่พบหน้าที่คุณกำลังค้นหา</h1>
      <p>ลิงก์นี้อาจถูกย้ายหรือไม่มีอยู่แล้ว</p>
      <Link href="/">
        <ArrowLeft size={16} />
        กลับหน้าหลัก
      </Link>
    </main>
  );
}
