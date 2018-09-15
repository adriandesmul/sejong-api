CREATE TABLE writing (
  submission_id INT AUTO_INCREMENT NOT NULL,
  user_id INT,
  title VARCHAR(255),
  body MEDIUMTEXT,
  type VARCHAR(255),
  year INT,
  PRIMARY KEY (submission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
