CREATE TABLE users (
  user_id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  password VARCHAR(255),
  admin BOOLEAN,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
