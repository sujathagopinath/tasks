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

----Dynamic SQL query
Declare @decision varchar(10)=''

declare @dynamicquery varchar(max)=''

select @decision = 'c', @decision = 'A' 

IF(@decision = 'c')
BEGIN
	select COUNT(*) count from pivott
END
ELSE IF(@decision = 'A')
BEGIN
	select avg(amount)avg from pivott
END
ELSE
BEGIN
	select SUM(amount)sum from pivott
END

----Query fro dynamic sql

declare @decision varchar(20) = ''
---set @decision = 'C'

declare @dec varchar(20) = ''
---set @dec = 'A'

select @decision = 'C', @dec='A'

declare @dynamicsql varchar(max) = ''
declare @fun varchar(40) = ''

IF(@decision = 'C')
BEGIN
	set @fun = 'count(*) Count'
END
ELSE IF(@dec = 'A')
BEGIN
	set @fun = 'avg(amount) AVGERAGE'
END
ELSE
BEGIN
	set @fun ='sum(amount) TOTAL'
END

set @dynamicsql = ' select ' + @fun +' from pivott'

PRINT @dynamicsql

EXECUTE(@dynamicsql)

---- Dynamic PIVOT SQL

declare @Months varchar(max) = '',
        @Sqlquery varchar(max);

---with CTE_Months
--AS
--(
select distinct monthname from pivott ---CTE_Months
--)

select @Months += monthname + ',' from pivott

set @Months = LEFT(@Months,LEN(@Months)-1)

set @Sqlquery =' 
select * from (
select year,monthname,amount from pivott
)main
PIVOT(
sum(amount)for monthname IN(' + @Months + ')
)AS P
'
EXECUTE(@Sqlquery)

---Alias

CREATE TABLE Products(  
    prodID varchar(10),  
    prodName varchar(20),  
    quantity int  
);  

insert into Products(prodID,prodName,quantity)
values('abc','MILK',10),
('xyz','Biscuits',12),
('pqrs','Snacks',20)

select prodName as list_of_prod from Products

select prodName  list_of_prod from Products

select prodName  [list_of_prod] ,quantity [quant] from Products

select prodName as [list_of_prod] ,quantity as [quant] from Products

select prodName  [list_of_prod] ,quantity [$quants] from Products

--- Left function

select LEFT('circus',2)

select left(prodName,3) from Products

select RIGHT(prodName,3),prodName from Products

---Sequence 
create table seqstuds(
studId int,
RollNo int,
Name varchar(20)
)

insert into seqstud(studId,RollNo,Name)
values(202,1234,'sujatha'),
(204,1234,'yasica'),
(203,1236,'madhu'),
(208,1238,'mithu'),
(206,1240,'akhshy')

select * from seqstud order by studId asc

create sequence studseqs
AS INT
start with 202
increment BY 2

insert into seqstuds(RollNo,Name)values
(1234,'suja'),
(1235,'vaishu'),
(1234,'bhuna'),
(1238,'varsha'),
(1239,'akila')

create sequence studentsequences
AS INT
start with 201
increment BY 2

update seqstuds set studId = NEXT VALUE for studentsequences

select * from seqstuds

create sequence stuud
AS INT
start with 209 
increment BY -1
cycle

update seqstuds set studId = NEXT VALUE for studentsequences































































































































