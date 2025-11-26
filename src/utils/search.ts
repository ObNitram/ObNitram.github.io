export function parseSearchQuery(query: string): { searchTags: string[], titleSearch: string } {
    let searchTags: string[] = [];
    let titleSearch = query;

    if (query.includes('/')) {
        const parts = query.split('/').map(p => p.trim());
        if (query.endsWith('/')) {
            // "tag1/tag2/" -> tags: tag1, tag2; title: ""
            searchTags = parts.filter(p => p.length > 0);
            titleSearch = "";
        } else {
            // "tag1/tag2/name" -> tags: tag1, tag2; title: name
            const potentialTitle = parts.pop();
            searchTags = parts.filter(p => p.length > 0);
            titleSearch = potentialTitle || "";
        }
    }
    return { searchTags, titleSearch };
}

export function isCardVisible(
    cardTags: string[],
    cardTitle: string,
    selectedTags: Set<string>,
    searchTags: string[],
    titleSearch: string
): boolean {
    // 1. Check Button Tags (selectedTags)
    const hasButtonTags = [...selectedTags].every((tag) =>
        cardTags.includes(tag),
    );

    // 2. Check Search Input Tags (searchTags)
    const hasSearchTags = searchTags.every(searchTag =>
        cardTags.some(cardTag => cardTag.toLowerCase().includes(searchTag))
    );

    // 3. Check Title
    const matchesTitle = cardTitle.includes(titleSearch);

    return hasButtonTags && hasSearchTags && matchesTitle;
}
