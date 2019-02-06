CREATE TABLE teachers (
  teacher_id INT AUTO_INCREMENT NOT NULL,
  school_id INT,
  teacher_name VARCHAR(255),
  teacher_email VARCHAR(255),
  PRIMARY KEY (teacher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
