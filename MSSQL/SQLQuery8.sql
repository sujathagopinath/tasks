USE TESTDB

---Triggers AFTER,INSTEADOF

create table employee(
emp_id int primary key,
emp_name varchar(30),
age int
)

INSERT INTO employee(emp_id,emp_name,age)
values(101,'asd',21),
(102,'qwe',22),
(103,'zxc',23)

create table emp_log(emp_id int,Action varchar(10),Attime Datetime)

select * from employee
select * from emp_log

create trigger trinsert
ON employee
After insert
AS
Begin
	INSERT into emp_log select emp_id, 'Inserted', GETDATE() from inserted
END

INSERT INTO employee values(104,'pqrs',25)

create trigger trupdate
ON employee
After update
AS
Begin
	INSERT into emp_log select emp_id, 'Updated', GETDATE() from inserted
END

UPDATE employee
set age = 25
where emp_id = 102

create trigger trdelete
ON employee
After delete
AS
Begin
	INSERT into emp_log select emp_id, 'DELETED', GETDATE() from deleted
END

delete from employee where emp_id = 103

Disable trigger trinsert ON employee 

Enable trigger trinsert ON employee

create trigger triggerinsert 
ON employee 
Instead of Insert
AS
BEGIN
	declare @ID int;
	select @ID = ISNULL(MAX(emp_id),0)+1from employee
	Insert into employee select @ID,emp_name,age from inserted
END

insert into employee(emp_name,age) values('raj',28)

create table emp1(
name varchar(25),
occupation varchar(20),
workinghours int, 
working_date DATETIME
)

INSERT into emp1(name,occupation,workinghours,working_date)
values('ajay','hr', 9, 2021-12-07),
('akhshy','developer',8,2021-12-06),
('mithu','teacher',10,2021-12-05)

select * into newbackup_emp from emp1  ---copying the records into new table

select * from newbackup_emp

select emp_name,age into backup_emp from employee

select * from backup_emp

create table E(
e_id int primary key,
e_name varchar(10),
occupation varchar(20),
workinghours int, 
)

INSERT into E(e_id,e_name,occupation,workinghours)
values(1201,'ajay','hr', 9),
(202,'akhshy','developer',8),
(203,'mithu','teacher',10)

DROP table E

create table customers(id int, c_name varchar(20), email varchar(15))

create table orders(order_id int, cust_id int, item varchar(20))

INSERT into customers(id,c_name, email)
values(1201,'ajay','abc@gm.com'),
(1202,'akhshy','xyz@gm.com'),
(1203,'mithu','pqr@gm.com')

INSERT into orders(order_id,cust_id,item)
values(1201,2201,'snacks'),
(1204,2202,'sweets'),
(1205,2203,'jucies')

----select into insert data into multiple table by using inner join
SELECT cust.c_name, cust.email, O.item, O.cust_id  
INTO customer_orders FROM customers AS cust   
Inner JOIN orders AS O ON cust.id = O.order_id;  

select * from customer_orders

---one table to another
INSERT into customers(c_name,email)
select c_name,email from customer

select * from customers
select * from customer

INSERT into customers(c_name,email)
select c_name,email from customer
where c_name = 'AAA'

--=NULLIF and case

declare @a int =2 , @b int =20;
select NULLIF (@a,@b) AS RESULT1
select
	case
	when @a = @b  then NULL
	ELSE @a
	END AS RESULT2

---Transaction using rollback

Begin TRAN;
truncate table customer;
ROLLBACK;
select * from customer

select @@VERSION AS SQLVERSION

SELECT SERVERPROPERTY('ErrorLogFileName') AS 'log file location'  
 
 --charINDEX

 select CHARINDEX('world','helloworld')As position

 ---CASE senstive
  select CHARINDEX('SERVER','server')As RESULT

  SELECT CHARINDEX('SERVER',   
 'SQL SERVER'   
  COLLATE Latin1_General_CS_AS   ----collate is used for search
) AS Position;  

---NON existent sub strings & multiple match

declare @str varchar(20)
select @str = 'This is test of non-existent sub strings'
select CHARINDEX('TEST',@str)As TEST

SELECT CHARINDEX ('for', 'Love for all, Hate for none', 10) As Position;  


















































































































































