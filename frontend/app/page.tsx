"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  //Mock recent grievance data
  const recent = [
    { id: 1, title: "Road damage fixed in Lucknow", days: 2 },
    { id: 2, title: "Water supply restored in Kanpur", days: 1 },
    { id: 3, title: "Hospital grievance resolved in Varanasi", days: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />

      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/bg-img.jpg" 
          alt="AI Governance Background"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

        <div className="relative z-10 max-w-2xl px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            AI-Powered Grievance Management System
          </motion.h1>

          <p className="text-lg text-gray-200 mb-8">
            Empowering citizens through AI-driven analytics and smart redressal
            for transparent governance.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/user/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
            >
              Login as User
            </button>
            <button
              onClick={() => router.push("/user/register")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
            >
              Register as User
            </button>
            <button
              onClick={() => router.push("/admin/login")}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
            >
              Admin Login
            </button>
          </div>
        </div>
      </section>

      {/* Recent Problems Solved */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 text-center">
        <h2 className="text-3xl font-semibold mb-12 text-gray-900 dark:text-white">
         Recent Grievances Solved
        </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
    {[
      {
        id: 1,
        title: "Road Damage Fixed in Lucknow",
        desc: "Potholes repaired and drainage restored in Alambagh area within 2 days after citizen complaint.",
        img: "/lucknow-mock.jpg",
      },
      {
        id: 2,
        title: "Water Supply Restored in Kanpur",
        desc: "Community handpump and supply lines repaired, ensuring clean water access for families.",
        img: "/kanpur-mock.jpg",
      },
      {
        id: 3,
        title: "Hospital Grievance Resolved in Varanasi",
        desc: "Healthcare services improved through citizen feedback and prompt admin response.",
        img: "/varanasi-mock.jpg",
      },
    ].map((item) => (
      <motion.div
        key={item.id}
        whileHover={{ scale: 1.03 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
      >
        <div className="relative h-56 w-full">
          <Image
            src={item.img}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        </div>
        <div className="p-6 text-left">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center text-sm">
  <div className="space-y-2">
    <p>
      © 2025 AI-Powered Grievance Management System | Built by{" "}
      <span className="text-white font-semibold">Krishna</span>
    </p>
    <div className="flex justify-center space-x-4 mt-2">
      <a
        href="mailto:kant19krishna@gmail.com"
        className="hover:text-white transition-colors duration-200"
      >
        📧 Email
      </a>
      <a
        href="https://x.com/krixna01"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        🐦 Twitter
      </a>
      <a
        href="https://www.linkedin.com/in/your_linkedin"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        💼 LinkedIn
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}
