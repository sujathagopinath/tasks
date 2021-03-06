CREATE DATABASE TEST

CREATE TABLE STUDENT(
NAME VARCHAR(10) NOT NULL,
EMAIL VARCHAR(15) NOT NULL
)

ALTER TABLE STUDENT 
ADD SALARY INT

ALTER TABLE STUDENT
ALTER COLUMN SALARY BIGINT

ALTER TABLE STUDENT
DROP COLUMN AGE

EXEC SP_RENAME 'STUDENT.SALARY','HOURS','COLUMN'

INSERT INTO STUDENT VALUES('sujatha','suja@gm.com',12)
INSERT INTO STUDENT VALUES('akhshy','ak@gm.com',10)
INSERT INTO STUDENT VALUES('madhu','madhu@gm.com',8)
INSERT INTO STUDENT VALUES('riya','riya@gm.com',9)
INSERT INTO STUDENT VALUES('varun','varun@gm.com',14)
INSERT INTO STUDENT VALUES('aaa','AAAA@gm.com',14)

DELETE FROM STUDENT WHERE NAME='riya'

UPDATE STUDENT SET HOURS = 12 where NAME ='akhshy'

SELECT * FROM STUDENT

...Aggeratefunction

SELECT MIN(HOURS) AS "Minimum Hours" FROM STUDENT;  

SELECT NAME, MIN(HOURS) AS "Minimum HOURS"   
FROM STUDENT  
GROUP BY NAME;  

SELECT NAME, MIN(HOURS) AS "Minimum HOURS"   
FROM STUDENT 
GROUP BY NAME  
HAVING MIN(HOURS)>8;  

SELECT HOURS,MIN(DISTINCT NAME) AS "NAME"   
FROM STUDENT 
GROUP BY HOURS;  

SELECT DISTINCT HOURS,   
MIN(NAME) OVER (PARTITION BY HOURS) AS "NAME"    
FROM STUDENT;  

CREATE TABLE EMPLOYEEINFO(
EMP_NAME VARCHAR(15),
DEPT VARCHAR(20),
EMP_ID INT,
SALARY INT
)

INSERT INTO EMPLOYEEINFO(EMP_NAME,DEPT,EMP_ID,SALARY)VALUES('aaa','Development',101,20000)
INSERT INTO EMPLOYEEINFO VALUES('bbb','Testing',102,21000)
INSERT INTO EMPLOYEEINFO VALUES('ccc','Data analyst',103,22000)
INSERT INTO EMPLOYEEINFO VALUES('ddd','QA',104,23000)
INSERT INTO EMPLOYEEINFO VALUES('EEE','BFS',105,24000)

SELECT * FROM EMPLOYEEINFO

SELECT NAME  
FROM STUDENT  
INTERSECT  
SELECT EMP_NAME
FROM EMPLOYEEINFO;  

SELECT *  
FROM EMPLOYEEINFO
WHERE EMP_ID IN (101,102,106);   

SELECT *  
FROM EMPLOYEEINFO
WHERE EMP_ID=106
OR EMP_ID = 102
OR EMP_ID = 103

SELECT *  
FROM EMPLOYEEINFO
WHERE EMP_ID=101
AND EMP_ID = 102
AND EMP_ID = 103

SELECT *  
FROM EMPLOYEEINFO 
WHERE EMP_NAME <> 'aaa'  
AND  EMP_NAME <> 'bbb'  
AND EMP_NAME <> 'FFF'; 

SELECT *  
FROM STUDENT 
WHERE NAME NOT LIKE '%a' ---LAST LETTER

SELECT *  
FROM STUDENT 
WHERE NAME NOT LIKE 'a%'  ---FIRST LETTER

SELECT *  
FROM EMPLOYEEINFO 
WHERE EMP_ID NOT BETWEEN 103 AND 105

INSERT INTO EMPLOYEEINFO  
(EMP_ID, EMP_NAME)  
SELECT HOURS, NAME
FROM STUDENT 
WHERE NAME IS NOT NULL; 

SELECT * FROM EMPLOYEEINFO

UPDATE EMPLOYEEINFO  
SET EMP_NAME = 'Active'  
WHERE EMP_NAME IS NOT NULL;  

DELETE  
FROM EMPLOYEEINFO  
WHERE EMP_NAME IS NOT NULL;  

---GROUPING SETS

 CREATE TABLE PRODUCTQTY(  
 ID INT IDENTITY(1,1),  
 REGION VARCHAR(100),  
 PRODUCT VARCHAR(50),  
 YEAR INT 
) 

