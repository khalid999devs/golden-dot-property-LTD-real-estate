const htmlCreator = (mode, data) => {
  let subject = data.info.subject,
    body = data.info.body;
  text = data.info.text;

  let client = data.client;

  if (mode === 'booking') {
    subject = `Registration Successful!`;
    body = `
    <h2 style="color:green;">Congratulations!! Your registration is successful</h2>
    `;
  } else if (mode === 'contact') {
    subject = `We are here for you!`;
    body = `
       <p>Dear ${client.fullName}, ${data.info.body}</p>
    `;
  } else if (mode === 'custom') {
    subject = subject;
    body = data.info.body;
  }

  return { subject, body, text };
};

module.exports = { htmlCreator };
