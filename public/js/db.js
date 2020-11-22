/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const dbPromise = idb.open('ligabola', 1, (upgradeDB) => {
  if (!upgradeDB.objectStoreNames.contains('teamFav')) {
    // membuat database baru apabila belum ada
    const teamStore = upgradeDB.createObjectStore('teamFav', {
      keyPath: 'id',
      autoIncrement: false, // karena di API sudah tersedia ID
    });
    // membuat objek khusus yang berfungsi untuk mencari data tertentu (index)
    teamStore.createIndex('id', 'id', {
      unique: true,
    });
  }
});

const Db = {
  addTeam(team) {
    return dbPromise.then((db) => {
      const tx = db.transaction('teamFav', 'readwrite');
      tx.objectStore('teamFav').put(team);
      return tx.complete;
    });
  },

  getTeam(id) {
    return dbPromise
      .then((db) => {
        const tx = db.transaction('teamFav', 'readonly');
        return tx.objectStore('teamFav').get(id);
      });
  },

  getAllTeams() {
    return dbPromise.then((db) => {
      const tx = db.transaction('teamFav', 'readonly');
      return tx.objectStore('teamFav').getAll();
    });
  },

  deleteTeam(id) {
    dbPromise
      .then((db) => {
        const tx = db.transaction('teamFav', 'readwrite');
        return tx.objectStore('teamFav').delete(id);
      });
  },
};
