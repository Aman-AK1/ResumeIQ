function renderContactItem(icon, value, isLink = false) {
    if (!value) return "";

    return `
        <div class="contact-item">
            <span class="contact-icon">${icon}</span>
            ${
                isLink
                    ? `<a href="${value}" target="_blank">${value}</a>`
                    : `<span>${value}</span>`
            }
        </div>
    `;
}

function renderHeader(data) {

    return `

    <header class="resume-header">

        <h1 class="candidate-name">

            ${data.name || ""}

        </h1>

        <p class="candidate-headline">

            ${data.headline || data.title || ""}

        </p>

        <div class="contact-grid">

            ${renderContactItem("📧", data.email)}

            ${renderContactItem("📱", data.phone)}

            ${renderContactItem("📍", data.location)}

            ${renderContactItem("🔗", data.linkedin, true)}

            ${renderContactItem("💻", data.github, true)}

            ${renderContactItem("🌐", data.portfolio, true)}

        </div>

    </header>

    `;
}

module.exports = renderHeader;