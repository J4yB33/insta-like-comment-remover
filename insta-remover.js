/**
 * This script automates ONLY the SELECTION of your Instagram comments.
 * It will select a batch of comments and then stop.
 * YOU must manually click the "Delete" button on the page to finalize the deletion.
 *
 * How to use:
 * 1. Navigate to the Instagram comments page:
 * https://www.instagram.com/your_activity/interactions/comments
 * 2. Open the developer console in your web browser.
 * 3. Copy and paste this script and press Enter.
 * 4. The script will select comments and then stop.
 * 5. Manually click the "Delete" button at the bottom of the page, then confirm.
 * 6. To delete another batch, refresh the page and run the script again.
 */
;(async function () {
    // --- CONFIGURATION ---
    /** @const {number} - The number of comments to select in each batch. */
    const SELECTION_BATCH_SIZE = 99;
    /** @const {number} - The delay between major actions in milliseconds. */
    const DELAY_BETWEEN_ACTIONS_MS = 10;
    /** @const {number} - The delay between clicking each checkbox in milliseconds. */
    const DELAY_BETWEEN_CHECKBOX_CLICKS_MS = 10; // Faster clicks as we aren't waiting for deletion

    /**
     * Utility function that delays execution for a given amount of time.
     */
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Utility function that clicks on a given element.
     */
    const clickElement = (element) => {
        if (!element) throw new Error('Element not found for clicking');
        element.click();
    };

    /**
     * Main function to select comments without deleting.
     */
    const selectComments = async () => {
        console.log("🚀 Starting the comment SELECTION process...");

        try {
            // 1. Find and click the "Select" button.
            // This selector finds the second button on the page, which is typically "Select".
            const [, selectButton] = document.querySelectorAll('[role="button"]');
            if (!selectButton) throw new Error("Could not find the 'Select' button. Are you on the correct page?");
            clickElement(selectButton);
            await delay(DELAY_BETWEEN_ACTIONS_MS);
            console.log("✓ 'Select' mode activated.");

            // 2. Find all available checkboxes.
            const checkboxes = document.querySelectorAll('[aria-label="Toggle checkbox"]');
            if (checkboxes.length === 0) {
                console.log("✅ No comments found to select.");
                return; // Stop if there's nothing to do.
            }
            console.log(`Found ${checkboxes.length} comments. Starting selection...`);

            // 3. Loop through and click the checkboxes for the batch.
            const batchSize = Math.min(SELECTION_BATCH_SIZE, checkboxes.length);
            for (let i = 0; i < batchSize; i++) {
                clickElement(checkboxes[i]);
                await delay(DELAY_BETWEEN_CHECKBOX_CLICKS_MS);
            }

            console.log(`🎉 --- SELECTION COMPLETE --- 🎉`);
            console.log(`Selected ${batchSize} comments.`);
            console.log(`👉 Please now MANUALLY click the 'Delete' button at the bottom of the page.`);

        } catch (error) {
            console.error("❌ An error occurred during selection:", error.message);
        }
    };

    // Start the selection process
    await selectComments();
})();
