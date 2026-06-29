const styles = `

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:
    "Segoe UI",
    Arial,
    Helvetica,
    sans-serif;

    color:#2d3748;

    background:#fff;

    font-size:13px;

    line-height:1.6;

    padding:40px;

}

.resume{

    max-width:850px;

    margin:auto;

}

.section{

    margin-top:28px;

}

.section-title{

    font-size:15px;

    font-weight:700;

    color:#2563eb;

    letter-spacing:1px;

    text-transform:uppercase;

    margin-bottom:12px;

    padding-bottom:6px;

    border-bottom:2px solid #2563eb;

}

.text-muted{

    color:#718096;

}

.flex{

    display:flex;

}

.space-between{

    justify-content:space-between;

}

.wrap{

    flex-wrap:wrap;

}

.mt-8{

    margin-top:8px;

}

.mt-12{

    margin-top:12px;

}

.mt-16{

    margin-top:16px;

}

.mt-20{

    margin-top:20px;

}

.mt-24{

    margin-top:24px;

}

.badge{

    display:inline-block;

    background:#eff6ff;

    color:#2563eb;

    padding:4px 10px;

    border-radius:20px;

    font-size:11px;

    margin:4px;

}

ul{

    padding-left:18px;

}

li{

    margin-bottom:6px;

}

a{

    color:#2563eb;

    text-decoration:none;

}

@page{

    margin:18mm;

}
.resume-header{

    text-align:center;

    margin-bottom:32px;

}

.candidate-name{

    font-size:34px;

    font-weight:700;

    color:#1f2937;

    letter-spacing:1px;

}

.candidate-headline{

    margin-top:8px;

    font-size:16px;

    color:#2563eb;

    font-weight:600;

}

.contact-grid{

    margin-top:20px;

    display:flex;

    justify-content:center;

    flex-wrap:wrap;

    gap:14px 24px;

}

.contact-item{

    display:flex;

    align-items:center;

    gap:8px;

    font-size:13px;

    color:#4b5563;

}

.contact-item a{

    color:#2563eb;

    text-decoration:none;

}

.contact-item a:hover{

    text-decoration:underline;

}
`;


module.exports = styles;