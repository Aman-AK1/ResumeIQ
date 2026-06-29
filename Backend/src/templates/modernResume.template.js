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
            <h2>${title}</h2>
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

// function renderSkillRow(title, skills = []) {

//     if (!Array.isArray(skills) || skills.length === 0) return "";

//     return `
//         <div class="skill-row">

//             <div class="skill-title">

//                 ${title}

//             </div>

//             <div class="skill-values">

//                 ${skills.map(skill => `<span class="skill-chip">${escapeHtml(skill)}</span>`).join("")}

//             </div>

//         </div>
//     `;
// }

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
                ${skills.map(escapeHtml).join(" • ")}
            </div>

        </div>
    `;
}

function modernResumeTemplate(data) {

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

font-family:"Segoe UI",Arial,sans-serif;

background:#ffffff;

color:#2d3748;

padding:42px;

font-size:13px;

line-height:1.6;

}

.resume{

max-width:900px;

margin:auto;

}

header{

text-align:center;

margin-bottom:34px;

}

.name{

font-size:34px;

font-weight:700;

color:#111827;

letter-spacing:.5px;

}

.headline{

margin-top:8px;

font-size:16px;

font-weight:600;

color:#2563eb;

}

.contact{

margin-top:18px;

display:flex;

justify-content:center;

flex-wrap:wrap;

gap:10px 18px;

font-size:12px;

color:#6b7280;

}

.contact span{

display:flex;

align-items:center;

gap:6px;

}

.section{

margin-top:28px;

}

.section h2{

font-size:15px;

text-transform:uppercase;

letter-spacing:1px;

color:#2563eb;

padding-bottom:8px;

margin-bottom:16px;

border-bottom:2px solid #2563eb;

}

.summary{

font-size:13px;

text-align:justify;

}

.skill-row{

display:grid;

grid-template-columns:130px 1fr;

gap:20px;

padding:8px 0;

border-bottom:1px solid #eef2f7;

}

.skill-title{

font-weight:700;

font-size:13px;

color:#111827;

}

.skill-values{

font-size:13px;

color:#374151;

line-height:1.7;

}

.skill-chip{

background:#eff6ff;

color:#2563eb;

padding:5px 12px;

border-radius:50px;

font-size:11px;

font-weight:600;

}

.item{

margin-bottom:24px;

padding-bottom:12px;

border-bottom:1px solid #f3f4f6;

}

.item:last-child{

border-bottom:none;

padding-bottom:0;

}

.item-header{

display:flex;

justify-content:space-between;

align-items:flex-start;

margin-bottom:6px;

}

.item-title{

font-size:15px;

font-weight:700;

}

.item-subtitle{

color:#6b7280;

font-size:12px;

margin-bottom:8px;

}

.item-date{

font-size:12px;

color:#6b7280;

}

ul{

padding-left:18px;

}

li{

margin-bottom:6px;

}

@page{

margin:18mm;

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

<div class="contact">

${data.email ? `<span>📧 ${escapeHtml(data.email)}</span>` : ""}

${data.phone ? `<span>📱 ${escapeHtml(data.phone)}</span>` : ""}

${data.location ? `<span>📍 ${escapeHtml(data.location)}</span>` : ""}

${data.linkedin ? `<span>🔗 ${escapeHtml(data.linkedin)}</span>` : ""}

${data.github ? `<span>💻 ${escapeHtml(data.github)}</span>` : ""}

${data.portfolio ? `<span>🌐 ${escapeHtml(data.portfolio)}</span>` : ""}

</div>

</header>

${renderSection(

"Professional Summary",

`<div class="summary">

${escapeHtml(data.summary)}

</div>`

)}

${renderSection(

"Technical Skills",

`

${renderSkillRow("Languages",data.technicalSkills?.languages)}

${renderSkillRow("Frontend",data.technicalSkills?.frontend)}

${renderSkillRow("Backend",data.technicalSkills?.backend)}

${renderSkillRow("Databases",data.technicalSkills?.databases)}

${renderSkillRow("Tools",data.technicalSkills?.tools)}

${renderSkillRow("Other",data.technicalSkills?.other)}

${renderSection(

"Professional Experience",

(data.experience || []).map(exp => `

<div class="item">

    <div class="item-header">

        <div>

            <div class="item-title">

                ${escapeHtml(exp.role)}

            </div>

            <div class="item-subtitle">

                ${escapeHtml(exp.company)}

                ${exp.location ? " • " + escapeHtml(exp.location) : ""}

            </div>

        </div>

        <div class="item-date">

            ${escapeHtml(exp.duration)}

        </div>

    </div>

    ${renderList(exp.description)}

</div>

`).join("")

)}

${renderSection(

"Projects",

(data.projects || []).map(project => `

<div class="item">

    <div class="item-header">

        <div>

            <div class="item-title">

                ${escapeHtml(project.title)}

            </div>

            <div class="item-subtitle">

                ${(project.technologies || []).join(" • ")}

            </div>

        </div>

    </div>

    ${renderList(project.description)}

</div>

`).join("")

)}

${renderSection(

"Education",

(data.education || []).map(edu => `

<div class="item">

    <div class="item-header">

        <div>

            <div class="item-title">

                ${escapeHtml(edu.degree)}

            </div>

            <div class="item-subtitle">

                ${escapeHtml(edu.college)}

            </div>

        </div>

        <div class="item-date">

            ${escapeHtml(edu.year)}

        </div>

    </div>

    ${edu.cgpa ? `<p><strong>CGPA:</strong> ${escapeHtml(edu.cgpa)}</p>` : ""}

</div>

`).join("")

)}


`

)}

<!-- EXPERIENCE COMING NEXT -->

<!-- PROJECTS COMING NEXT -->

<!-- EDUCATION COMING NEXT -->

<!-- CERTIFICATIONS COMING NEXT -->

<!-- ACHIEVEMENTS COMING NEXT -->

<!-- LANGUAGES COMING NEXT -->

</div>

</body>

</html>

`;

}

module.exports = {modernResumeTemplate};