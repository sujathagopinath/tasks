use newtest

create table employees(
empid int primary key identity(1,1),
designation varchar(20),
empname varchar(25),
age int
)