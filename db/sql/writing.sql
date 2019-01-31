CREATE TABLE writing (
  submission_id INT AUTO_INCREMENT NOT NULL,
  user_id INT,
  status: BOOLEAN,
  title VARCHAR(255),
  body MEDIUMTEXT,
  type VARCHAR(255),
  year VARCHAR(4),
  division VARCHAR(255),
  folktale VARCHAR(255),
  PRIMARY KEY (submission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
