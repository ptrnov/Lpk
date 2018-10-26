export let GET_STRING_TABLE = [
  {
    ID:0,
    NAME:"CREATE user TEBEL",
    TABEL:"CREATE TABLE IF NOT EXISTS user (id TEXT,username TEXT,password TEXT,nama TEXT,jabatan TEXT,polda TEXT,polwil TEXT)",
    UNIQUE:"CREATE UNIQUE INDEX IF NOT EXISTS user_UNIQ_ID ON user (id,username)",
  }
];
