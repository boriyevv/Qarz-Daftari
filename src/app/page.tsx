import { redirect } from "next/navigation";

export default function HomePage() {
  // main page faqat redirect qiladi
  redirect("/dashboard");
}
