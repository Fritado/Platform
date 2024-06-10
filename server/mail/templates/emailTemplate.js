
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
        <a href="https://fritado.com" target="_blank"><img style="max-width: 170px; margin-bottom: 20px;"  src="https://platform.fritado.com/src/assets/images/logo2.png" alt="Fritado"></a>
        <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px; color: black;">${title}</div>
        <div style="font-size: 16px; margin-bottom: 20px; text-align:left;">
            <p>${bodyContent}</p>
        </div>
        <div style="font-size: 14px; color: #999999; margin-top: 20px;">
           <p> If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@fritado.com" style="color: #4CAF50; text-decoration: none;">support@fritado.com</a>. We are here to help!</p>
        </div>
    </div>
    <div style="background-color: rgba(0, 74, 101, 0.0705882353); text-align: center; padding: 20px;">
        <h1 style="margin: 0;">Got Questions?</h1>
        <p>We have got you covered! Get in touch with us</p>
        <table class="responsive-table" style="width: 100%; margin-bottom: 20px;">
            <tr>
                <td style="text-align: center; padding: 10px;">              
                    <img src="https://platform.fritado.com/src/assets/images/call.svg" alt="phone"/>
                    <h4 style="margin: 5px 0;font-size:16px;">+91 974 1156 389</h4>
                    <p style="margin: 0;">Sales Toll free</p>
                </td>
                <td style="text-align: center; padding: 10px;">
                     <img src="https://platform.fritado.com/src/assets/images/sms.svg" alt="sms"/>
                    <h4 style="margin: 5px 0; font-size:16px;">24*7 support</h4>
                    <p style="margin: 0;">Chat now</p>
                </td>
                <td style="text-align: center; padding: 10px;">
                          <img src="https://platform.fritado.com/src/assets/images/email.svg" alt="email"/>
                    <h4 style="margin: 5px 0; font-size:16px;"> <a href="mailto:support@fritado.com"> Email </a></h4>
                    <p style="margin: 0;">Support</p>
                </td>
            </tr>
        </table>
        <div style="margin-bottom: 10px; text-align: center;">
            <h1 style="margin: 0;">Fritado Technologies</h1>
            <p>Fritado AI optimizes SEO for enterprises, automating up to 90% of tasks using advanced AI and machine learning, resulting in increased website traffic and profitability.</p>
        </div>
        </div>
        <div style="background-color: rgba(0, 74, 101, 0.47);  padding: 8px 0;">
            <p style=" text-align: center;"><a href="https://platform.fritado.com/" target="_blank"> Login to your account</a> Unsubscribe: <a href="https://fritado.com" target="_blank">view privacy policy </a></p>
            <table style="margin: 0 auto;">
                <tr>
                    <td style="padding: 0 10px;">
                         <a href="https://www.facebook.com/fritado" target="_blank">
                        <img src="https://ci3.googleusercontent.com/meips/ADKq_Nb93YoQJQvUMfE_TNCWoyeNB63zpRICE-40HLbc-u2efrj9iBHRJ_TLn3cHGbJWZQwtZkjvYgMGqzlIWd7sD5wqaQPIsZa7wqHw73I949xRd3TNczzdddd0zjQ8JL8OEN86mtwLucsoQ2oOXMl6cjq43MW0bnZ0Q8sRu7U=s0-d-e1-ft#https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-dark-gray/facebook@2x.png" width="20" height="0" alt="Facebook" title="Facebook" style="display:block;height:auto;border:0" class="CToWUd" data-bit="iit">
                        </a>
                    </td>
                    <td style="padding: 0 10px;">
                        <a href="https://www.twitter.com" target="_blank">
                        <img src="https://ci3.googleusercontent.com/meips/ADKq_NY7KZsZaD38mbbY8GAQz9crvbhEKxar0R9rK-QcF_c3cBUsiitlMq35_3iD8BYJyUT40no5bXr2GFBnKJxXe6IisS8x7lQ7HqhRW2du0oRaDphxthde8HvIcTCxojDRc1Zv0nCJwGf0jfAM0Hcpql_GmRDP9lzk8YW7GQ=s0-d-e1-ft#https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-dark-gray/twitter@2x.png" width="20" height="20" alt="Twitter" title="Twitter" style="display:block;height:auto;border:0" class="CToWUd" data-bit="iit" jslog="32272; 1:WyIjdGhyZWFkLWY6MTgwMTIxMTk5Mzc3NDg4MTc5NyJd; 4:WyIjbXNnLWY6MTgwMTIxMTk5Mzc3NDg4MTc5NyJd">
                        </a>
                    </td>
                    <td style="padding: 0 10px;">
                    <a href="https://www.youtube.com/channel/UCz9Z6--N5RmuLfa3IqnfPVg" target="_blank">
                      <img src="https://ci3.googleusercontent.com/meips/ADKq_NYMNw95EzujJn228ElJfhoB-WoXu0aY1fd6ra2dbWaa3UArzpUvM9ayAEQ5BA-oCGNVLY7qXGNHwiHtYYaerCNTsH1Y7U4jXx_wt4ghM6nnoznh4wYH4O-IbUSHyYSqC8L6sjv8EJjmaJHNyiavTUdfFBsuBowOac709A=s0-d-e1-ft#https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-dark-gray/youtube@2x.png" width="20" height="20" alt="YouTube" title="YouTube" style="display:block;height:auto;border:0" class="CToWUd" data-bit="iit"></a>
                    </td>
                </tr>
            </table>
        </div>
        <div style="font-size: 12px; color: #aaaaaa; margin-top: 15px; margin-bottom: 15px; text-align: center;">
            &copy; 2024 Fritado Technologies | All rights reserved
        </div>
</body>
</html>
`;
};
module.exports = emailTemplate;
