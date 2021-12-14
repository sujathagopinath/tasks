set transaction isolation level repeatable read
Begin tran
select employeeid,employeename from Employee where employeeid = 5

Begin tran 
update Employee set employeeid =6 where employeeid = 1

set transaction isolation level repeatable read
Begin transaction
select employeeid,employeename from Employee where employeeid = 3


begin transaction

select * from Employee with(holdlock) where employeeid = 5

select resource_type,request_mode,resource_description from sys.dm_tran_locks
where resource_type <>'DATABASE'

rollback

set transaction isolation level repeatable read
Begin transaction
select employeeid,employeename from Employee where employeeid = 3

rollback transaction

select * from Active_locks()

set transaction isolation level  read committed
Begin transaction
update Employee set employeeid=1 where employeeid =6









