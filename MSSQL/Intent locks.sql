USE SOURCE

--- intent locks, schema, key range, bulk update
set transaction isolation level read committed
Begin Transaction
update Employee set employeeid = 1 where  employeeid = 1

Rollback transaction
 
select * from  Employee

select * from Active_locks()

Begin Transaction
Alter table Employee Alter column employeename varchar(100)

select resource_type,request_mode,resource_description
from sys.dm_tran_locks
where resource_type <> 'Database'

Rollback transaction

set transaction isolation level serializable
begin transaction
---select employeename from Employee where employeename = 'Akhshy'
select employeename from Employee with(updlock) where employeename = 'Akhshy'

select * from Active_locks()

create Nonclustered Index Idx1_Employeee on Employee (employeename Asc)
DROP index Idx1_Employee on Employee
create unique Index Idx1_Employe on Employee (employeename Asc)

create table student(studentid int, student varchar(50))


begin TRAN
Bulk Insert SOURCE.dbo.student from 'E:\bulk.txt'






