export let GET_STRING_TABLE = [
  {
    ID:0,
    NAME:"CREATE user TEBEL",
    TABEL:"CREATE TABLE IF NOT EXISTS user (username TEXT,password TEXT,polda TEXT,polwil TEXT)",
    UNIQUE:"CREATE UNIQUE INDEX IF NOT EXISTS user_UNIQ_ID ON user (username)",
  }
];
