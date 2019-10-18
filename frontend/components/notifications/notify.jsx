// App.notify = App.cable.subscriptions.create "WebNotificationsChannel",
//       received: data => {
//         let incomingMembership = JSON.parse(data.membership);
//         switch (data.type) {
//           case "membership":
//             receiveMembership(incomingMembership);
//             break;
//         }
//       },
//       add: function (membership) {
//         return this.perform("membership", message);
//       },
//       load: function () {
//         return this.perform("load");
//       }
//     }
//   );
// }
