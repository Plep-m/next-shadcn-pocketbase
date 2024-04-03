"use client"

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the token cookie exists
    const token = Cookies.get('token');

    if (token) {
      // If the token exists, redirect to /dashboard
      router.push('/dashboard');
    } else {
      // If the token doesn't exist, redirect to /register
      router.push('/login');
    }
  });

  return (
    <></>
  );
}