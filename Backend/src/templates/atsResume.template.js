function atsResumeTemplate(data){

return `

<!DOCTYPE html>

<html>

<head>

<style>

body{

font-family:Calibri;

padding:30px;

font-size:12pt;

line-height:1.4;

}

h2{

border-bottom:1px solid black;

margin-top:20px;

margin-bottom:8px;

}

ul{

padding-left:18px;

}

</style>

</head>

<body>

<h1>${data.name}</h1>

<p>

${data.email}

|

${data.phone}

|

${data.linkedin}

</p>

<h2>Summary</h2>

<p>${data.summary}</p>

<h2>Skills</h2>

<ul>

${data.skills.map(skill=>`<li>${skill}</li>`).join("")}

</ul>

<h2>Projects</h2>

${data.projects.map(project=>`

<p>

<strong>${project.title}</strong>

<br>

${project.description}

</p>

`).join("")}

<h2>Education</h2>

${data.education.map(item=>`

<p>

${item.degree}

<br>

${item.college}

</p>

`).join("")}

</body>

</html>

`;

}

module.exports=atsResumeTemplate;