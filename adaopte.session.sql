--@block 
CREATE TABLE animals(
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


--@block
ALTER TABLE donation
ADD firstname TEXT,
ADD name TEXT,
ADD frequency TEXT,
ADD billing_method TEXT


--@block
INSERT INTO animals (name, age, breed, type, city, zipcode, description)
VALUES 
    ('Bobby', 3, 'Chow_chow', 'chien', 'Lyon', 69000, 'Bobby est un chien très calme et calin qui recherche une famille aimante.'),
    ('Lady of destruction', 4, '', 'chat', 'Marseille', 13000, 'A l''opposé de son nom, Lady of destruction est un chat tout à fait adorable qui adore se faire carresser sur le ventre.')


--@block
INSERT INTO adoption_center (name, city, zipcode)
VALUES 
    ('69 raisons d''adopter', 'Lyon', 69000),
    ('Tarpin mignon', 'Marseille', 13000),
    ('Adoptez-moi', 'Bordeaux', 33000)


--@block
UPDATE animals
JOIN adoption_center ON animals.city = adoption_center.city
SET animals.adoption_center_id = adoption_center.id


--@block
INSERT INTO donation(amount, firstname, name, frequency, billing_method)
VALUES
    (10, 'Juliette', 'B', 'mensuel', 'virement SEPA'),
    (20, 'Stan', 'J', 'ponctuel', 'carte bancaire'),
    (15, 'Victoria', 'V', 'ponstuel', 'carte bancaire')


--@block
INSERT INTO adoption_center_donation (adoption_center_id, donation_id)
SELECT adoption_center.id, donation.id
FROM adoption_center
JOIN donation
WHERE adoption_center.city = 'Lyon';


--@block
INSERT INTO volunteer(firstname, lastname, email, age, city, zipcode, disponibility, motivation, adoption_center_id)
    SELECT
    'Juliette', 
    'C', 
    'juliette.c@gmail.com', 
    25, 
    'Marseille', 
    13000, 
    'tous les samedis', 
    'J''ai toujours aimé les animaux depuis ma tendre enfance, il est normal pour moi de me rendre disponibles pour rendre leur séjour en centre plus supportable.', 
    adoption_center.id FROM adoption_center WHERE adoption_center.city = 'Marseille'

    UNION ALL

    SELECT
    'Evan', 
    'R', 
    'evanLeBoGoss@gmail.com', 
    29, 
    'Lyon', 
    69000, 
    'tous les mardis', 
    'J''adore les animaux, c''est ma passion depuis tout petit.', 
    adoption_center.id FROM adoption_center WHERE adoption_center.city = 'Lyon'