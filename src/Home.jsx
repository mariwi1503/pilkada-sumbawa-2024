import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-300 to-blue-500 flex flex-col items-center p-6">
      {/* Judul Halaman */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-8 text-center">
        Pilkada NTB 2024
      </h1>

      {/* Banner Gambar */}
      <div className="mt-8 w-full max-w-2xl lg:max-w-4xl">
        <img
          src="/banner.jpg"
          alt="Banner Pilkada NTB 2024"
          className="rounded-lg w-full"
        />
      </div>

      {/* Dua Button */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:gap-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 text-sm md:text-base lg:text-lg"
          onClick={() => (window.location.href = "/bupati")}
        >
          Real Count Bupati
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 text-sm md:text-base lg:text-lg"
          onClick={() => (window.location.href = "/gubernur")}
        >
          Real Count Gubernur
        </button>
      </div>

      {/* Deskripsi Website */}
      <div className="mt-12 max-w-md md:max-w-2xl lg:max-w-3xl text-center bg-white p-4 md:p-6 lg:p-8 rounded-lg">
        <p className="text-sm md:text-base lg:text-lg text-gray-700">
          Selamat datang di situs kami! Situs ini menyediakan informasi terkini
          tentang perhitungan suara untuk pemilihan Bupati Sumbawa dan Gubernur
          NTB yang diambil dari data terbaru KPU.
        </p>
      </div>
    </div>
  );
};

export default Home;
