import Navbar from "./navbar";
import LogoIma from "@/public/assets/images/logo.png";
import Image from "next/image";
import { FiBell, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Image src={LogoIma} alt="Website Logo" width="120" height="120" />
      </div>
      <Navbar />
    </header>
  );
}
