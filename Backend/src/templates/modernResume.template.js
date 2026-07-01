function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderSection(title, content) {
    if (!content || content.trim() === "") return "";

    return `
        <section class="section">
            <h2>${escapeHtml(title)}</h2>
            ${content}
        </section>
    `;
}

function renderList(items = []) {

    if (!Array.isArray(items) || items.length === 0) return "";

    return `
        <ul>
            ${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
    `;
}

function renderSkillRow(title, skills = []) {

    if (!Array.isArray(skills) || skills.length === 0) {
        return "";
    }

    return `
        <div class="skill-row">

            <div class="skill-title">
                ${escapeHtml(title)}
            </div>

            <div class="skill-values">
                ${skills.map(escapeHtml).join(" &nbsp;&bull;&nbsp; ")}
            </div>

        </div>
    `;
}

function renderSimpleList(title, items = []) {

    if (!Array.isArray(items) || items.length === 0) return "";

    return renderSection(title, renderList(items));
}

function modernResumeTemplate(data) {

    const technicalSkillsContent = `
        ${renderSkillRow("Languages", data.technicalSkills?.languages)}
        ${renderSkillRow("Frontend", data.technicalSkills?.frontend)}
        ${renderSkillRow("Backend", data.technicalSkills?.backend)}
        ${renderSkillRow("Databases", data.technicalSkills?.databases)}
        ${renderSkillRow("Tools", data.technicalSkills?.tools)}
        ${renderSkillRow("Other", data.technicalSkills?.other)}
    `;

    const experienceContent = (data.experience || []).map(exp => `
        <div class="item">
            <div class="item-header">
                <div class="item-heading">
                    <div class="item-title">
                        ${escapeHtml(exp.role)}
                    </div>
                    ${exp.company || exp.location ? `
                    <div class="item-subtitle">
                        ${escapeHtml(exp.company)}${exp.location ? ` &nbsp;&bull;&nbsp; ${escapeHtml(exp.location)}` : ""}
                    </div>` : ""}
                </div>
                ${exp.duration ? `<div class="item-date">${escapeHtml(exp.duration)}</div>` : ""}
            </div>
            ${renderList(exp.description)}
        </div>
    `).join("");

    // `project.subtitle` is optional and not in the current AI schema — add it
    // to resumeJsonSchema / resumeSchema in ai.service.js (a one-line tagline,
    // e.g. "AI-powered Resume & Interview Platform") if you want this filled in.
    const projectsContent = (data.projects || []).map(project => `
        <div class="item item--project">
            <div class="item-heading">
                <div class="item-title item-title--project">
                    ${escapeHtml(project.title)}
                </div>
                ${project.subtitle ? `<div class="project-tagline">${escapeHtml(project.subtitle)}</div>` : ""}
                ${(project.technologies || []).length > 0
                    ? `<div class="item-subtitle">${(project.technologies || []).map(escapeHtml).join(" &nbsp;&bull;&nbsp; ")}</div>`
                    : ""}
            </div>
            ${renderList(project.description)}
        </div>
    `).join("");

    // `edu.university` is optional and not in the current AI schema. If you
    // want a separate "Mumbai University" line under the college name, add a
    // `university` field to resumeJsonSchema / resumeSchema in ai.service.js.
    const educationContent = (data.education || []).map(edu => `
        <div class="item">
            <div class="item-header">
                <div class="item-heading">
                    <div class="item-title">
                        ${escapeHtml(edu.degree)}
                    </div>
                    ${edu.college ? `<div class="item-subtitle">${escapeHtml(edu.college)}</div>` : ""}
                    ${edu.university ? `<div class="item-subtitle item-subtitle--muted">${escapeHtml(edu.university)}</div>` : ""}
                </div>
                <div class="item-date">
                    ${escapeHtml(edu.year)}${edu.cgpa ? ` &nbsp;|&nbsp; CGPA: ${escapeHtml(edu.cgpa)}` : ""}
                </div>
            </div>
        </div>
    `).join("");

    const contactParts = [
        data.email ? `<span>&#128231; ${escapeHtml(data.email)}</span>` : "",
        data.phone ? `<span>&#128241; ${escapeHtml(data.phone)}</span>` : "",
        data.location ? `<span>&#128205; ${escapeHtml(data.location)}</span>` : "",
    ].filter(Boolean).join(`<span class="contact-divider">|</span>`);

    const linkParts = [
        data.linkedin ? `<a class="header-link" href="${escapeHtml(data.linkedin)}">LinkedIn</a>` : "",
        data.github ? `<a class="header-link" href="${escapeHtml(data.github)}">GitHub</a>` : "",
        data.portfolio ? `<a class="header-link" href="${escapeHtml(data.portfolio)}">Portfolio</a>` : "",
    ].filter(Boolean).join(`<span class="contact-divider">|</span>`);

    return `

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:"Calibri","Segoe UI",Arial,sans-serif;
    background:#ffffff;
    color:#1f2937;
    padding:34px 40px;
    font-size:13px;
    line-height:1.5;
    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;
}

.resume{
    max-width:900px;
    margin:auto;
}

header{
    text-align:left;
    border-bottom:3px solid #1e3a8a;
    padding-bottom:14px;
    margin-bottom:20px;
}

.name{
    font-size:28px;
    font-weight:800;
    color:#0f172a;
    letter-spacing:1px;
    text-transform:uppercase;
}

.headline{
    margin-top:4px;
    font-size:14px;
    font-weight:600;
    color:#1d4ed8;
}

.contact{
    margin-top:11px;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:7px;
    font-size:11.3px;
    color:#52606d;
}

.contact span{
    display:flex;
    align-items:center;
    gap:4px;
    white-space:nowrap;
}

.contact-divider{
    color:#cbd5e1;
    font-weight:400;
}

.header-links{
    margin-top:6px;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:7px;
    font-size:11.3px;
}

.header-link{
    color:#1d4ed8;
    font-weight:600;
    text-decoration:none;
}

.section{
    margin-top:20px;
}

.section h2{
    font-size:12.5px;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:1.2px;
    color:#0f172a;
    padding:2px 0 2px 10px;
    margin-bottom:13px;
    border-left:4px solid #1d4ed8;
}

.summary{
    font-size:12.6px;
    color:#374151;
    text-align:justify;
}

.skill-row{
    display:grid;
    grid-template-columns:105px 1fr;
    align-items:start;
    gap:14px;
    padding:5px 0;
}

.skill-row:not(:last-child){
    border-bottom:1px solid #f1f5f9;
    padding-bottom:9px;
    margin-bottom:3px;
}

.skill-title{
    font-weight:700;
    font-size:11.8px;
    color:#0f172a;
}

.skill-values{
    font-size:12.2px;
    color:#374151;
    line-height:1.6;
}

.item{
    margin-bottom:16px;
    page-break-inside:avoid;
}

.item:last-child{
    margin-bottom:0;
}

.item--project{
    padding-left:10px;
    border-left:2px solid #dbeafe;
}

.item-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:12px;
}

.item-heading{
    display:flex;
    flex-direction:column;
    gap:1px;
}

.item-title{
    font-size:13.3px;
    font-weight:700;
    color:#0f172a;
}

.item-title--project{
    font-size:14.2px;
    color:#1e3a8a;
}

.project-tagline{
    font-size:12px;
    color:#4b5563;
    font-style:italic;
    margin-top:1px;
}

.item-subtitle{
    color:#1d4ed8;
    font-weight:600;
    font-size:11.6px;
    margin-top:2px;
}

.item-subtitle--muted{
    color:#6b7280;
    font-weight:500;
}

.item-date{
    font-size:11.3px;
    color:#6b7280;
    white-space:nowrap;
    text-align:right;
    padding-top:2px;
}

ul{
    padding-left:18px;
    margin-top:7px;
}

li{
    margin-bottom:4px;
    font-size:12.1px;
    color:#374151;
}

footer{
    margin-top:28px;
    padding-top:10px;
    border-top:1px solid #f1f5f9;
    text-align:center;
    font-size:9.5px;
    color:#9ca3af;
    letter-spacing:.3px;
}

@page{
    margin:14mm 18mm;
}

</style>
</head>
<body>
<div class="resume">

<header>
    <div class="name">
        ${escapeHtml(data.name)}
    </div>

    <div class="headline">
        ${escapeHtml(data.headline || data.title)}
    </div>

    ${contactParts ? `<div class="contact">${contactParts}</div>` : ""}
    ${linkParts ? `<div class="header-links">${linkParts}</div>` : ""}
</header>

${renderSection(
    "Professional Summary",
    data.summary ? `<div class="summary">${escapeHtml(data.summary)}</div>` : ""
)}

${renderSection("Technical Skills", technicalSkillsContent)}

${renderSection("Professional Experience", experienceContent)}

${renderSection("Projects", projectsContent)}

${renderSection("Education", educationContent)}

${renderSimpleList("Certifications", data.certifications)}

${renderSimpleList("Achievements", data.achievements)}

${data.languages && data.languages.length > 0
    ? renderSection("Languages", `<div class="summary">${data.languages.map(escapeHtml).join(", ")}</div>`)
    : ""}

<footer>Generated by ResumeIQ</footer>

</div>
</body>
</html>

`;
}

module.exports = { modernResumeTemplate };