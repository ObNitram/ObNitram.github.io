import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface NoteWithReadTime {
    note: CollectionEntry<'notes'>;
    readTime: string;
}

export async function getNotesWithTags(): Promise<CollectionEntry<'notes'>[]> {
    const notes = await getCollection('notes');
    return notes.map(note => {
        const slugParts = note.slug.split('/');
        // Remove the last part (filename) to get directory tags
        const directoryTags = slugParts.slice(0, -1);
        const existingTags = note.data.tags || [];

        // Merge and deduplicate
        const allTags = [...new Set([...existingTags, ...directoryTags])];

        return {
            ...note,
            data: {
                ...note.data,
                tags: allTags
            }
        };
    });
}

export async function getNotesWithReadTime(): Promise<NoteWithReadTime[]> {
    const notes = await getNotesWithTags();

    const notesWithReadTime = await Promise.all(
        notes.map(async (note) => {
            const { remarkPluginFrontmatter } = await render(note);
            return {
                note,
                readTime: remarkPluginFrontmatter.readTime as string,
            };
        })
    );

    return notesWithReadTime;
}
