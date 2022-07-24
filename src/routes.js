const {
  homeHandler,
  addNewNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

// // cors
// {
//   options: {
//     cors: {
//       origin: ['*'],
//     }
//   }
// }

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: homeHandler,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNewNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
