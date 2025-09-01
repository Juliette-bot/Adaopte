/*:CREATE TABLE animals(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    age INT,
    breed TEXT,
    type INT NOT NULL,
    city TEXT NOT NULL,
    zipcode INT NOT NULL,
    description TEXT,
    adoption_center_id INT,
    FOREIGN KEY (adoption_center_id) REFERENCES adoption_center(id)
)
*/