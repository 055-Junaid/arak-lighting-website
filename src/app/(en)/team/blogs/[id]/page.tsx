import { notFound } from "next/navigation";
import { requireMember } from "@/lib/blog/auth";
import { postById } from "@/lib/blog/storage";
import { BlogEditor } from "@/components/blog/BlogEditor";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const member = await requireMember();
  const { id } = await params;
  const post = id === "new" ? undefined : await postById(id);
  if (id !== "new" && !post) notFound();
  return <BlogEditor key={id} post={post} author={member.name} />;
}
