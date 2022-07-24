const { nanoid } = require('nanoid');
const notes = require('./notes');

const homeHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    message: 'Selamat datang di Homepage',
  });
  response.type('application/json');
  response.header('X-Powered-By', 'Node.js');
  response.code(200);
  return response;
};

const addNewNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const NewNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(NewNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      note: {
        noteId: id,
      },
    });
    response.header('Access-Control-Allow-Origin', '*');
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal menambahkan catatan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal memperbarui catatan. ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Gagal menghapus catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  homeHandler,
  addNewNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
