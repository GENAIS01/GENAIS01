/**
 * SEO OP Button Handler
 * Decides whether metadata should apply immediately or be deferred for review.
 * Used after registration when plan tier and concurrence status are known.
 */

function canAutoOverride(user = {}) {
  const plan = user.plan || "free"; // Default if missing
  const concurrence = user.concurrenceEnabled === true;

  if (plan === "pro" && concurrence) {
    return { allowed: true, mode: "auto" };
  }

  return { allowed: false, mode: "review" };
}

/**
 * Called when OP (Override Permission) Button is clicked.
 * Returns metadata submission status based on user eligibility.
 */
function handleOPButtonClick(userContext, metadataPayload) {
  const permission = canAutoOverride(userContext);

  if (permission.allowed) {
    return {
      status: "applied",
      message: "✅ Metadata applied automatically (Pro Plan + Concurrence enabled).",
      metadata: metadataPayload
    };
  }

  return {
    status: "pending",
    message: "⏳ Metadata update pending — review or approval required.",
    metadata: metadataPayload
  };
}

module.exports = { handleOPButtonClick };

-----------------------------
This file kicks in after the user registers and selects a plan

It relies on user.plan and user.concurrenceEnabled to determine metadata override permissions

You’ll call it from your dashboard interface or Express route handler

Its output can help control button UI state (green if auto, yellow if pending)