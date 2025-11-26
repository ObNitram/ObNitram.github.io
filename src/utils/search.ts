export function parseSearchQuery(query: string): { searchTags: string[], term: string, isPath: boolean } {
    if (query.startsWith('/')) {
        const parts = query.slice(1).split('/');
        const term = parts.pop()?.trim() || "";
        const searchTags = parts.filter(p => p.trim().length > 0).map(p => p.trim());
        return { searchTags, term, isPath: true };
    } else {
        return { searchTags: [], term: query, isPath: false };
    }2
}

function fuzzyMatch(search: string, text: string): boolean {
    let searchIdx = 0;
    let textIdx = 0;
    while (searchIdx < search.length && textIdx < text.length) {
        if (search[searchIdx] === text[textIdx]) {
            searchIdx++;
        }
        textIdx++;
    }
    return searchIdx === search.length;
}

export function isCardVisible(
    cardTags: string[],
    cardTitle: string,
    selectedTags: Set<string>,
    searchTags: string[],
    term: string,
    isPath: boolean
): boolean {
    // 1. Check Button Tags (selectedTags)
    const hasButtonTags = [...selectedTags].every((tag) =>
        cardTags.includes(tag),
    );

    if (!hasButtonTags) return false;

    if (isPath) {
        // Path Mode:
        // 1. Must match all definite searchTags (folders)
        const hasDefiniteTags = searchTags.every(searchTag =>
            cardTags.some(cardTag => fuzzyMatch(searchTag, cardTag.toLowerCase()))
        );

        if (!hasDefiniteTags) return false;

        // 2. Last term can be a partial tag OR a partial title
        if (term === "") return true;

        const matchesTag = cardTags.some(cardTag => fuzzyMatch(term, cardTag.toLowerCase()));
        const matchesTitle = fuzzyMatch(term, cardTitle);

        return matchesTag || matchesTitle;
    } else {
        // Simple Mode: Title search only
        return fuzzyMatch(term, cardTitle);
    }
}