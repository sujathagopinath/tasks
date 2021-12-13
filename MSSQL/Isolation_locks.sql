CREATE DATABASE SOURCE

USE SOURCE

CREATE TABLE ISOLATION_LEVEL(A int,B int)

insert into ISOLATION_LEVEL 
select 1,1 UNION
select 2,2 UNION 
select 3,3 UNION
select 4,4 UNION
select 5,5 

select * from ISOLATION_LEVEL

BEGIN TRAN
	delete from ISOLATION_LEVEL where A=1
		waitfor delay '00:0:10'
		insert into ISOLATION_LEVEL(A,B) values(6,6)
			waitfor delay '00:0:10'
	    update ISOLATION_LEVEL set A=A+A where B=1
COMMIT TRAN


BEGIN TRAN
	INSERT into ISOLATION_LEVEL(A,B) values(6,6)
COMMIT TRAN

BEGIN TRAN
	update ISOLATION_LEVEL set A= A+A where B=1
COMMIT TRAN

Begin Transaction 
update Employee set employeename='Ak' where employeeid =1
waitfor delay '00:00:03';
Rollback Transaction

select * from Employee

Begin Transaction 
update Employee set employeename='rahul' where employeeid =2
waitfor delay '00:00:03';
commit Transaction

Begin Transaction 
update Employee set employeename='varun' where employeeid =2
commit Transaction

Begin Transaction 
insert into Employee values(6,'Ajay','1999-12-10 00:00:00',5)
commit Transaction







