function generateHTML(team) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" type="text/css" href="./style.css">
          <title>${team.teamName}</title>
        </head>
        <body style="background-color: #87CEEB;">
          <h1>${team.teamName}</h1>
          <section class="cards-section">
              ${generateCards(team)}
          </section>
        </body>
      </html>`;
  }
  
  function generateCards(team) {
    let cardsHTML = "";
    for (let memberList of Object.values(team)) {
      if (typeof memberList !== "string") {
        for (let member of Object.values(memberList)) {
          let email = member.getEmail();
          let role = member.getRole();
          let roleSpecificField = member.getRoleSpecificDataField(); 
          cardsHTML += `
          <article class="card ${role.toLowerCase()}" style="background-color: white;">
            <div class="card-header" style="background-color: #87CEEB;">
              <h3>${member.getName()}</h3>
              <h4>${role}</h4>
            </div>
            <div class="card-body">
              <ul>
                <li>ID: ${member.getID()}</li>
                <li>Email Address: <a target="_blank" href="mailto:${email}">${email}</a></li>
                <li>${roleSpecificField}: ${displayRoleSpecificData(member)}</li>
              </ul>
            </div>
          </article>
          `;
        }
      }
    }
    return cardsHTML.trim();
  }
  
  function displayRoleSpecificData(member) {
    if (member.getRole() === "Engineer") {
      return `<a target="_blank" href="https://github.com/${member.getRoleSpecificData()}" style="color: blue">${member.getRoleSpecificData()}</a>`;
    } else {
      return member.getRoleSpecificData();
    }
  }
  
  module.exports = generateHTML;