USE SOURCE

create table Employee(employeeid int, employeename varchar(20), DOB datetime, cityid int )

insert into Employee
select 1,'arun','1997-01-01 00:00:00', 1 UNION
select 2,'peter','1996-10-15 00:00:00', 2 UNION
select 3,'smith','1998-01-01 00:00:00', 4 UNION
select 4,'raj','1999-03-30 00:00:00', 1 UNION
select 5,'karan','2000-01-01 00:00:00', 6

select employeeid,employeename from Employee

set transaction Isolation Level Read Uncommitted   ---Dirty reads
Begin Transaction
select employeeid,employeename from Employee
waitfor delay '00:00:03';
select  employeeid,employeename from Employee
commit transaction

Begin Transaction 
update Employee set employeename='Akhshy' where employeeid =1
waitfor delay '00:00:03';
Rollback Transaction

set transaction Isolation Level Read committed  
Begin Transaction
select employeeid,employeename from Employee
waitfor delay '00:00:03';
select  employeeid,employeename from Employee
commit transaction

set transaction Isolation Level repeatable read
Begin Transaction
select employeeid,employeename from Employee
waitfor delay '00:00:03';
select  employeeid,employeename from Employee
commit transaction

set transaction Isolation Level snapshot
Begin Transaction
select employeeid,employeename from Employee
waitfor delay '00:00:03';
select  employeeid,employeename from Employee
commit transaction



