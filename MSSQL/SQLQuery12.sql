USE SOURCE

---Rename, show/list, stuff,collation,composite,unique

ALTER DATABASE SOURCE MODIFY NAME = NEWSOURCE

select name,database_id from sys.databases

Exec sp_renamedb NEWSOURCE,SOURCE

select * from sys.databases

SELECT name, database_id, create_date FROM sys.databases;  

Exec sp_databases

select name,database_id,create_date
from sys.databases
where name NOT IN ('master','msdb','model')

--- Stuff replace the only specific substring

/*syntax 
stuff(source,start,length,replace string)
*/

select STUFF('hello world',2,3,'new')  -- 2=> start index 3=>removes 3 letters

SELECT STUFF('SQL Server Tutorial', 1 , 0, 'Microsoft ') AS Result;  

select stuff('1230',3,0,':') AS HHMM

select STUFF('hello world',12,3,'new') AS startlarger

DECLARE @creditcardnum VARCHAR(30) = '12345678901234';  
  
SELECT STUFF(@creditcardnum, 1, LEN(@creditcardnum) - 4,   
REPLICATE('X', LEN(@creditcardnum) - 4)) AS credit_card_no;  

---Collation has predefined set of ruleshow to access and compare

SELECT * FROM sys.fn_helpcollations();

SELECT * FROM sys.fn_helpcollations()
where name like '%Maori%'

select serverproperty('collation') As servercollation

SELECT name, collation_name AS "database collation" FROM sys.databases;  

CREATE DATABASE Testcollate COLLATE SQL_Latin1_General_CP1_CI_AS;  

Alter database Testcollate collate Greek_CI_AI

select * from Employee order by cityid collate Greek_CI_AI;
--apart from the model,mssdb,temp collate cannot be done

---Composite key (combination of more than one column)

/*CONSTRAINT COMPOSITE_KEY_NAME PRIMARY KEY (column1, column2)*/

---Unique
CREATE TABLE student_info (    
    ID int,     
    Roll_No int,    
    Name varchar(45) NOT NULL,     
    Email varchar(45),    
    City varchar(25),    
    CONSTRAINT uc_rollno_email Unique(Roll_No, Email)    
);  

insert into student_info(ID,Roll_No,Name,Email,City)
values(121,1234,'suja','suja@as.com','chennai'),
(122,1235,'sujatha','sujatha@asd.com','maduari')

select * from student_info

ALTER TABLE student_info
ADD CONSTRAINT uc_Name UNIQUE(Name);   


























