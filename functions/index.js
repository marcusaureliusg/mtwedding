const {onRequest} = require("firebase-functions/v2/https");
const {getLinkPreview} = require("link-preview-js");
const cors = require("cors")({origin: true});
const logger = require("firebase-functions/logger");

exports.getLinkPreview = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const targetUrl = req.query.url;
      if (!targetUrl) {
        return res.status(400).json({error: "Missing 'url' query parameter."});
      }
      const previewData = await getLinkPreview(targetUrl);
      return res.json(previewData);
    } catch (error) {
      logger.error("Error fetching link preview:", error);
      return res.status(500).json({error: "Failed to fetch link preview."});
    }
  });
});
