export default function NoShopPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">
          Hisobingiz do‘konga biriktirilmagan
        </h1>
        <p className="text-gray-500">
          Iltimos administrator bilan bog‘laning.
          Murojaat uchun : 
        </p>


        <a href="tel:+998904435567" className="text-xl font-semibold my-2">+998 (90) 443 55 67</a>

        <p className="text-gray-500 my-5">Agar admin bo'lsangiz quyidagi tugmani bosing</p>
        <a href="http://192.168.1.3:3000/admin" className="btn btn-blue-500 p-4 border rounded-xl">Admin Panel</a>
      </div>
    </div>
  );
}
