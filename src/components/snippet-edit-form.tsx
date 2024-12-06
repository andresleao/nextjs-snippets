'use client';

import { editSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";

interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    }

    const editSnippetAction = async (event: React.FormEvent) => {
        event.preventDefault();
        const boundEditSnippet = editSnippet.bind(null, snippet.id, code);
        await boundEditSnippet();

        redirect(`/snippets/${snippet.id}`);
    };

    return (
        <div>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={snippet.code}
                options={{minimap: { enabled: false }}}
                onChange={handleEditorChange}
            />
            <form onSubmit={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">
                    Save
                </button>
            </form>
        </div>
    );
}