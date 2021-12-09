create database SALES

USE SALES

create schema grocery

create table grocery.fruits(
fruitsname varchar(40),
quantity int
)

insert into grocery.fruits(fruitsname,quantity) 
values('apple',10),
('pineapple',12),
('banana',5),
('grapes',10),
('strawberry',3)

select * from grocery.fruits

create synonym fruits for sales.grocery.fruits

select * from fruits

---DATE DIFF

---comparing dates with variable

DECLARE   
    @start_date DATETIME2= '2020-11-30 08:00',   
    @end_date DATETIME2= '2022-11-30 10:45';  

select DATEDIFF(year,@start_date,@end_date) As yeardiff,
DATEDIFF(MONTH,@start_date,@end_date) As monthdiff,
DATEDIFF(DAY,@start_date,@end_date) As daydiff,
DATEDIFF(WEEK,@start_date,@end_date) As weekdiff,
DATEDIFF(MINUTE,@start_date,@end_date) As Mindiff,
DATEDIFF(HOUR,@start_date,@end_date) As Hourdiff

----datefunc and scalar system by using GETDATE()

select DATEDIFF(MILLISECOND,GETDATE(),SYSDATETIME())AS Millisecond

create table employee_info(
name varchar(40),
sal int unique,
occupation varchar(10),
join_date DATE
)

insert into employee_info
values('Paul',25000,'developer','2021-04-06'),
('Edward',26000,'developer','2021-05-05'),
('Chris',27000,'testing','2021-06-07'),
('tim',28000,'SE','2021-08-08'),
('John',29000,'Analyst','2021-12-09')

select *,GETDATE() AS 'Current date',
DATEDIFF(MM,join_date,GETDATE()) AS 'NO of Months',
DATEDIFF(DAY,join_date,GETDATE()) AS 'NO of Days'
from employee_info

declare @year INT = 2015
while(@year<=2019)
BEGIN
	print cast(@year AS Varchar(4))
	set @year = @year +1
END

---Infinite loop
declare @loop INT
set @loop =1
while(@loop<5)
BEGIN
	print 'I AM A INFINITE LOOP'
END
 
 ---Insert command

declare @count INT;
set @count =1;
while (@count<=10)
BEGIN
	INSERT INTO fruits VALUES('employee-' + CAST(@count as varchar), @count*1000)
	SET @count = @count +1
END

select * from fruits







































