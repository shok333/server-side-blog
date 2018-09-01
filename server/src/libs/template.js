module.exports = ( body, script, initialState ) => {
    console.log(initialState);
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script>
           window.__APP_INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <title>222</title>
        <link type="text/css" rel="stylesheet" href="main.css">
      </head>
      
      <body>
        <div id="root">${body}</div>
        ${script}
      </body>
    </html>
  `;
};