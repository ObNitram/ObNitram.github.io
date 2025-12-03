import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface NoteWithReadTime {
    note: CollectionEntry<'notes'>;
    readTime: string;
}

/**
 * Get the URL-safe slug from a note's id.
 * Preserves the original filename casing.
 * Removes the .mdx extension.
 */
export function getNoteSlug(note: CollectionEntry<'notes'>): string {
    // note.id includes the file extension, e.g., "cours/nmv/Cours 2 - La mémoire.mdx"
    return note.id.replace(/\.mdx?$/, '');
}

/**
 * Get the URL-encoded slug for use in href attributes.
 * Encodes spaces and special characters.
 */
export function getNoteUrl(note: CollectionEntry<'notes'>): string {
    const slug = getNoteSlug(note);
    // Encode each path segment to handle spaces and special characters
    return slug
        .split('/')
        .map(segment => encodeURIComponent(segment))
        .join('/');
}

export async function getNotesWithTags(): Promise<CollectionEntry<'notes'>[]> {
    const notes = await getCollection('notes');
    return notes.map(note => {
        const slug = getNoteSlug(note);
        const slugParts = slug.split('/');
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
