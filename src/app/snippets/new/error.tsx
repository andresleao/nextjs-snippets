'use client';

interface ErrorPageProps {
    error: Error,
    //reset: () => void,
}

export default function ErrorPage({
    error,
    //reset
}: ErrorPageProps) {
    return (
        <div>{error.message}</div>
    );
}