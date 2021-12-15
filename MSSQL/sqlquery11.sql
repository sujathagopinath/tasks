USE SOURCE
---- Rollup, cross join, update join, comments, identity, concat

CREATE TABLE EMP (  
 emp_id int identity,  
 fullname varchar(65),  
 occupation varchar(45),  
 gender varchar(30),  
 salary int,  
 country varchar(55)  
);  

INSERT INTO EMP(fullname, occupation, gender, salary, country)  
VALUES ('John Doe', 'Writer', 'Male', 62000, 'USA'),  
('Mary Greenspan', 'Freelancer', 'Female', 55000, 'India'),  
('Smith', 'Scientist', 'Male', 65000, 'USA'),
('Grace Smith', 'Developer', 'female', 85000, 'canada'),
('Grace ', 'Testing', 'Male', 75000, 'Britain')

select * from EMP

SELECT country, SUM(salary) AS "Total Salary"  
FROM EMP 
GROUP BY country;  

SELECT country, SUM(salary) AS "Total Salary"  
FROM EMP 
GROUP BY ROLLUP (country); --- gives the grand total of the country total salary

---OR

SELECT country, SUM(salary) AS "Total Salary"  
FROM EMP 
GROUP BY country WITH ROLLUP;  

SELECT COALESCE(country, 'GRAND TOTAL' ) AS country, SUM(salary) AS "Total Salary"  
FROM EMP  
GROUP BY ROLLUP (country); 

SELECT country,gender, SUM(salary) AS "Total Salary"  
FROM EMP 
GROUP BY country,gender;

SELECT gender, country, SUM(salary) AS "Total Salary"  
FROM EMP 
GROUP BY gender, country WITH ROLLUP; 
 
SELECT gender, country, SUM(salary) AS "Total Salary",  
GROUPING(gender),    
GROUPING(country)  
FROM EMP  
GROUP BY   
ROLLUP (gender, country); 

create table Student (admission_no int, firstname varchar(20),
lastname varchar(30), age int,city varchar(20))

create table stud (admission_no int,course varchar(20), amount_paid int)

insert into Student values(1234,'arjith','sighn',21,'Texas'),
(4567,'virat','kholi',34,'Britain'),
(3324,'peter','john',29,'Alsaka'),
(2135,'charles','cox',34,'california'),
(3324,'paul','ward',45,'New york')

insert into stud values(3324,'java',34000),
(7755,'Android',25000),
(3324,'java',35000),
(2312,'AWS',24000),
(1679,'QA',56000)

SELECT Student.admission_no, Student.firstname, Student.lastname,
stud.course, stud.amount_paid    
FROM Student    
CROSS JOIN stud;

SELECT Student.admission_no, Student.firstname, Student.lastname,   
stud.course, stud.amount_paid    
FROM Student    
CROSS JOIN stud 
WHERE Student.admission_no = stud.admission_no; 

SELECT Student.admission_no, Student.firstname, Student.lastname,   
stud.course, stud.amount_paid    
FROM Student    
CROSS JOIN stud  
WHERE Student.admission_no = stud.admission_no  
ORDER BY course;  

CREATE TABLE contact (   
 addmission_no INT,  
 cellphone BIGINT  
)  

INSERT INTO contact (addmission_no, cellphone)  
VALUES (3324, 879373743274), (7555, 788247344374),  
(4321, 932167583945), (8245, 987654985632),  
(5112, 75758904532); 

SELECT Student.admission_no, Student.firstname, Student.lastname,   
stud.course, stud.amount_paid, contact.cellphone  
FROM Student    
CROSS JOIN stud  
CROSS JOIN contact  
WHERE Student.admission_no = stud.admission_no AND stud.admission_no = contact.addmission_no

create table Merit(
performance int NOT NULL primary key,
percentage float NOT NULL
)

insert into Merit (performance,percentage) 
values(11,50),
(15,70),
(16,80.00),
(20,90.25),
(30,25.24)

CREATE TABLE Emplodata (  
id INT NOT NULL IDENTITY PRIMARY KEY,  
emp_name VARCHAR(25) NOT NULL,  
performance INT NULL,  
salary FLOAT NULL,  
CONSTRAINT fk_per FOREIGN KEY(performance)
REFERENCES Merit(performance)  
);  

