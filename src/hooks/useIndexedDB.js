import { useState, useEffect } from 'react'

import { INDEXEDDB_ERROR, KEY_PATH, READ_ONLY, READ_WRITE } from '../shared/constants'
import { hasActivity } from '../shared/helpers'

export const useIndexedDB = (dbName, storeName) => {
  const [db, setDB] = useState(null)
  const [fetchData, setFetchData] = useState(true)
  const [indexedDBActivity, setIndexedDBActivity] = useState([])

  useEffect(() => {
    const openDB = window.indexedDB.open(dbName, 1)

    openDB.onupgradeneeded = event => {
      const db = event.target.result
      db.createObjectStore(storeName, { keyPath: KEY_PATH })
    }

    openDB.onsuccess = event => {
      setDB(event.target.result)
    }

    openDB.onerror = event => {
      console.error(INDEXEDDB_ERROR, event.target.error)
    }
  }, [dbName, storeName])

  useEffect(() => {
    const getAllRecords = async () => {
      return new Promise((resolve, reject) => {
        if (db) {
          const transaction = db.transaction([storeName], READ_ONLY)
          const objectStore = transaction.objectStore(storeName)
          const response = objectStore.getAll()

          transaction.oncomplete = () => {
            resolve(response.result)
          }

          transaction.onerror = () => {
            reject(transaction.error)
          }
        }
      })
    }

    const getIndexedDBActivity = async () => {
      const records = await getAllRecords()
      setIndexedDBActivity(records)
      setFetchData(false)
    }

    if (fetchData) {
      getIndexedDBActivity()
    }
  }, [db, fetchData])

  const deleteRecord = async (record) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], READ_WRITE)
      const objectStore = transaction.objectStore(storeName)
      const response = objectStore.delete(record)

      transaction.oncomplete = () => {
        resolve(response.result)
        setFetchData(true)
      }

      transaction.onerror = () => {
        reject(transaction.error)
      }
    })
  }

  const putRecord = async (record) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], READ_WRITE)
      const objectStore = transaction.objectStore(storeName)
      const response = objectStore.put(record)

      transaction.oncomplete = () => {
        resolve(response.result)
        setFetchData(true)
      }

      transaction.onerror = () => {
        reject(transaction.error)
      }
    })
  }

  const updateIndexedDBActivity = async (monthActivity) => {
    const monthHasActivity = hasActivity(monthActivity)

    if (!monthHasActivity) {
      await deleteRecord(monthActivity.month)
    } else {
      await putRecord(monthActivity)
    }
  }

  return {
    indexedDBActivity,
    updateIndexedDBActivity
  }
}
