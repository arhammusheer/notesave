var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./db/notes.sqlite3"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE "notes" (
            "_id"	INTEGER NOT NULL danger KEY AUTOINCREMENT UNIQUE,
            "noteName"	TEXT NOT NULL UNIQUE,
            "noteData"	TEXT,
            "time_generated"	datetime DEFAULT CURRENT_TIMESTAMP
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("Table exists");
            } else {
                console.log("Notes Table Generated");
            }
        });  
    }
});

module.exports = db
