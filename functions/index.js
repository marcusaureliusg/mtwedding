const {onRequest} = require("firebase-functions/v2/https");
const {getLinkPreview} = require("link-preview-js");
const cors = require("cors")({origin: true});
const logger = require("firebase-functions/logger");

/**
 * Delays execution for a given number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @return {Promise<void>} A promise that resolves after the given delay.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches link preview data for a given URL using the link-preview-js library,
 * retrying the request a specified number of times if it fails.
 *
 * @param {string} url - The URL for which to fetch the link preview.
 * @param {object} [options={}] - Options to pass to getLinkPreview (e.g., timeout).
 * @param {number} [retries=2] - The number of additional attempts to make if a request fails.
 * @param {number} [delayMs=2000] - The delay in milliseconds before retrying.
 * @return {Promise<object>} A promise that resolves to the link preview data.
 * @throws Will throw an error if all retry attempts fail.
 */
async function fetchWithRetries(
    url,
    options = {},
    retries = 2,
    delayMs = 2000,
) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await getLinkPreview(url, options);
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        throw err;
      }
      // Wait before retrying
      await delay(delayMs);
    }
  }
}

/**
 * Cloud Function to get a link preview for a given URL.
 * The function expects a query parameter 'url' and returns a JSON object
 * containing the link preview data. It uses the link-preview-js library to fetch
 * data, applying a timeout and a retry mechanism.
 *
 * CORS headers are applied to allow cross-origin requests.
 *
 * @example
 * // Request example:
 * // GET https://<region>-<projectId>.cloudfunctions.net/getLinkPreview?url=https://example.com
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
exports.getLinkPreview = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const targetUrl = req.query.url;
      if (!targetUrl) {
        return res
            .status(400)
            .json({error: "Missing 'url' query parameter."});
      }

      // Set options for getLinkPreview (e.g., a 15-second timeout).
      const options = {timeout: 15000};

      // Fetch the preview data with retry logic.
      const previewData = await fetchWithRetries(targetUrl, options, 2, 2000);
      return res.json(previewData);
    } catch (error) {
      logger.error("Error fetching link preview:", error);
      return res.status(500).json({error: "Failed to fetch link preview."});
    }
  });
});
