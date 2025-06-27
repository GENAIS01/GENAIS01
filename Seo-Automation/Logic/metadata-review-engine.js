/**
 * This the code that determines the Platform and check their WEBSITE Metadata, ask for user concurrence to proceed 
 * Metadata Review Engine
 * Determines how metadata updates are handled based on platform and concurrence settings
 */

/**
 * GEN-AIS Metadata Review Engine (Pre-Registration)
 * Applies metadata only if user has provided concurrence.
 * Platform detection determines Wix vs standard handling.
 */

function updateWixMetadata({ title, description, keywords }) {
  if (typeof wixSEO !== "undefined") {
    wixSEO.setTitle(title);
    wixSEO.setDescription(description);
    wixSEO.setKeywords(keywords);
    console.log("✅ Metadata updated via Wix Velo");
  } else {
    console.warn("❌ wixSEO API not available — check platform context.");
  }
}

function updateNonWixMetadata({ title, description, keywords }) {
  document.title = title;

  const descTag = document.querySelector('meta[name="description"]');
  const keywordTag = document.querySelector('meta[name="keywords"]');

  if (descTag) descTag.setAttribute("content", description);
  if (keywordTag) keywordTag.setAttribute("content", keywords);

  console.log("✅ Metadata updated in standard DOM");
}

/**
 * Applies metadata only if user has provided concurrence
 * @param {Object} input
 * @param {'wix'|'standard'} input.platform
 * @param {Boolean} input.userConcurrence
 * @param {Object} input.metadata
 */
function reviewAndApplyInitialMetadata({ platform, userConcurrence, metadata }) {
  if (!userConcurrence) {
    console.warn("🚫 User has not granted concurrence — skipping metadata update.");
    return { status: "pending", reason: "no concurrence" };
  }

  if (platform === "wix") {
    updateWixMetadata(metadata);
  } else {
    updateNonWixMetadata(metadata);
  }

  return { status: "applied", platform };
}

module.exports = { reviewAndApplyInitialMetadata };



----------------------------------------------------------------------------------

This is the first set of code used to get the keyword metadata directly from WIX
import { fetch } from 'wix-fetch';
export function getExternalMetadata(url) {
    return fetch("https://cors-anywhere.herokuapp.com/" + url, { 
        method: "GET",
        headers: { "Content-Type": "text/html" }
    })
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        let title = doc.querySelector("title")?.innerText || "No title found";
        let description = doc.querySelector('meta[name="description"]')?.content || "No description found";
        let keywords = doc.querySelector('meta[name="keywords"]')?.content || "No keywords found";

        return { title, description, keywords };
    })
    .catch(error => {
        console.error("Error fetching metadata:", error);
        return { title: "Error", description: "Error", keywords: "Error" };
    });
}

------------------------------------------------------------
Note: Key Changes Needed for External Websites
✅ Use fetch with CORS Handling – Many sites block direct metadata fetching for security reasons. ✅ Leverage a Proxy Server – If metadata is restricted, use an API service to retrieve the data. ✅ Ensure HTML Parsing Works Correctly – External sites may have different <meta> tag structures.

Here’s the same metadata retrieval code, but using JavaScript’s built-in fetch() instead of wix-fetch which should work for most websites:
export function getWebsiteMetadata(url) {
    return fetch(url, { 
        method: "GET",
        headers: { "Content-Type": "text/html" }
    })
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        let title = doc.querySelector("title")?.innerText || "No title found";
        let description = doc.querySelector('meta[name="description"]')?.content || "No description found";
        let keywords = doc.querySelector('meta[name="keywords"]')?.content || "No keywords found";

        return { title, description, keywords };
    })
    .catch(error => {
        console.error("Error fetching metadata:", error);
        return { title: "Error", description: "Error", keywords: "Error" };
    });
}


