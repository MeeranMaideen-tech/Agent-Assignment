// import React from 'react';

// const ContactTable = ({ contacts }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border text-sm bg-white rounded-xl shadow">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-2 px-3 text-left">First Name</th>
//             <th className="py-2 px-3 text-left">Phone</th>
//             <th className="py-2 px-3 text-left">Notes</th>
//           </tr>
//         </thead>
//         <tbody>
//           {contacts.map((contact, index) => (
//             <tr key={index} className="border-t">
//               <td className="py-2 px-3">{contact.firstName}</td>
//               <td className="py-2 px-3">{contact.phone}</td>
//               <td className="py-2 px-3">{contact.notes}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ContactTable;

import React from 'react';

const ContactTable = ({ contacts }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="px-6 py-4">{contact.firstName}</td>
              <td className="px-6 py-4">{contact.phone}</td>
              <td className="px-6 py-4">{contact.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
