USE DATAS

CREATE TABLE Student (      
  id int PRIMARY KEY IDENTITY(1,1),     
  admission_no varchar(45) NOT NULL,  
  first_name varchar(45) NOT NULL,      
  last_name varchar(45) NOT NULL,  
  age int,  
  city varchar(25) NOT NULL      
);    

CREATE TABLE Fee (   
  admission_no varchar(45) NOT NULL,  
  course varchar(45) NOT NULL,      
  amount_paid int,    
); 

Insert INTO Student (admission_no,first_name,last_name,age,city)
VALUES 
(1234,'rehna','fathima',18,'chennai'),
(4567,'nikita','patel',19,'delhi'),
(1234,'pooja','vaishnav',20,'mumbai'),
(8901,'shree','vidhya',21,'hyderbad'),
(3456,'kamla','sri',22,'chennai')

INSERT INTO Student (admission_no, first_name, last_name, age, city)       
VALUES (3354,'Luisa', 'Evans', 13, 'Texas'),       
(2135, 'Paul', 'Ward', 15, 'Alaska'),       
(4321, 'Peter', 'Bennett', 14, 'California'),    
(4213,'Carlos', 'Patterson', 17, 'New York'),       
(5112, 'Rose', 'Huges', 16, 'Florida'),  
(6113, 'Marielia', 'Simmons', 15, 'Arizona'),    
(7555,'Antonio', 'Butler', 14, 'New York'),       
(8345, 'Diego', 'Cox', 13, 'California');

INSERT INTO Fee (admission_no,course,amount_paid) 
Values (1234,'MSSQL',25000),
(1999,'MySQL',26000),
(2000,'Java',27000),
(20001,'Python',28000),
(12345,'JS',29000),
(1236,'c++',21000),
(1237,'Ruby',22000),
(1238,'Docker',23000)

SELECT Student.first_name, Student.last_name,Student.admission_no,Student.age, Fee.admission_no,Fee.course,Fee.amount_paid
FROM Student
INNER JOIN Fee ON Student.admission_no = Fee.admission_no

SELECT s1.first_name, s1.city, s2.last_name 
FROM Student s1, Student s2
WHERE s1.id <> s2.id AND s1.city = s2.city
ORDER BY s1.city

SELECT Student.first_name, Student.last_name,Student.admission_no,Student.age, Fee.admission_no,Fee.course,Fee.amount_paid
FROM Student
CROSS JOIN Fee WHERE Student.admission_no = Fee.admission_no

SELECT Student.first_name, Student.last_name,Student.admission_no,Student.age, Fee.admission_no,Fee.course,Fee.amount_paid
FROM Student
LEFT OUTER JOIN Fee ON Student.admission_no = Fee.admission_no

SELECT Student.first_name, Student.last_name,Student.admission_no,Student.age, Fee.admission_no,Fee.course,Fee.amount_paid
FROM Student
RIGHT OUTER JOIN Fee ON Student.admission_no = Fee.admission_no

SELECT Student.first_name, Student.last_name,Student.admission_no,Student.age, Fee.admission_no,Fee.course,Fee.amount_paid
FROM Student
FULL OUTER JOIN Fee ON Student.admission_no = Fee.admission_no

ALTER TABLE Student
ADD Username varchar(25)

SELECT * FROM Student
exec sp_columns Student; ---gives complete info of the table

ALTER TABLE Student
Drop column Username 

Exec sp_help 'dbo.Student'

SELECT * FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Student';

SELECT REPLACE ('Hello am MSSQL','MSSQL','MYSQL')AS NEWONE

SELECT REPLACE('JAVAscript is powerful Language' collate Latin1_General_CI_AS, 'javascript','java')
AS CASESENSTIVE

CREATE TABLE Places (  
    id INT PRIMARY KEY,  
    City VARCHAR (55) NOT NULL  
);  

INSERT INTO Places (id, City)  
VALUES (1, 'Shimla'),  
    (2, 'Switzerland'),  
    (3, 'Maldives'),  
    (4, 'California'); 

UPDATE Places SET City = REPLACE(City,'a','A')  
WHERE City IS NOT NULL;  

SElECT * FROM Places

SELECT *, REPLACE (City,'A','a') AS "Original city name" FROM Places

SELECT COALESCE (NULL, 'Hi',NULL,'Hello')

SELECT COALESCE (NULL,123,NULL)

create table contact(
name varchar(15),
homenumber varchar(20),
mobilenumber varchar(20)
)

INSERT INTO contact(name,homenumber,mobilenumber)values
('AAA','04428554307','908765431'),
('BBB',NULL,'908765431'),
('CCC','04428554307',NULL)

SELECT name AS Username, 
  COALESCE(homenumber, mobilenumber, 'NA') AS phone  
FROM contact 

SELECT name AS Username,
CASE 
WHEN homenumber IS NOT NULL THEN homenumber
WHEN mobilenumber IS NOT NULL THEN mobilenumber
ELSE 'NA'
END
ContactDetails
FROM contact

Create table StudentInfo(
name varchar(45),
marks Int
)

Insert into StudentInfo(name,marks)
values('ASD',80),
('ABC',85),('DEF',90),('QWE',88),('DSA',82)

SELECT * from StudentInfo

Declare @marks INT = 80

IF @marks >= 80  
BEGIN  
   PRINT 'Congratulations! You pass the Examination';  
END  

Declare @marks INT;
SET @marks= 90 ;
IF @marks > 85
BEGIN 
	PRINT 'Congratulations! You pass the examination'
END
ELSE
BEGIN
	PRINT 'You failed the exam'
END

SELECT ISNULL(NULL, 25) AS Result;   

SELECT ISNULL('java','hello')AS Newresult

DECLARE @expres VARCHAR(45);  
DECLARE @value VARCHAR(25);  
SET @expres = NULL;  
SET @value = 'MSSQL';  
SELECT ISNULL(@expres, @value) AS Result;  

























































































































