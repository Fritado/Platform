const emailTemplate = (title, bodyContent) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @media only screen and (max-width: 600px) {
            .responsive-table {
                display: flex !important;
                flex-wrap: wrap !important;
            }
            .responsive-table td {
                width: 33.33% !important;
                box-sizing: border-box !important;
            }
        }
           
    </style>
</head>
<body class="body" style=" border: 1px solid #dbdfe6; background-color: #ffffff; font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #333333; margin: 0; padding: 0;">
    <div style= "margin: 0 5rem; padding: 20px; text-align: left;">
        <a href="https://fritado.com" target="_blank"><img style="max-width: 100px; margin-bottom: 20px;"  src="https://platform.fritado.com/src/assets/images/logo2.png" alt="Fritado"></a>
        <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px; color: black;">${title}</div>
        <div style="font-size: 16px; margin-bottom: 20px; text-align:left;">
            <p>${bodyContent}</p>
        </div>
        <div style="font-size: 14px; color: #999999; margin-top: 20px;">
           <p> If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@fritado.com" style="color: #4CAF50; text-decoration: none;">support@fritado.com</a>. We are here to help!</p>
        </div>
    </div>
    
</body>
</html>
`;
};
module.exports = emailTemplate;
