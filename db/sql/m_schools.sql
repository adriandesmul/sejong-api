CREATE TABLE schools (
  school_id INT AUTO_INCREMENT NOT NULL,
  school_name VARCHAR(255),
  school_city VARCHAR(255),
  school_state VARCHAR(255),
  school_country VARCHAR(255),
  school_zip VARCHAR(255),
  PRIMARY KEY (school_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
