DROP DATABASE IF EXISTS todoDB;
CREATE DATABASE todoDB;
USE todoDB;

CREATE TABLE todos(
id INTEGER(11) NOT NULL AUTO_INCREMENT,
todo VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO todos (todo) VALUES ("Finish School project");
INSERT INTO todos (todo) VALUES ("Pick up brother from school");