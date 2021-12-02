CREATE DATABASE DATAS

CREATE TABLE Tutorials (    
  tutorial_id int IDENTITY(1,1) PRIMARY KEY,  
  tutorial_name varchar(45) NOT NULL,    
  price float    
);  

INSERT INTO Tutorials (tutorial_name, price)     
VALUES ('SQL', 20000.00),   
('Java', 25000.00),   
('Python', 30000.00),   
('MS SQL', 20000.00),     
('Android', 35000.00);  

SELECT tutorial_id, tutorial_name,  
CASE tutorial_name  
    WHEN 'SQL' THEN 'SQL is developed by IBM'  
    WHEN 'Java' THEN 'Java Java was created at Sun Microsystems Inc.'  
    WHEN 'MS SQL' THEN 'MS-SQL is developed by Microsoft Corporation.'  
    ELSE 'Do not Know.'  
END AS Description  
FROM Tutorials;  





