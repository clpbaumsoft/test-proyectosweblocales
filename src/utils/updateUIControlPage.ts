export const triggerSearchButtonClick = (): void => {
    setTimeout(() => {
        const buttonSearch: HTMLButtonElement | null = document.getElementById('search-person-button') as HTMLButtonElement | null;
        if (buttonSearch) {
            buttonSearch.click();
        }
    }, 1000)
};