INSERT INTO Emplodata(emp_name, performance, salary)  
VALUES('John Doe', 11, 62000),  
('Mary Greenspan', 15, 55000),  
('Grace Smith', 16, 85000),  
('Mike Johnson', 20, 250000),  
('Rose Dell', 30, 58000)

select * from Merit
select * from Emplodata

UPDATE Emplodata  
SET salary = salary + salary * percentage  
FROM Emplodata e  
INNER JOIN Merit m    
ON e.performance = m.performance;  

/*
This is a multiline comments
*/

create table people(
personid int identity(10,1) Primary key,
fullname varchar(20)
)

insert into people output inserted.personid values('sujatha'),('akhshy'),('madhu')

select * from people

SET IDENTITY_INSERT people ON
insert into people(fullname,personid) output inserted.personid values('rahul',15)
SET IDENTITY_INSERT people OFF

SELECT MAX(personid) AS maxidentity FROM people;

select @@IDENTITY

SELECT MAX(personid) AS maxid FROM people;  
  
INSERT INTO people(Fullname)  
VALUES('Jennifer Winset');  
  
SELECT SCOPE_IDENTITY();  
SELECT @@IDENTITY;  

CREATE TRIGGER Insertion  
ON Emplodata 
FOR INSERT AS     
 BEGIN    
  INSERT INTO Student VALUES (7555,'suja','g',21,'chennai')    
 END; 

 INSERT INTO Emplodata VALUES ('John Mathew',20,23400);
 
 SELECT MAX(id) FROM Emplodata
SELECT MAX(admission_no) FROM Student
  
SELECT @@IDENTITY  
SELECT SCOPE_IDENTITY()  

SELECT IDENT_CURRENT('people') AS identity_value;

SELECT IDENTITY(INT, 100, 1) AS employee_id,  
 employeeid,  
  employeename,
  DOB,cityid
INTO temp_data  
FROM Employee;  

select * from Employee

sp_help 

CREATE TABLE POSITION (  
    PositionID INT IDENTITY (1, 1) PRIMARY KEY,  
    Position_name VARCHAR (255) NOT NULL  
);  

CREATE TABLE people_position (  
    personid INT,  
    PositionID INT,  
    PRIMARY KEY (personid, PositionID),  
    FOREIGN KEY (personid) REFERENCES people (personid),  
    FOREIGN KEY (PositionID) REFERENCES POSITION (PositionID)  
); 

BEGIN TRANSACTION  
    BEGIN TRY  
        -- insert a new row into the person table  
        INSERT INTO people(Fullname)   
     VALUES('Joan Smith');  
  
        -- assign a position to a new person  
        INSERT INTO people_position (personid, PositionID)  
        VALUES(@@IDENTITY, 10);  
    END TRY  
    BEGIN CATCH  
         IF @@TRANCOUNT > 0    
            ROLLBACK TRANSACTION;    
    END CATCH  
  
    IF @@TRANCOUNT > 0    
        COMMIT TRANSACTION;  

Insert into people values('peter')

select * from people

CREATE TABLE TwoIdentityTable (  
 ID1 INT IDENTITY (10, 1) NOT NULL,  
 ID2 INT IDENTITY (100, 1) NOT NULL  
)   

CREATE TABLE TwoIdentity (  
 ID1 INT IDENTITY (10, 1) NOT NULL,  
 SecondID AS 10000-ID1,  
 Descriptions VARCHAR(60)  
)  


insert into TwoIdentity values('helloworld'),('new to MSSQL')

select * from TwoIdentity

select CONCAT ('welcome','to','learning','of','','MSSQL') AS CONCATSTRING

SELECT CONCAT(NULL, 'java', 'is', 'language') AS concat_string;  

SELECT CONCAT('15', '0', '22') AS concat_string;  

SELECT  admission_no, firstname, lastname,  
    CONCAT(firstname, ' ', lastname) AS full_name  
FROM Student  
ORDER BY full_name; 

SELECT CONCAT_WS(' ', 'Hello','world') AS concat_string;  


SELECT  admission_no, firstname, lastname,  
    CONCAT_WS(',',firstname, lastname) AS full_name  
FROM Student  
ORDER BY full_name; 

SELECT   
STRING_AGG(CONCAT_WS(',', firstname, lastname, age, city), char(13)) AS StudentInfo  
FROM Student;  






































































