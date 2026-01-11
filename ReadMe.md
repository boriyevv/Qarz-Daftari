# 📒 Qarz Daftari – Smart Debt Management Platform

Qarz Daftari — kichik bizneslar, do‘konlar va yakka tadbirkorlar uchun mo‘ljallangan **raqamli qarz nazorati tizimi**.  
U orqali mijozlar qarzlari, to‘lovlar, do‘konlar va papkalar (folderlar) bitta markaziy panelda boshqariladi.

---

## 🚀 Loyihaning maqsadi

O‘zbekistonda ko‘plab savdo nuqtalari qarzlarni hali ham daftar yoki Telegram orqali yuritadi.  
Bu esa:
- qarz yo‘qolishiga
- hisob-kitob chalkashishiga
- pul oqimi nazoratdan chiqishiga

olib keladi.

**Qarz Daftari** bu muammolarni **raqamli, tez va xavfsiz** tarzda hal qiladi.

---

## 🧩 Asosiy imkoniyatlar

✔️ Mijozlarni ro‘yxatdan o‘tkazish  
✔️ Har bir mijoz uchun qarz tarixi  
✔️ Qarz qo‘shish va kamaytirish  
✔️ To‘lovlarni qayd qilish  
✔️ Papkalar (Folder) orqali tartiblash  
✔️ Do‘konlar (Shop) bo‘yicha ajratish  
✔️ Statistikalar  
✔️ Real-time yangilanish  
✔️ Login / Auth tizimi  

---

## 🧠 Platforma arxitekturasi

Loyiha **modular context-based** struktura asosida qurilgan:

- `AuthContext` → foydalanuvchi autentifikatsiyasi  
- `ShopContext` → do‘konlar boshqaruvi  
- `FolderContext` → mijozlar papkalari  
- `Debt / Client Context` → qarzlar va to‘lovlar  

Bu arxitektura:
- kodni toza qiladi  
- xatolarni kamaytiradi  
- kelajakda mobil ilova va API bilan oson integratsiya beradi  

---

## 🛠 Texnologiyalar

- **Next.js (App Router)**
- **React + Context API**
- **TypeScript**
- **Tailwind CSS**
- **Supabase (Auth + Database + Realtime)**
- **Vercel Deploy-ready**

---

## 📁 Papkalar tuzilishi

