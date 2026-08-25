import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | ARAK Lighting Solutions",
  description:
    "Book a lighting consultation with ARAK. Send drawings, a fixture schedule or a brief and our Riyadh team will come back with a lighting study and a quotation. Showroom at Exit 2, Northern Ring Branch Road, Hittin, Riyadh.",
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return children;
}
