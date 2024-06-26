const axios = require('axios');
const https = require('https');

async function sendArticle(articleID, articleContent, clientID) {
   // const url = 'https://projects99.tech/anisha/webhook.php';
   const url = `https://jhanvient.in/fritado/webhook.php`;

    const payload = {
        ArticleID: articleID,
        ArticleContent: articleContent,
        ClientID: clientID
    };

    console.log('Sending article with payload:', payload);

    const agent = new https.Agent({ keepAlive: false });

    try {
        const response = await axios.post(url, payload, {
            timeout: 10000, 
            httpsAgent: agent
        });
        console.log(`Status: ${response.status}`);
        console.log('Response:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

module.exports = sendArticle;


// userSchema.pre("save", async function (next) {
//     try {
//       const Payment = require("./BillingsPlans/payment");
//       const payments = await Payment.find({ user: this._id })
//         .sort("-createdAt")
//         .limit(1);
//       if (payments.length > 0 && payments[0].paymentStatus === "Paid") {
//         this.accountStatus = "Active";
//       } else {
//         this.accountStatus = "Inactive";
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });


// Middleware to update account status based on payment status
// userSchema.pre("save", async function (next) {
//     try {
//       const currentDate = new Date();
//       const freeTrialEndDate = new Date(this.createdAt.getTime() + 6 * 24 * 60 * 60 * 1000);
  
//       // Check the most recent payment
//       const payments = await Payment.find({ user: this._id }).sort("-createdAt").limit(1);
      
//       if (currentDate <= freeTrialEndDate) {
//           // Scenario 1: User within Free Trial Period
//         this.accountStatus = "Active";
        
//         if (payments.length > 0 && payments[0].paymentStatus === "Paid") {
//           const paymentDate = new Date(payments[0].createdAt);
//           const extendedTrialEndDate = new Date(freeTrialEndDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          
//           //  Scenario 2: User Makes Payment During Free Trial Period
//           if (paymentDate <= freeTrialEndDate) {
//             // Extend the account status by the payment period after the free trial ends
//             if (currentDate <= extendedTrialEndDate) {
//               this.accountStatus = "Active";
//             } else {
//               this.accountStatus = "Inactive";
//             }
//           }
//         }
//       } else {
//            // Scenario 3: User Outside Free Trial Period, No Payment
//         if (payments.length > 0 && payments[0].paymentStatus === "Paid") {
//           const paymentDate = new Date(payments[0].createdAt);
//           const paymentExpires = new Date(paymentDate.getTime() + 29 * 24 * 60 * 60 * 1000);
  
//           // Scenario 4: User Outside Free Trial Period, Payment Made
//           if (currentDate <= paymentExpires) {
//             this.accountStatus = "Active";
//           } else {
//             this.accountStatus = "Inactive";
//           }
//         } else {
//           this.accountStatus = "Inactive";
//         }
//       }
  
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
