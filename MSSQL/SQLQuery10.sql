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

create table stud(
stud_id int,
RollNo int,
name varchar(20)
)

insert into stud(stud_id,RollNo,name)
values(6,221,'ashwin'),
(6,221,'ashwin'),
(1,221,'rahul'),
(1,221,'rahul'),
(2,222,'javeed'),
(3,223,'sathish'),
(4,224,'usharani'),
(5,225,'kishore')

select * from stud

---find and delete the duplicate data in table

with CTE_DUP AS (
select stud_id,RollNo,name,
COUNT(*) occurrence
from stud
GROUP BY
stud_id,
RollNo,
name
HAVING COUNT(*) >1
)
select 
stud.stud_id,stud.RollNo,stud.name from stud
INNER JOIN CTE_DUP
ON
CTE_DUP.stud_id = stud.stud_id
AND
CTE_DUP.Rollno = stud.RollNo
AND
CTE_DUP.name = stud.name

order by
stud.stud_id,
stud.RollNo,
stud.name

with CTE_DUP
As(
select stud_id,RollNo,name,
ROW_NUMBER() OVER(
PARTITION BY stud_id,RollNo,name
ORDER BY stud_id,RollNo,name
)row_num
from  stud
)

delete from CTE_DUP where row_num>1

select * from stud

create table student_log(
old_data varchar(10),
new_data varchar(10),
update_time datetime2
)

select * from student_log

create TRIGGER log_updation ON stud FOR UPDATE AS
declare @old_data int
declare @new_data int

select @new_data = i.RollNo from inserted i;
select @old_data = o.RollNo from deleted o;

BEGIN
	INSERT INTO stud_log(old_data,new_data,updation_time)
	VALUES(@old_data,@new_data, CURRENT_TIMESTAMP );  

END

UPDATE stud SET RollNo=22123 WHERE RollNo=221;  

select * from stud
select * from student_log

UPDATE stud SET RollNo=54771 WHERE rollno=222;  
UPDATE stud SET RollNo=74000 WHERE rollno=223;  
UPDATE stud SET RollNo=10211 WHERE rollno=224;  

SELECT DATEADD(month, 4, '2021-06-26') AS result;  

SELECT DATEADD(day, 10, '2021-06-26') AS result;  

select * from employee_info

ALTER TABLE employee_info
ADD work_up_todate date

UPDATE employee_info SET work_up_todate='2022-12-18' WHERE name='paul';  
UPDATE employee_info SET work_up_todate='2022-12-19' WHERE name='Edward';  
UPDATE employee_info SET work_up_todate='2022-11-18' WHERE name='Chris';  
UPDATE employee_info SET work_up_todate='2022-10-31' WHERE name='tim';  
UPDATE employee_info SET work_up_todate='2022-09-12' WHERE name='John';  

UPDATE employee_info SET work_up_todate=DATEADD(month,8,join_date); 

CREATE TABLE Products(  
    ID INT,  
    Product_Name VARCHAR(65),  
    Price DECIMAL(9,2)  
)  

insert into Products(ID,Product_Name,Price) 
values(1,'desk',100),
(2,'table',200),
(3,'chair',190),
(4,'computer',3000),
(5,'laptop',5000)

CREATE TABLE TargetProducts(  
    ID INT,  
    Product_Name VARCHAR(65),  
    Price DECIMAL(9,2)  
)  
      
INSERT INTO TargetProducts(ID, Product_Name, Price) VALUES  
(1, 'Table', 150),  
(2, 'Desk', 150),  
(5, 'Bed', 100),  
(6, 'Cupboard', 350);  

SELECT * FROM Products  
SELECT * FROM TargetProducts  

MERGE TargetProducts AS Target  
USING Products  AS Source  
ON Source.ID = Target.ID  
WHEN NOT MATCHED BY Target THEN  
    INSERT (ID, Product_Name, Price)   
    VALUES (Source.ID, Source.Product_Name, Source.Price); 

MERGE TargetProducts AS Target  
USING Products AS Source  
ON Source.ID = Target.ID  
WHEN NOT MATCHED BY Target THEN  
     
    INSERT (ID, Product_Name, Price)   
    VALUES (Source.ID, Source.Product_Name, Source.Price)  ---Insertion
    
WHEN MATCHED THEN UPDATE SET     ---Updation
    Target.Product_Name = Source.Product_Name,  
    Target.Price = Source.Price;  

MERGE TargetProducts AS Target  
USING Products  AS Source  
ON Source.ID = Target.ID  
   WHEN NOT MATCHED BY Target THEN  
    INSERT (ID, Product_Name, Price)   
    VALUES (Source.ID, Source.Product_Name, Source.Price)  
WHEN MATCHED THEN UPDATE SET  
    Target.Product_Name = Source.Product_Name,  
    Target.Price = Source.Price  
    
WHEN NOT MATCHED BY Source THEN  
    DELETE;  

MERGE TargetProducts AS Target  
USING Products AS Source  
ON Source.ID = Target.ID  

WHEN NOT MATCHED BY Target THEN  
    INSERT (ID, Product_Name, Price)   
    VALUES (Source.ID, Source.Product_Name, Source.Price)  

WHEN MATCHED THEN UPDATE SET  
   Target.Product_Name = Source.Product_Name,  
    Target.Price = Source.Price  

WHEN NOT MATCHED BY Source THEN  
    DELETE  

OUTPUT $action,   
DELETED.ID AS Target_ID,   
DELETED.Product_Name AS Target_Product_Name,   
DELETED.Price AS Target_Price,   
INSERTED.ID AS Source_ID,   
INSERTED.Product_Name AS Source_Product_Name,   
INSERTED.Price AS SourcePrice;  

SELECT * FROM student  
ORDER BY stud_id   
OFFSET 2 ROWS   
FETCH NEXT 4 ROWS ONLY;  

SELECT stud_id, RollNo, name FROM student ORDER BY RollNo desc   
OFFSET (SELECT COUNT(*) FROM student) - 3 ROWS  
FETCH NEXT 3 ROWS ONLY;  











      















