INSERT INTO PRODUCTQTY(REGION, PRODUCT, YEAR)  
VALUES('East', 'Computer', 2020),  
('South', 'Computer', 2020),  
('North', 'Computer', 2020),  
('East', 'Hard Disk', 2020),  
('West', 'Computer', 2021),  
('South', 'Hard Disk', 2021),  
('West', 'Hard Disk', 2021),  
('East', 'Pen Drive', 2021),  
('North', 'Mouse', 2019),  
('South', 'Pen Drive', 2019),  
('East', 'Mouse', 2019),  
('West', 'Pen Drive', 2019)

SELECT * FROM PRODUCTQTY

SELECT REGION, SUM(YEAR) AS TotalYEAR   
FROM PRODUCTQTY  
GROUP BY REGION;  

SELECT Region, NULL AS Product, SUM(YEAR) AS TotalQty    
FROM ProductQty   
GROUP BY Region  
UNION ALL  
SELECT NULL AS Region, Product, SUM(YEAR) AS TotalQty  
FROM ProductQty  
GROUP BY Product 


SELECT GROUPING(Region) AS Is_RegionGrouped, GROUPING(Year) AS Is_YearGrouped,   
Region,SUM(YEAR) AS TotalPurchaseQty    
FROM ProductQty   
GROUP BY GROUPING SETS ((Region), (Year), (Region, Year), ( ))   
ORDER BY Region, Year;  

---CONSTRAINTS

CREATE TABLE CRICKETERS1 
( cricketer_id INT,  
  last_name VARCHAR(50) NOT NULL,  
  first_name VARCHAR(50) NOT NULL,  
  salary MONEY,  
  CONSTRAINT CRICKETERS1_pk PRIMARY KEY (last_name, first_name)  
);  

INSERT INTO CRICKETERS(cricketer_id,last_name,first_name,salary) 
VALUES
(201,'KHOLI','VIRAT',30000),
(202,'MAHENDRA','DHONI',31000),
(203,'SURESH','RAINA',32000)

SELECT * FROM CRICKETERS

---PRIMARY KEY 
ALTER INDEX CRICKETERS_pk ON CRICKETERS  
REBUILD;

---VIEWS

CREATE VIEW [EMPLOYEEINFO_VIEW] AS  
SELECT EMP_ID, DEPT,EMP_NAME,SALARY
FROM EMPLOYEEINFO  
WHERE EMP_ID > 101; 

SELECT * FROM [EMPLOYEEINFO_VIEW]

ALTER VIEW [EMPLOYEEINFO_VIEW] AS  
SELECT EMP_ID,DEPT,EMP_NAME,SALARY 
FROM EMPLOYEEINFO 
WHERE EMP_ID >104;  

USE TESTDB

---Substring

Select SUBSTRING('NEW to MSSQL',2,8)AS Result 

SELECT name, SUBSTRING(name, 1, 4) AS p_name  
      ,email, SUBSTRING(email, 5, 8) AS sub_mail  
FROM STUDENT;  

SELECT name, email,   
    SUBSTRING(email, CHARINDEX('@', email) + 1, LEN(email)) AS DomainName  
FROM STUDENT;   

SELECT name  
FROM STUDENT WHERE SUBSTRING(email, LEN(email), 1) = 'm'  

SELECT name, email,  
    SUBSTRING(email, LEN(Email) - 2, 3) AS EmailString  
FROM STUDENT;  

WITH student_in_sujatha  
AS (SELECT * FROM STUDENT WHERE name = 'sujatha')  
SELECT name, email FROM student_in_sujatha;  

CREATE TABLE customer (      
  id int PRIMARY KEY,      
  c_name nvarchar(45) NOT NULL,      
  email nvarchar(45) NOT NULL,      
  city nvarchar(25) NOT NULL      
);  

INSERT INTO customer(id,c_name,email,city) 
values(1,'AAA','aa@gmail.com','chennai'),
(2,'BBB','bb@gmail.com','chennai'),
(3,'CCC','cc@gmail.com','Delhi'),
(4,'DDD','dd@gmail.com','mumbai'),
(5,'EEE','ee@gmail.com','kerala')

DECLARE Customers CURSOR
FOR 
SELECT id,c_name,email,city FROM customer

OPEN Customers

FETCH NEXT FROM Customers INTO @id,@c_name,@email,@city

DECLARE @id INT
DECLARE @c_name nvarchar(30), @c_email nvarchar(30), @c_city nvarchar(30)






















































