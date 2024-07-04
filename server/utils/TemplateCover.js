const EmailCover = (body) => {
  return (
    body +
    `
    --GOLDEN DOT PROPERTIES LTD.
 `
  );
};

const EmailTextCover = (text) => {
  return (
    text +
    `

 `
  );
};

module.exports = { EmailCover, EmailTextCover };
