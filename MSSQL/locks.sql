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

Alter database SOURCE set Allow_Snapshot_Isolation On

set transaction Isolation Level snapshot
Begin Transaction
select employeeid,employeename from Employee
waitfor delay '00:00:03';
select  employeeid,employeename from Employee
commit transaction

select employeename,employeeid from Employee

set transaction Isolation Level Serializable
Begin Transaction
select employeeid,employeename from Employee
waitfor delay '00:00:03';
select  employeeid,employeename from Employee
commit transaction

set transaction isolation level read uncommitted
Begin tran
select employeeid,employeename from Employee where employeeid = 1

SELECT @@SPID AS session_id   

set transaction isolation level repeatable read
Begin tran
select employeeid,employeename from Employee where employeeid = 1

Rollback tran

select * from Active_locks()

SELECT * FROM sys.dm_tran_locks  WHERE request_session_id=56

---Shared locks

begin transaction

select * from Employee with(holdlock) where employeeid = 1

select resource_type,request_mode,resource_description from sys.dm_tran_locks
where resource_type <>'DATABASE'

rollback

set transaction isolation level repeatable read
Begin transaction
select employeeid,employeename from Employee where employeeid = 3

Rollback transaction












