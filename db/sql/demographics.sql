CREATE TABLE demographics (
  demographics_id INT AUTO_INCREMENT NOT NULL,
  user_id INT,
  personal_first_name VARCHAR(255),
  personal_last_name VARCHAR(255),
  personal_date_of_birth VARCHAR(255),
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  address_town VARCHAR(255),
  address_state VARCHAR(255),
  address_country VARCHAR(255),
  address_zip VARCHAR(255),
  PRIMARY KEY (demographics_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
