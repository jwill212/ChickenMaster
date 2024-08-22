CREATE DATABASE ChickenResourceManager;

CREATE TABLE Farm (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT null UNIQUE,
    Manager VARCHAR(255) NOT NULL,
    ChickenCapacity INT NOT NULL,
    ImagePath VARCHAR(255)
);

CREATE TABLE Chicken (
    id SERIAL PRIMARY KEY,
    Farm_id INT REFERENCES Farm(id) ON DELETE CASCADE,
    Name VARCHAR(255) NOT NULL,
    Breed VARCHAR(100) NOT NULL,
    EggColor VARCHAR(50),
    HatchDate TIMESTAMP NOT NULL,
    ImagePath VARCHAR(255)
);


CREATE TABLE ChickenCheckin (
    id SERIAL PRIMARY KEY,
    Chicken_id INT REFERENCES Chicken(id) ON DELETE CASCADE,
    CheckDate TIMESTAMP NOT NULL,
    Height DECIMAL(5, 2) NOT NULL,  -- Assuming height is in cm
    Weight DECIMAL(5, 2) NOT NULL,  -- Assuming weight is in kg
    HealthScore DECIMAL(3, 2) NOT NULL,  -- Score between 0 and 10 = 0 means it's time for chicken tenders, 10 means it's got a long life ahead
    AntibioticsAdministered BOOLEAN NOT NULL,
    ImagePath VARCHAR(255)
);