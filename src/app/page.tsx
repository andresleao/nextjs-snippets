import { db } from "@/db";
import Link from "next/link";

// Disable caching:
//export const dynamic = 'force-dynamic';
//export const revalidate = 0;

// Rerender
//export const revalidate = 3;

// On-demand chache
// import { relavidatePath } from "next/cache";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((s) => {
    return (
      <Link
        key={s.id}
        className="flex justify-between items-center p-2 border rounded"
        href={`/snippets/${s.id}`}
      >
        <div>{s.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center pb-2 pt-2">
        <h1 className="text-xl font-bold">
          Snippets
        </h1>
        <Link className="border rounded p-2" href="/snippets/new">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {renderedSnippets}
      </div>
    </div>
  );
}
