USE DATAS
---Temp table
SELECT admission_no,age,city
INTO #AGE
FROM Student
WHERE age = 15

SELECT * FROM #AGE

---Local temp table by using single hash
create table #GenderM(
name varchar(30),
age int,
gender varchar(20)
)

Insert INTO #GenderM(name,age,gender)
values ('aravind',21,'male'),
('akhshy',20,'male'),
('vicky',22,'male'),
('bala',23,'male'),
('madhu',24,'male')

INSERT INTO #GenderM 
SELECT name,age,gender
FROM #GenderM
WHERE gender = 'male'

SELECT * FROM #GenderM

CREATE PROCEDURE StudentDetails
AS
BEGIN 
	select first_name,last_name,age
	FROM Student
	ORDER BY age
END

EXEC StudentDetails

ALTER PROCEDURE StudentDetails
AS 
BEGIN
	set NOCOUNT ON;
	select first_name,last_name
	from Student
END

SELECT * FROM sys.procedures;  

SELECT *   
 FROM StudentDetails.INFORMATION_SCHEMA.ROUTINES  
 WHERE ROUTINE_TYPE = 'PROCEDURE'  

 SELECT ROUTINE_SCHEMA, ROUTINE_NAME  
FROM INFORMATION_SCHEMA.ROUTINES  
WHERE ROUTINE_TYPE = 'PROCEDURE'; 

SELECT   
  SCHEMA_NAME(schema_id) AS [Schema],  
  name  
FROM sys.objects  
WHERE type = 'P';  

---Input parameters

create table customer(
cust_name varchar(20),
states varchar(20),
email varchar(20)
)

insert into customer(cust_name,states,email)
values ('aaa','texas','abc@gmail.com'),
('bbb','california','xyz@gmail.com'),
('ccc','newyork','pqr@gmail.com'),
('ddd','florida','asd@gmail.com'),
('eee','california','qwe@gmail.com')

CREATE PROCEDURE GetDataFromCustomer(@states varchar(20))
AS
BEGIN 
	select cust_name,email,states
	from customer
	where states = @states
END

EXEC GetDataFromCustomer

EXEC [dbo].[GetDataFromCustomer] @States = 'newyork';  

EXEC GetDataFromCustomer 'california'

create procedure countStudent(@Studentcount INT OUTPUT)
AS 
BEGIN	
	select @Studentcount = COUNT(ID)FROM Student;
END

declare @TOTALSTUDENTS INT
EXEC  [dbo].[countStudent] @TotalStudents OUTPUT 
print @TOTALSTUDENTS

create procedure #temp
as
begin
	PRINT 'local storage'
end

create procedure ##temp
as
begin
	PRINT 'Global storage'
end

---SERVER CAST
SELECT 5 + '5' AS Result  

SELECT CAST(8.05 AS INT) AS RESULT

select cast(12.85 as DEC(3,1)) AS RESULT  --- 0 -> if value greater than 5 then it chnages to whole no next value
--- 1 -> if value greater than 5 after decimal point it changes to next value
--- 2 -> Arithmetic oveflow error

select cast ('2021-12-06' as datetime) AS DateTime

select cast (GETDATE() as varchar) AS Todaydate

DECLARE @strValue AS VARCHAR(50)  
SET @strValue = NULL  
SELECT CAST(@strValue AS INT) AS Result1;  
SELECT CAST(NULL AS INT) AS Result2;  

select admission_no,age from Student
where age
between CAST('20' AS INT) AND CAST('30' AS INT)

---To error msg use TRY_CAST

SELECT CAST('MSSQL' AS INT) AS RESULT

SELECT TRY_CAST('MSSQL' AS INT) AS RESULT ---Instead of showing error its turns into null

--- Triggers

create table Employees(
ID int primary key,
name varchar(30),
salary int,
gender varchar(20),
department int
)

Insert into Employees(ID,name,salary,gender,department) 
values(1,'nikita',12000,'female',2),
(2,'sharadha',13000,'female',3),
(3,'megha',14000,'female',4),
(4,'vivek',15000,'male',5),
(5,'vinay',16000,'male',2)

create table employeeverify(
ID int identity(1,1),
Audit_action text
)

create trigger newtrigger
ON Employees
FOR INSERT
AS 
BEGIN 
	Declare @ID int
	SELECT @ID = ID from inserted
	insert into employeeverify
	 VALUES ('New employee with Id = ' + CAST(@Id AS VARCHAR(10)) + ' is added at ' + CAST(Getdate() AS VARCHAR(22)))
END

INSERT INTO Employees values(6,'JOHN',32000,'male',23)
INSERT INTO Employees values(7,'Naveen',33000,'male',33)
INSERT INTO Employees values(8,'aparna',34000,'female',20)

select * from employeeverify

create trigger trdeleteemployees
ON Employees
FOR Delete
AS
BEGIN
	Declare @ID INT
	select @ID = ID from deleted
	insert into employeeverify
	 VALUES ('New employee with Id = ' + CAST(@Id AS VARCHAR(10)) + ' is deleted at ' + CAST(Getdate() AS VARCHAR(22)))

END

delete from employees where ID = 6

select * from employeeverify

--- After Triggers
create trigger trupdate
ON Employees
AFTER UPDATE
AS
BEGIN
    INSERT INTO employeeverify
    SELECT Audit_action,'UPDATE', GETDATE() FROM inserted;
END

create table students(
name varchar(30),
marks int,
gender varchar(20)
)

Insert into students(name,marks,gender)values
('asd',90,'male'),
('qwe',80,'female'),
('zxc',88,'male')



insert into StudentInfo(name,marks)
select name,marks from students
where gender = 'male'

select * from StudentInfo

insert into StudentInfo(name,marks)
select name,marks from students
order by marks

select NULLIF(25,25) AS Result  --- If the number or the string has the same value 
-- it returns NULL 

select NULLIF(35,25) AS Result  --- if the arguments has the different value it will
---return the first value

select * from StudentInfo where NULLIF(marks,'')IS NULL







































































































