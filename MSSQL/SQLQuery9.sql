USE DATAS

---Table variables 
DECLARE @months_tables TABLE (  
 Number INT,   
 Month VARCHAR(20),   
 Full_Name VARCHAR(40)  
)  

INSERT INTO @months_tables VALUES (1, 'Jan', 'January'),  
(2, 'Feb', 'February'),  
(3, 'Mar', 'March'),  
(4, 'Apr', 'April'),  
(5, 'May', 'May')

select * from @months_tables

update @months_tables set Full_Name = 'feb has 28 days' where Number= 2

create procedure updatecolumn
AS
BEGIN
	declare @bonus money
	set @bonus = 0.1
	select *,@bonus*salary 'Bonus' from Employees
END

exec updatecolumn

----transcation in tablevariable
BEGIN

BEGIN TRAN A
	declare @montab TABLE(ID INT, name varchar(10))
	Insert into @montab values(1,'A'),(2,'B')

	select * from @montab

	ROLLBACK

	select * from @montab
END

declare @verifyddl TABLE(ID int, name varchar(20))
insert into @verifyddl(ID,name) values(1,'A'),(2,'BB')
select * from @verifyddl

ALTER table @verifyddl ADD newcol varchar(25)  ---in table variable will not work for ddl state


----Constraints and indexes

declare @constraints TABLE(
id int primary key,
name varchar(12) unique,
education varchar(20) CHECK(education in('masters','bachelors')),
address varchar(15) default('N/A')
)

INSERT INTO @constraints(id,name,education)
values(1,'AA','masters')

select * from @constraints

create table studenttable(
idstud int,
stud_name varchar(20),
marks int,
gender varchar(20)
)

insert into studenttable(idstud,stud_name,marks,gender)
values(306,'varsha',460,'female'),
(301,'john',450,'male'),
(302,'tim',480,'female'),
(303,'varun',400,'male'),
(304,'akhshy',490,'male'),
(305,'varsha',450,'female')


select * from studenttable

---Rank based on order by clause
select idstud ,stud_name, marks, gender,
RANK() over(order by marks ASC) "RANK"
from studenttable

---Rank based on partition and order by

select idstud,stud_name,marks,gender,
RANK() over(PARTITION BY gender order by marks desc)'rank'
from studenttable

---DENSE RANK

select idstud,stud_name,marks,gender,
DENSE_RANK() over (order by marks desc) 'RANK'
from studenttable


select idstud,stud_name,marks,gender,
DENSE_RANK() over (partition by gender order by marks desc) 'RANK'
from studenttable

create table EMP(
idemp int,
emp_name varchar(20),
gender varchar(10),
sal varchar(20),
deptno int
)

insert into EMP(idemp,emp_name,gender,sal,deptno)
values(401,'ABC','male',12000,11),
(402,'CDE','female',13000,12),
(403,'EFG','male',14000,13),
(404,'GHI','female',15000,11)

select * from EMP

select [idemp],[emp_name],[gender],[sal],[deptno]
from EMP

select ROW_NUMBER() over(order by deptno desc)RowId,idemp,emp_name,gender,sal,deptno from EMP

select ROW_NUMBER() over(partition by gender order by deptno desc)
RowId,idemp,emp_name,gender,sal,deptno from EMP

select idemp,emp_name,gender,sal,deptno, NTILE(2) over(order by deptno desc) AS RANK
from EMP

----PIVOT

create table pivott(
idsales int,
year int,
amount int,
monthname varchar(20)
)

insert into pivott(idsales,year,amount,monthname)
values(1,2019,890,'jan'),
(2,2018,890,'feb'),
(3,2020,800,'mar'),
(4,2021,700,'apr'),
(5,2019,2000,'may')

select * from pivott

select * from (
select year, amount,monthname from pivott
)main
PIVOT
(
sum(amount) for monthname IN([jan],[feb],[mar],[apr],[may])
) AS P

with CTE_pivott
AS(
select * from
(
select year,monthname,amount from pivott
)main
PIVOT( sum(amount) for monthname 
IN(jan,feb,mar,apr,may)
)AS P
)
---select * from CTE_pivott
select * INTO ##Temp from CTE_pivott

select year,monthname,amount from ##Temp
UNPIVOT
(
amount for monthname in (jan,feb,mar,apr,may)
)As UP

---EOMONTH

CREATE TABLE meetings(starting_date date, meeting_date date);  

INSERT INTO meetings(starting_date) VALUES('2021-06-01');  
INSERT INTO meetings(starting_date) VALUES('2020-04-01');  
INSERT INTO meetings(starting_date) VALUES('2012-01-06');  
INSERT INTO meetings(starting_date) VALUES('2019-09-25');  

UPDATE meetings SET meeting_date=EOMONTH(starting_date); 

select * from meetings

SELECT meeting_date AS CURRENT_MONTH_LAST_DATE, EOMONTH(meeting_date, 1) AS NEXT_MONTH_LAST_DATE FROM meetings

SELECT meeting_date AS DATE, DAY(EOMONTH(meeting_date)) AS NUMBER_OF_DAYS FROM meetings



























































































