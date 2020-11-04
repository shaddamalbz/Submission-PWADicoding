/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import idb from 'idb';

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

// add data
function addTeamFav(data) {
  dbPromise
    .then((db) => {
      // transacation pembungkus untuk menjaga integritas data
      const tx = db.transaction('teamFav', 'readwrite');
      tx.objectStore('teamFav').put(data);
      return tx.complete;
    })
    .then(() => {
      console.log('Team berhasil disimpan ke favorit');
    });
}

// READ data
function getAllTeamFav() {
  dbPromise
    .then((db) => {
      const tx = db.transaction('teamFav', 'readonly');
      const store = tx.objectStore('teamFav');
      return store.getAll();
    });
}

// check data
function isExist(id) {
  dbPromise
    .then(async (db) => {
      const tx = await db.transaction('teamFav', 'readonly');
      const data = await tx.objectStore('teamFav').get(id);
      // return nya blom tau
    });
}

// delete
function deleteTeamFav(id) {
  dbPromise
    .then((db) => {
      const tx = db.transaction('teamFav', 'readwrite');
      tx.objectStore('teamFav').delete(id);
      return tx.complete;
    });
}
