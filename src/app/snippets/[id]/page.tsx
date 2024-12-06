import { getSnippet, deleteSnippet } from "@/actions";
import { db } from "@/db";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetDetailsPage(props: SnippetDetailsPageProps) {
    const { id } = await props.params;

    const snippet = await getSnippet(parseInt(id));

    if (!snippet) return notFound();

    const deleteSnippetAction = deleteSnippet.bind(null, parseInt(id));

    return (
      <div>
        <div className="flex mt-4 mb-4 justify-between items-center">
          <h1 className="text-xl font-bold">
            {snippet.title}
          </h1>
          <div className="flex gap-4">
            <Link
              className="p-2 border rounded"
              href={`/snippets/${snippet.id}/edit`}
            >
              Edit
            </Link>
            <form action={deleteSnippetAction}>
              <button className="p-2 border rounded">
                Delete
              </button>
            </form>
          </div>
        </div>
        <pre className="p-3 border rounded bg-gray-200 border-gray-200">
          <code>{snippet.code}</code>
        </pre>
      </div>
  );
}

export async function generateStaticParams(){
  const snippets = await db.snippet.findMany();
  return snippets.map((snip: Snippet) => {
      return {id:snip.id.toString()}
  });
}
