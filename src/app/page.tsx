"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Welcome");
  }, [router]);

//   useEffect(() => {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("/service-worker.js")
//       .then(() => console.log("Service Worker Registered"));
//   }
// }, []);


  return null;
}
