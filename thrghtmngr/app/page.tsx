/**
 * Page d'accueil / Page de connexion
 * 
 * Cette page est la première vue par les utilisateurs. Elle présente un 
 * formulaire de connexion centré sur l'écran.
 * 
 * @component
 */

import Image from "next/image";
import Link from 'next/link';
import { LoginForm } from "@/components/login-form";
        

export default function HomePage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}