// function convertTime(text="") {
//     let days = 0;
//     if(text.toLowerCase().includes("days") || text.toLowerCase().includes("day")){
//         days += parseFloat(text);
//     }
//     if(text.toLowerCase().includes("hours") || text.toLowerCase().includes("hour")){
//         days += Math.ceil(parseFloat(text)/24);
//     }
//     if(text.toLowerCase().includes("months") || text.toLowerCase().includes("month")){
//         days += Math.ceil(parseFloat(text)*24);
//     }
//     if(text.toLowerCase().includes("years") || text.toLowerCase().includes("year")){
//         days += Math.ceil(parseFloat(text)*24*12);
//     }
//     return days;
// }

const { default: axios } = require("axios");

// console.log(convertTime("73 eee"));

// // console.log(25/2);

const URL = `https://contoso.communication.azure.com//sms?api-version=2021-03-07`;

let headersList = {
  Accept: "*/*",
  "Content-Type": "application/json",
};
let reqOptions = {
  url: URL,
  method: "POST",
  headers: headersList,
  data: {
    from: "+8801766324950",
    smsRecipients: [
      {
        to: "+8801629549539",
      },
    ],
    message: "Hello world!",
    smsSendOptions: {
      enableDeliveryReport: true,
      tag: "testSmsRequest",
    },
  },
};

const res = axios(reqOptions)
  .then((response) => {
    console.log({ response });
    return response;
  })
  .catch((error) => {
    console.log({ error });
    throw error;
  });
